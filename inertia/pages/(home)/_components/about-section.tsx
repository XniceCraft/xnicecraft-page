import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from '@/components/ui/split-text'
import { gsap } from 'gsap'
import { homePageData } from '@/lib/data/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const aboutTextRef = useRef<HTMLSpanElement>(null)
  const bioSectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLSpanElement>('.split-char')
      if (chars && chars.length > 0) {
        gsap.to(chars, {
          scrollTrigger: {
            trigger: aboutTextRef.current,
            start: 'top 88%',
          },
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.05,
        })

        ScrollTrigger.create({
          trigger: aboutTextRef.current,
          start: 'top 20%',
          endTrigger: sectionRef.current,
          end: 'bottom bottom',
          pin: true,
        })
      }

      gsap.from('.about-paragraph', {
        scrollTrigger: {
          trigger: bioSectionRef.current,
          start: 'top 85%',
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })

      const skillGroups = gsap.utils.toArray<HTMLDivElement>('.about-skill-group')

      skillGroups.forEach((group) => {
        const title = group.querySelector('.about-group-title')
        const tags = group.querySelectorAll('.about-skill-tag')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: 'top 90%',
          },
        })

        tl.from(title, {
          x: -15,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        }).from(
          tags,
          {
            scale: 0.85,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '-=0.35'
        )
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    { scope: sectionRef }
  )

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="py-48 max-w-page-max mx-auto px-(--page-gutter) not-sm:py-24"
        aria-label="About"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-18 lg:gap-36 items-start">
          <div className="lg:sticky lg:top-[calc(var(--nav-height)+var(--spacing-12))]">
            <div className="overflow-hidden" aria-hidden="true">
              <SplitText
                className="block font-display text-[clamp(3rem,10vw,5rem)] lg:text-display-s font-black tracking-tighter leading-[0.95] text-ink"
                ref={aboutTextRef}
                text="About"
              />
            </div>
          </div>

          <div className="flex flex-col gap-24">
            <div ref={bioSectionRef} className="flex flex-col gap-6">
              <p className="about-paragraph font-body text-xl sm:text-2xl font-medium text-ink tracking-tight leading-[1.35] max-w-[60ch] m-0">
                I'm a software engineer who graduated from a vocational high school's software
                engineering program
              </p>
              <p className="about-paragraph font-body text-lg font-normal text-ink-2 leading-[1.65] max-w-[60ch] m-0">
                My work lives at the intersection of frontend craft and real-time systems: I care
                about the 60 fps interaction as much as the data structure behind it. I'm drawn to
                computer vision, WebSockets, and the kind of problem where the user experience and
                the engineering challenge are the same problem.
              </p>
              <p className="about-paragraph font-body text-lg font-normal text-ink-2 leading-[1.65] max-w-[60ch] m-0">
                Early-career doesn't mean entry-level to me. Every project I ship is a bet that
                attention to detail compounds — in code quality, in interface craft, and in the
                person writing both.
              </p>
            </div>

            <div
              className="flex flex-col gap-6 pt-8 border-t border-rule"
              aria-label="Technical skills"
            >
              {homePageData.aboutSection.skills.map((group) => (
                <div
                  key={group.group}
                  className="about-skill-group grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-3 sm:gap-4 items-start"
                >
                  <span className="about-group-title font-mono text-xs font-medium uppercase tracking-widest text-ink-3 pt-1">
                    {group.group}
                  </span>
                  <ul className="flex flex-wrap gap-2 list-none m-0 p-0" role="list">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="about-skill-tag font-mono text-xs font-normal text-ink-2 bg-surface-2 py-1 px-3 rounded-md border border-rule"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-6 pt-8 border-t border-rule">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink-3 whitespace-nowrap">
                Education
              </h2>
              <div className="space-y-6">
                {homePageData.aboutSection.education.map((item) => (
                  <div
                    key={item.school}
                    className="font-body text-base text-ink-2 flex items-center gap-3 flex-wrap"
                  >
                    <div className="flex flex-col">
                      <span className="font-display text-lg text-ink">{item.school}</span>
                      <span className="font-body text-xs text-ink-2">{item.major}</span>
                    </div>
                    <span className="text-ink-3" aria-hidden="true">
                      —
                    </span>
                    {item.startYear}-{item.endYear}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
