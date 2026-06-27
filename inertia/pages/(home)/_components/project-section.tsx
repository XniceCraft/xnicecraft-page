import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { homePageData } from '@/lib/data/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ProjectSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from('.works-item', {
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
        },
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-label="Selected works"
      className="py-48 px-(--page-gutter) bg-paper-2 max-sm:py-24"
    >
      <div className="max-w-(--page-max) mx-auto flex flex-col gap-24">
        <div className="flex items-baseline gap-12 flex-wrap">
          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="block font-display text-display-s font-black not-italic tracking-[-0.04em] leading-[0.95] text-ink max-sm:text-[clamp(3rem,12vw,5rem)]"
            >
              Works
            </h2>
          </div>
          <p className="font-body text-lg text-ink-3 m-0">
            Selected projects — real problems, shipped code.
          </p>
        </div>
        <ol
          ref={listRef}
          className="list-none m-0 p-0 flex flex-col gap-0"
          aria-label="Project list"
        >
          {homePageData.projectSection.projects.map((project, index) => (
            <li key={project.title} className="works-item border-t border-rule last:border-b">
              <article
                className="group flex flex-col gap-6 py-12 transition-colors duration-fast ease-out cursor-default hover:bg-paper"
                aria-labelledby={`project-${project.title}-title`}
              >
                <div className="grid grid-cols-[3rem_1fr_auto] items-start gap-6 max-lg:grid-cols-[2rem_1fr] max-sm:grid-cols-1">
                  <span
                    className="font-mono text-xs text-ink-3 pt-[0.4em] max-sm:hidden"
                    aria-hidden="true"
                  >
                    {index}
                  </span>
                  <h2
                    id={`project-${index}-title`}
                    className="font-display text-2xl font-bold not-italic tracking-[-0.03em] leading-[1.1] text-ink m-0 max-sm:text-xl"
                  >
                    {project.title}
                  </h2>
                  <div className="flex gap-3 items-center shrink-0 max-lg:col-span-full">
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-ink-2 no-underline py-1 px-3 border border-rule rounded-md transition-all duration-fast ease-out min-h-8 hover:text-ink hover:border-ink-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                      aria-label={`${project.title} on GitHub`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 10L10 2M10 2H4M10 2v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a
                      href={project.live}
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-paper bg-ink no-underline py-1 px-3 border border-ink rounded-md transition-all duration-fast ease-out min-h-8 hover:bg-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                      aria-label={`${project.title} live site`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Live
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 10L10 2M10 2H4M10 2v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="font-body text-base text-ink-2 leading-[1.65] m-0 max-w-[68ch] pl-[calc(3rem+var(--spacing-6))] max-lg:pl-[calc(2rem+var(--spacing-6))] max-sm:pl-0">
                  {project.description}
                </p>
                <div className="flex items-center gap-6 flex-wrap pl-[calc(3rem+var(--spacing-6))] max-lg:pl-[calc(2rem+var(--spacing-6))] max-sm:pl-0">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-3 whitespace-nowrap max-sm:hidden">
                    Role
                  </span>
                  <span className="font-body text-sm text-ink-2 max-sm:hidden">{project.role}</span>
                  <ul
                    className="flex flex-wrap gap-1 list-none m-0 ml-auto p-0 max-sm:m-0"
                    aria-label="Technologies used"
                    role="list"
                  >
                    {project.stack.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-xs text-accent bg-accent-subtle py-0.5 px-3 rounded-md"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
