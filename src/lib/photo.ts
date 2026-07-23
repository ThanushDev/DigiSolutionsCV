export async function removeBackground(imageFile: File) {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': 'bcKub9ab7FzoaNnTQEFEXBXs' },
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  throw new Error('Background removal failed');
}
