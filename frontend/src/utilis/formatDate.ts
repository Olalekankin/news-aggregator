export function formatDateString(date: string | undefined | null): string {
  if (!date) return 'No date available' // Handle undefined or null date

  const datePart = date.split('T')[0]

  return datePart 
}
