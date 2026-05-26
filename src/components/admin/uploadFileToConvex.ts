export async function uploadFileToConvex(
  file: File,
  generateUrl: () => Promise<string>,
): Promise<string> {
  const uploadUrl = await generateUrl();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(uploadUrl, { method: "POST", body: file, signal: controller.signal });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const data = await res.json();
    if (!data || typeof data.storageId !== "string") {
      throw new Error("Invalid upload response");
    }
    return data.storageId;
  } finally {
    clearTimeout(timer);
  }
}
