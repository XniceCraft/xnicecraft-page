const MINUTE_LABEL = 'min read'
const FALLBACK_TEXT = '< 1 min read'

/**
 * Formats an integer minute count into a display string.
 * Pair with computeReadTimeMinutes() — accepts its output directly.
 *
 * @param minutes — positive integer, e.g. from post.readTime
 * @returns e.g. "1 min read", "12 min read"
 */
export function formatReadTime(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 1) return FALLBACK_TEXT
  return `${Math.floor(minutes)} ${MINUTE_LABEL}`
}
