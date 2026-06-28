import { Fragment, useCallback } from 'react'
import { footerData } from '@/lib/data/footer'
import { Link } from '@adonisjs/inertia/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollToPlugin)

export function Footer({ variant = 'full' }: { variant?: 'full' | 'simplified' }) {
  const year = new Date().getFullYear()

  const scrollToTop = useCallback(() => {
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: 0 },
      ease: 'power2.out',
    })
  }, [])

  return (
    <footer
      className="pt-24 pb-12 px-(--page-gutter) border-t-2 border-rule-strong bg-paper"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-page-max mx-auto flex flex-col gap-3">
        {variant === 'full' && (
          <p className="font-display text-[clamp(1.75rem,8vw,3rem)] sm:text-4xl font-bold tracking-tighter leading-[1.05] text-ink mb-6 max-w-[20ch] overflow-wrap-anywhere min-w-0">
            {footerData.message.primary}{' '}
            <span className="text-accent">{footerData.message.secondary}</span>
          </p>
        )}

        <p className="font-mono text-sm text-ink-3 mb-12 tracking-wide">
          {footerData.copyright}, {year}.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-rule flex-wrap">
          <nav className="flex items-center gap-3 flex-wrap" aria-label="Footer links">
            {footerData.links.map((link, index) => {
              const Container = link.type === 'internal' ? Link : 'a'

              return (
                <Fragment key={link.href}>
                  <Container
                    href={link.href}
                    className="font-mono text-xs text-ink-3 no-underline transition-colors duration-fast ease-out min-h-11 inline-flex items-center whitespace-nowrap hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 focus-visible:rounded-sm"
                    target={link.type === 'external' ? '_blank' : undefined}
                    rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                  >
                    {link.label}
                  </Container>
                  {index < footerData.links.length - 1 && (
                    <span className="text-xs text-rule" aria-hidden="true">
                      ·
                    </span>
                  )}
                </Fragment>
              )
            })}
          </nav>

          <button
            className="font-mono text-xs text-ink-3 no-underline transition-colors duration-fast ease-out min-h-11 inline-flex items-center whitespace-nowrap self-end sm:self-auto hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 focus-visible:rounded-sm"
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  )
}
