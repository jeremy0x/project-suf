export function responsiveUrl(url: string, size: "thumb" | "medium" | "full"): string {
  if (size === "full" || !url) return url;
  if (url.startsWith("/") || url.startsWith("blob:") || url.startsWith("data:")) return url;

  const widths = { thumb: 320, medium: 640 };
  const w = widths[size];

  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${w}&output=webp&q=80`;
}
