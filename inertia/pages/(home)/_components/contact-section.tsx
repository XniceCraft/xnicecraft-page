import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ContactForm } from './form/contact-form'
import { Link } from '@adonisjs/inertia/react'
import { Magnetic } from '@/components/ui/magnetic'
import { SplitText } from '@/components/ui/split-text'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { homePageData } from '@/lib/data/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ContactSection() {
  const headingRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contactLeftRef = useRef<HTMLDivElement>(null)
  const contactRightRef = useRef<HTMLFormElement>(null)

  useGSAP(() => {
    const selector = gsap.utils.selector(headingRef.current)
    const chars = selector('.split-char')
    if (chars.length > 0) {
      gsap.to(chars, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
        },
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.05,
      })
    }

    const contactLeftSelector = gsap.utils.selector(contactLeftRef.current)
    gsap.from(contactLeftSelector('*'), {
      scrollTrigger: {
        trigger: contactLeftRef.current,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.1,
    })

    gsap.from(contactRightRef.current, {
      scrollTrigger: {
        trigger: contactRightRef.current,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
    })
  })

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="py-48 not-sm:py-24 px-(--page-gutter)"
        aria-label="Contact"
        style={{ background: 'var(--color-paper-2)' }}
      >
        <div className="max-w-page-max mx-auto flex flex-col gap-24">
          <div className="overflow-hidden">
            <SplitText
              ref={headingRef}
              text="Let's talk."
              className="block font-display text-[clamp(3rem,12vw,5rem)] sm:text-display-s font-black tracking-tighter leading-[0.95] text-ink"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-18 lg:gap-36 items-start">
            <div ref={contactLeftRef} className="flex flex-col gap-6 pt-3 items-start">
              <div className="flex items-center gap-3 flex-wrap">
                {homePageData.contactSection.links.map((link, index) => {
                  const Container = link.type === 'internal' ? Link : 'a'

                  return (
                    <Fragment key={link.href}>
                      <Magnetic range={30} strength={0.2}>
                        <Container
                          href={link.href}
                          className="font-mono text-sm text-ink-2 no-underline transition-colors duration-fast ease-out whitespace-nowrap min-h-11 inline-flex items-center hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3"
                          target={link.type === 'external' ? '_blank' : undefined}
                          rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                          aria-label={link.label}
                        >
                          {link.label}
                        </Container>
                      </Magnetic>
                      {index < homePageData.contactSection.links.length - 1 && (
                        <span className="text-ink-3 text-sm" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </div>
            <ContactForm ref={contactRightRef} />
          </div>
        </div>
      </section>
    </>
  )
}
