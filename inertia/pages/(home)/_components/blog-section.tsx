import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Link } from '@adonisjs/inertia/react'
import { Magnetic } from '@/components/ui/magnetic'
import { SplitText } from '@/components/ui/split-text'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { formatDate } from '@/lib/utils/date'
import { homePageData } from '@/lib/data/home'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLSpanElement>(null)
  const blogCardsRef = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const select = gsap.utils.selector(headingRef.current)
      const chars = select<HTMLSpanElement>('.split-char')

      if (chars && chars.length > 0) {
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

      const selectBlog = gsap.utils.selector(blogCardsRef.current)
      const blogCards = selectBlog<HTMLLIElement>('.blog-card')

      gsap.from(blogCards, {
        scrollTrigger: {
          trigger: blogCardsRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    { scope: sectionRef }
  )

  return (
    <>
      <section
        ref={sectionRef}
        id="blog-teaser"
        className="py-48 not-sm:py-24 px-(--page-gutter) bg-paper"
        aria-label="Latest writing"
      >
        <div className="max-w-page-max mx-auto flex flex-col gap-24">
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <div className="overflow-hidden">
              <SplitText
                ref={headingRef}
                className="block font-display text-[clamp(3rem,12vw,5rem)] sm:text-display-s font-black tracking-tighter leading-[0.95] text-ink"
                text="Writing"
              />
            </div>
            <Magnetic range={40} strength={0.25}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 font-mono text-sm font-medium text-ink-2 no-underline pb-0.5 border-b border-rule transition-colors duration-fast ease-out hover:text-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 whitespace-nowrap"
              >
                All posts
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Magnetic>
          </div>

          <ol
            ref={blogCardsRef}
            className="list-none m-0 p-0 flex flex-col"
            aria-label="Latest posts"
          >
            {homePageData.blogSection.posts.map((post) => (
              <li key={post.slug} className="border-t border-rule last:border-b last:border-rule">
                <article className="blog-card" aria-labelledby={`post-${post.slug}-title`}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/card flex flex-col gap-4 py-12 no-underline text-inherit transition-all duration-fast ease-out hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 focus-visible:rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <time dateTime={post.date} className="font-mono text-xs text-ink-3">
                        {formatDate(post.date)}
                      </time>
                      <span className="text-ink-3 text-xs" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono text-xs text-ink-3">{post.readTime} read</span>
                    </div>

                    <h2
                      id={`post-${post.slug}-title`}
                      className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-[1.15] text-ink m-0 max-w-[56ch] overflow-wrap-anywhere min-w-0 transition-colors duration-fast ease-out group-hover/card:text-accent"
                    >
                      {post.title}
                    </h2>

                    <p className="font-body text-base text-ink-2 leading-[1.65] m-0 max-w-[64ch]">
                      {post.excerpt}
                    </p>

                    <ul
                      className="flex flex-wrap gap-1 list-none m-0 p-0"
                      role="list"
                      aria-label="Tags"
                    >
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="font-mono text-xs text-ink-3 bg-surface-2 py-0.5 px-3 rounded-md border border-rule"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
