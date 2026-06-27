export function formatDate(value: string) {
  const date = new Date(value)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateV2(value?: string | null) {
  if (!value) return 'Not scheduled'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
