import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Magnetic } from '@/components/ui/magnetic'
import { gsap } from 'gsap'
import { homePageData } from '@/lib/data/home'
import { SplitText } from '@/components/ui/split-text'
import { globalData } from '@/lib/data/global'

gsap.registerPlugin(useGSAP)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLHRElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const chars = gsap.utils.toArray<HTMLSpanElement>('.split-char')
      if (chars && chars.length > 0) {
        tl.to(chars, {
          y: '0%',
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power4.out',
        })
      } else {
        tl.from(nameRef.current, { y: 40, opacity: 0, duration: 0.9 })
      }

      tl.from(roleRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      tl.from(metaRef.current, { y: 16, opacity: 0, duration: 0.5 }, '-=0.3')
      tl.from(scrollRef.current, { y: 12, opacity: 0, duration: 0.5 }, '-=0.2')
      tl.from(
        ruleRef.current,
        { scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'power2.inOut' },
        '-=0.4'
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    { scope: sectionRef }
  )

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="min-h-screen flex flex-col justify-center sm:justify-end px-(--page-gutter) pb-18 sm:pb-24 pt-[calc(var(--nav-height)+var(--spacing-12))] max-w-page-max mx-auto relative bg-paper"
      >
        <div className="overflow-hidden mb-8">
          <h1
            ref={nameRef}
            className="font-display text-[clamp(3.5rem,16vw,5.5rem)] sm:text-display font-black tracking-[-0.04em] sm:tracking-tighter leading-[0.9] text-ink m-0 w-max max-w-none overflow-visible"
            aria-label="Farel Erdiansyah Widiarta"
          >
            <SplitText text={homePageData.heroSection.firstName} />
            <br />
            <SplitText text={homePageData.heroSection.lastName} className="text-accent" />
          </h1>
        </div>

        <p
          ref={roleRef}
          className="font-body text-lg sm:text-xl font-normal text-ink-2 mb-8 max-w-[42ch] tracking-tight leading-[1.4] m-0"
        >
          {homePageData.heroSection.description}
        </p>

        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center items-start gap-6 flex-wrap"
        >
          {globalData.availableForWork && (
            <span className="flex items-center gap-1 font-mono text-xs font-medium text-accent bg-accent-subtle py-1 px-4 rounded-pill whitespace-nowrap">
              <span
                className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse-dot"
                aria-hidden="true"
              />
              Open to work
            </span>
          )}
          <Magnetic range={50} strength={0.25}>
            <a
              href="#works"
              className="inline-flex items-center gap-2 font-body text-base font-semibold text-ink no-underline py-3 px-6 border-[1.5px] border-ink rounded-pill transition-all duration-fast ease-out hover:bg-ink hover:text-paper hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 whitespace-nowrap min-h-11"
            >
              {homePageData.heroSection.ctaButtonText}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Magnetic>
        </div>

        <div
          ref={scrollRef}
          className="hidden sm:flex absolute bottom-12 right-(--page-gutter) flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="block w-px h-12 bg-ink-3 animate-scroll-line origin-top" />
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink-3 [writing-mode:vertical-rl]">
            scroll
          </span>
        </div>
      </section>

      <hr
        ref={ruleRef}
        className="border-none border-t-2 border-rule-strong m-0"
        aria-hidden="true"
      />
    </>
  )
}
