import { v } from "convex/values";
import { mutation, action, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const storeImageUrl = mutation({
  args: {
    section: v.string(),
    category: v.optional(v.string()),
    url: v.string(),
    alt: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteImages")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
    return await ctx.db.insert("siteImages", {
      section: args.section,
      category: args.category,
      url: args.url,
      alt: args.alt,
      order: existing.length,
      createdAt: Date.now(),
    });
  },
});

export const processUpload = action({
  args: {
    storageId: v.id("_storage"),
    section: v.string(),
    category: v.optional(v.string()),
    alt: v.string(),
    productId: v.optional(v.id("products")),
  },
  handler: async (ctx, args) => {
    const tinyPngKey = process.env.TINYPNG_API_KEY;
    const imgBBKey = process.env.IMGBB_API_KEY;

    if (!tinyPngKey || !imgBBKey) {
      throw new Error("Missing TINYPNG_API_KEY or IMGBB_API_KEY in env");
    }

    const blob = await ctx.storage.get(args.storageId);
    if (!blob) throw new Error("File not found in storage");

    const buffer = await blob.arrayBuffer();
    const auth = btoa(`api:${tinyPngKey}`);

    const tinyRes = await fetch("https://api.tinify.com/shrink", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
      body: buffer,
    });

    if (!tinyRes.ok) {
      const err = await tinyRes.text();
      throw new Error(`TinyPNG error: ${tinyRes.status} ${err}`);
    }

    const locationUrl = tinyRes.headers.get("Location");
    if (!locationUrl) throw new Error("No Location header from TinyPNG");

    // Download compressed image (no resize, just compression)
    const compressedRes = await fetch(locationUrl, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!compressedRes.ok) {
      throw new Error(`Download compressed failed: ${compressedRes.status}`);
    }

    const compressedBuffer = await compressedRes.arrayBuffer();
    const bytes = new Uint8Array(compressedBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    const imgBBRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `image=${encodeURIComponent(base64)}`,
      }
    );

    const imgBBData = await imgBBRes.json();
    if (!imgBBData.success) {
      throw new Error(`ImgBB error: ${JSON.stringify(imgBBData)}`);
    }

    const imageUrl = imgBBData.data.url;

    let imageId: string | undefined;

    if (args.productId) {
      await ctx.runMutation(api.products.addImage, {
        productId: args.productId,
        url: imageUrl,
        alt: args.alt,
      });
    } else {
      imageId = await ctx.runMutation(api.siteImages.create, {
        section: args.section,
        category: args.category,
        url: imageUrl,
        alt: args.alt,
        order: Date.now(),
      });
    }

    await ctx.storage.delete(args.storageId);

    return { url: imageUrl, deleteUrl: imgBBData.data.delete_url, imageId };
  },
});

export const migrateImages = action({
  args: {
    files: v.array(
      v.object({
        url: v.string(),
        section: v.string(),
        category: v.optional(v.string()),
        alt: v.string(),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const tinyPngKey = process.env.TINYPNG_API_KEY;
    const imgBBKey = process.env.IMGBB_API_KEY;
    if (!tinyPngKey || !imgBBKey) {
      throw new Error("Missing TINYPNG_API_KEY or IMGBB_API_KEY in env");
    }

    const results: { url: string; imgbbUrl: string }[] = [];

    for (const file of args.files) {
      try {
        const res = await fetch(file.url);
        const buffer = await res.arrayBuffer();

        const auth = btoa(`api:${tinyPngKey}`);
        const tinyRes = await fetch("https://api.tinify.com/shrink", {
          method: "POST",
          headers: { Authorization: `Basic ${auth}` },
          body: buffer,
        });

        if (!tinyRes.ok) continue;

        const locationUrl = tinyRes.headers.get("Location");
        if (!locationUrl) continue;

        const compressedRes = await fetch(locationUrl, {
          headers: { Authorization: `Basic ${auth}` },
        });
        const compressedBuffer = await compressedRes.arrayBuffer();

        const bytes = new Uint8Array(compressedBuffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);

        const imgBBRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `image=${encodeURIComponent(base64)}`,
          }
        );
        const imgBBData = await imgBBRes.json();
        if (!imgBBData.success) continue;

        const imageUrl = imgBBData.data.url;

        await ctx.runMutation(api.siteImages.create, {
          section: file.section,
          category: file.category,
          url: imageUrl,
          alt: file.alt,
          order: file.order,
        });

        results.push({ url: file.url, imgbbUrl: imageUrl });
      } catch (e) {
        console.error(`Failed to migrate ${file.url}:`, e);
      }
    }

    return results;
  },
});
