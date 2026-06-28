import type { JSONContent } from '@tiptap/react'

const PROSE_WPM = 200
const CODE_WPM = 50
const IMAGE_SECONDS = 10

/**
 * Computes estimated read time in minutes from a TipTap JSONContent tree.
 *
 * - Prose text: 200 WPM
 * - Code blocks: 50 WPM
 * - Images: 10 seconds each
 *
 * @returns minutes — rounded up, minimum 1
 */
export function calculateReadTimeMinutes(content: JSONContent): number {
  let proseWords = 0
  let codeWords = 0
  let images = 0

  const stack: Array<{ node: JSONContent; inCode: boolean }> = [{ node: content, inCode: false }]

  while (stack.length > 0) {
    const { node, inCode } = stack.pop()!

    switch (node.type) {
      case 'image':
        images++
        continue

      case 'text': {
        if (!node.text) continue
        const words = node.text.trim().split(/\s+/).filter(Boolean).length
        if (inCode) codeWords += words
        else proseWords += words
        continue
      }
    }

    if (node.content?.length) {
      const nextInCode = inCode || node.type === 'codeBlock'
      for (const child of node.content) {
        stack.push({ node: child, inCode: nextInCode })
      }
    }
  }

  const totalSeconds =
    (proseWords / PROSE_WPM) * 60 + (codeWords / CODE_WPM) * 60 + images * IMAGE_SECONDS

  return Math.max(1, Math.ceil(totalSeconds / 60))
}
