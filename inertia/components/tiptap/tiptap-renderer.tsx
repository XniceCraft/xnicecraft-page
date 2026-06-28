import { useMemo } from 'react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'

import type { JSONContent } from '@tiptap/react'

const proseClassName =
  'prose prose-lg max-w-none focus:outline-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ink prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:leading-tight prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:leading-snug prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3 prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-2 prose-p:font-body prose-p:text-base sm:prose-p:text-lg prose-p:text-ink-2 prose-p:leading-[1.75] prose-p:my-5 prose-a:text-accent prose-a:font-medium prose-a:underline prose-a:underline-offset-2 prose-a:transition-colors prose-a:duration-fast hover:prose-a:text-accent/80 prose-strong:text-ink prose-strong:font-semibold prose-em:text-ink-2 prose-code:font-mono prose-code:text-sm prose-code:text-accent prose-code:bg-accent-subtle prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:font-mono prose-pre:text-sm prose-pre:bg-surface-2 prose-pre:border prose-pre:border-rule prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:my-8 prose-blockquote:border-l-[3px] prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:text-ink-2 prose-blockquote:font-body prose-blockquote:not-italic prose-blockquote:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-5 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-5 prose-li:text-ink-2 prose-li:font-body prose-li:leading-[1.7] prose-li:my-1.5 prose-hr:border-rule prose-hr:my-12'

export function TiptapRenderer({ content }: { content: JSONContent }) {
  const html = useMemo(() => generateHTML(content, [StarterKit]), [content])

  return <div className={proseClassName} dangerouslySetInnerHTML={{ __html: html }} />
}
