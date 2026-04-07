export const NormalizeImageUrl = (imageSrc: string) => {
  if (!imageSrc) return ''

  return imageSrc.replace(/^URL:\s*/i, '').replace('http://localhost:3000', '')
}
