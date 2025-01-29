export const truncateText = (text: string, limit: number): string => {
  if (!text) return ''
  const words = text.split(' ')
  return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
}
