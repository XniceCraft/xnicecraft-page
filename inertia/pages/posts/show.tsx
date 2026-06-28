import { Link } from '@adonisjs/inertia/react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SEO } from '@/components/seo'
import { TiptapRenderer } from '@/components/tiptap/tiptap-renderer'
import { formatDate } from '@/lib/utils/date'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'

export default function PostsShow({
  post,
}: InertiaProps<{
  post: Data.Post.Variants['withDetail']
}>) {
  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt ?? undefined}
        image={post.coverImage ?? undefined}
        type="article"
        author="XniceCraft"
      />

      <Navbar />

      <main>
        <article aria-labelledby="post-title">
          <header className="bg-paper-2 pt-[calc(var(--nav-height)+var(--spacing-16))] sm:pt-[calc(var(--nav-height)+var(--spacing-24))] pb-16 sm:pb-20 px-(--page-gutter) border-b border-rule">
            <div className="max-w-page-max mx-auto flex flex-col gap-6">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 list-none m-0 p-0 font-mono text-xs text-ink-3">
                  <li>
                    <Link
                      href="/blog"
                      className="transition-colors duration-fast ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 focus-visible:rounded-sm"
                    >
                      Writing
                    </Link>
                  </li>
                  <li aria-hidden="true">·</li>
                  <li className="truncate max-w-[32ch]" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              {post.category && (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent m-0">
                  {post.category.name}
                </p>
              )}

              <h1
                id="post-title"
                className="font-display text-[clamp(1.875rem,6vw,3rem)] sm:text-display-s font-black tracking-tighter leading-[1.05] text-ink m-0 max-w-[22ch] overflow-wrap-anywhere min-w-0"
              >
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="font-body text-lg sm:text-xl text-ink-2 m-0 max-w-[54ch] leading-[1.6]">
                  {post.excerpt}
                </p>
              )}

              {post.publishedAt && (
                <div className="flex items-center gap-3 flex-wrap pt-2">
                  <time dateTime={post.publishedAt} className="font-mono text-xs text-ink-3">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              )}
            </div>
          </header>

          {post.coverImage && (
            <div className="px-(--page-gutter) pt-12 max-w-page-max mx-auto w-full box-border">
              <figure>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-video object-cover rounded-xl border border-rule"
                />
              </figure>
            </div>
          )}

          <section
            className="px-(--page-gutter) py-16 sm:py-20 max-w-[calc(var(--page-max)+2*var(--page-gutter))] mx-auto w-full box-border"
            aria-label="Post content"
          >
            <div className="max-w-[72ch]">
              <TiptapRenderer content={post.content} />
            </div>
          </section>

          <footer className="px-(--page-gutter) pb-20 max-w-page-max mx-auto">
            <div className="flex items-center pt-8 border-t border-rule">
              <Link
                route="posts.index"
                className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-ink-2 no-underline pb-0.5 border-b border-rule transition-colors duration-fast ease-out hover:text-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M11.5 7h-9M6 3.5L2.5 7 6 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                All posts
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  )
}
