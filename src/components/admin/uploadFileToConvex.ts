export async function uploadFileToConvex(
  file: File,
  generateUrl: () => Promise<string>,
): Promise<string> {
  const uploadUrl = await generateUrl();
  const res = await fetch(uploadUrl, { method: "POST", body: file });
  if (!res.ok) throw new Error("Upload to storage failed");
  const { storageId } = await res.json();
  return storageId;
}
