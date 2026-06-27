import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface SplitTextProps {
  ref?: React.Ref<HTMLSpanElement>
  text: string
  className?: string
  charClassName?: string
  wordClassName?: string
}

export function SplitText({
  ref,
  text,
  className = '',
  charClassName = 'split-char',
  wordClassName = 'split-word',
}: SplitTextProps) {
  const words = useMemo(() => text.split(' '), [text])

  return (
    <span ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className={`inline-block whitespace-nowrap ${wordClassName}`}
          style={{ overflow: 'hidden', verticalAlign: 'bottom' }}
          aria-hidden="true"
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className={`inline-block ${charClassName}`}
              style={{
                transform: 'translateY(110%)',
                opacity: 0,
                display: 'inline-block',
              }}
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
