import { Link } from '@adonisjs/inertia/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FilesIcon } from '@phosphor-icons/react'
import { formatDate } from '@/lib/utils/date'
import { formatReadTime } from '@/lib/utils/post'

import type { InertiaProps } from '@/types'
import type { Data } from '@generated/data'
import type { Paginate } from '@/types/paginate'

export default function PostsIndex({
  posts,
  categories,
}: InertiaProps<{
  posts: Paginate<Data.Post[]>
  categories: Data.Category[]
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <header className="bg-paper-2 pt-[calc(var(--nav-height)+(--spacing(3)))] sm:pt-[calc(var(--nav-height)+(--spacing(6)))] pb-16 sm:pb-24 px-(--page-gutter) border-b border-rule">
          <div className="max-w-page-max mx-auto flex flex-col gap-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent m-0">Writing</p>
            <h1 className="font-display text-[clamp(2.25rem,10vw,4rem)] sm:text-display-s font-black tracking-tighter leading-none text-ink m-0 max-w-[18ch] overflow-wrap-anywhere min-w-0">
              What I built, what broke, <span className="text-accent">what came next.</span>
            </h1>
            <p className="font-body text-lg text-ink-2 m-0 max-w-[52ch] leading-[1.6]">
              I write when I figure something out and don't want to forget it.
            </p>
          </div>
        </header>

        <div
          className="flex items-center gap-1.5 flex-wrap py-6 px-(--page-gutter) border-b border-rule max-w-[calc(var(--page-max)+2*var(--page-gutter))] mx-auto w-full box-border"
          aria-label="Available tags"
        >
          <Link
            route="posts.index"
            className="font-mono text-xs text-accent bg-accent-subtle border border-accent rounded-full py-1 px-2 cursor-default select-none whitespace-nowrap"
          >
            All
          </Link>
          {categories.map((category) => (
            <span
              key={category.id}
              className="font-mono text-xs text-ink-3 bg-surface-2 border border-rule rounded-full py-1 px-2 cursor-default select-none whitespace-nowrap"
            >
              {category.name}
            </span>
          ))}
        </div>

        {posts.data.length > 0 ? (
          <ol
            className="list-none m-0 px-(--page-gutter) max-w-page-max mx-auto w-full box-border"
            aria-label="Blog posts"
          >
            {posts.data.map((post) => (
              <li key={post.slug} className="border-b border-rule first:border-t-0">
                <article aria-labelledby={`bi-${post.slug}-title`}>
                  <Link
                    route="posts.show"
                    routeParams={{ slug: post.slug }}
                    className="group/card flex flex-col gap-4 py-12 no-underline text-inherit transition-all duration-fast ease-out hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 focus-visible:rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt} className="font-mono text-xs text-ink-3">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <span className="text-ink-3 text-xs" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono text-xs text-ink-3">
                        {formatReadTime(post.readTime)}
                      </span>
                    </div>
                    <h2
                      id={`bi-${post.slug}-title`}
                      className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-[1.15] text-ink m-0 max-w-[60ch] overflow-wrap-anywhere min-w-0 transition-colors duration-fast ease-out group-hover/card:text-accent"
                    >
                      {post.title}
                    </h2>
                    <p className="font-body text-base text-ink-2 leading-[1.65] m-0 max-w-[64ch]">
                      {post.excerpt}
                    </p>
                    {post.category && (
                      <span className="font-mono text-xs text-ink-3 bg-surface-2 py-0.5 px-2 rounded-md border border-rule">
                        {post.category.name}
                      </span>
                    )}
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <section
            className="flex flex-col items-center justify-center text-center py-20 sm:py-32 px-(--page-gutter) max-w-page-max mx-auto w-full box-border"
            aria-labelledby="empty-title"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-surface-2 border border-rule text-ink-3 mb-6">
              <FilesIcon size={24} />
            </div>
            <h2
              id="empty-title"
              className="font-display text-2xl font-bold tracking-tight text-ink m-0 mb-3"
            >
              No posts found
            </h2>
          </section>
        )}
      </main>
      <Footer variant="simplified" />
    </>
  )
}
