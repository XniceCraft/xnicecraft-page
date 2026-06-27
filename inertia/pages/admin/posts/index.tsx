import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import {
  ArticleIcon,
  CalendarBlankIcon,
  NotePencilIcon,
  PlusIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Head, router } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { formatDateV2 } from '@/lib/utils/date'
import { numberFormatter } from '@/lib/utils/number'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'
import type { Paginate } from '@/types/paginate'

const statusLabels: Record<Data.Post.Variants['withDetail']['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
}

const statusStyles: Record<Data.Post.Variants['withDetail']['status'], string> = {
  draft: 'border-rule bg-paper text-ink-2',
  published: 'border-accent/20 bg-accent-subtle text-accent',
  archived: 'border-rule bg-paper-2 text-ink-3',
}

export default function PostIndexPage({
  posts,
}: InertiaProps<{
  posts: Paginate<Data.Post.Variants['withDetail'][]>
}>) {
  const publishedPosts = posts.data.filter((post) => post.status === 'published').length
  const draftPosts = posts.data.filter((post) => post.status === 'draft').length
  const archivedPosts = posts.data.filter((post) => post.status === 'archived').length

  function deletePost(post: Data.Post.Variants['withDetail']) {
    if (!window.confirm(`Delete post "${post.title}"?`)) return

    router.delete(`/admin/post/${post.id}`)
  }

  return (
    <>
      <Head title="Posts" />

      <AdminLayout>
        <AdminContainer>
          <header className="flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
                Admin posts
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Editorial desk
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink-2 sm:text-base">
                Review drafts, published articles, and archived writing from one focused queue.
              </p>
            </div>

            <Button asChild size="lg" className="w-full sm:w-fit">
              <Link route="admin.posts.create">
                <PlusIcon className="size-4" aria-hidden="true" />
                New post
              </Link>
            </Button>
          </header>

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Post metrics"
          >
            <MetricCard label="Total posts" value={posts.data.length} />
            <MetricCard label="Published" value={publishedPosts} />
            <MetricCard label="Drafts" value={draftPosts} />
            <MetricCard label="Archived" value={archivedPosts} />
          </section>

          <section className="overflow-hidden rounded-3xl border border-rule bg-surface shadow-sm">
            <div className="flex flex-col gap-1 border-b border-rule px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink">All posts</h2>
                <p className="text-sm text-ink-3">
                  {numberFormatter.format(posts.data.length)} records
                </p>
              </div>
              <p className="text-sm font-medium text-ink-2">
                {numberFormatter.format(publishedPosts)} published
              </p>
            </div>

            {posts.data.length > 0 ? (
              <div className="divide-y divide-rule">
                {posts.data.map((post) => {
                  const categoryName = post.category?.name ?? 'Uncategorized'

                  return (
                    <article
                      key={post.id}
                      className="grid grid-cols-1 gap-4 px-5 py-4 transition-colors hover:bg-paper-2 lg:grid-cols-[1fr_auto] lg:items-center"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[post.status]}`}
                          >
                            {statusLabels[post.status]}
                          </span>
                          <span className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2">
                            {categoryName}
                          </span>
                        </div>
                        <h3 className="mt-3 truncate text-base font-semibold text-ink">
                          {post.title}
                        </h3>
                        <p className="mt-1 truncate font-mono text-xs text-ink-3">/{post.slug}</p>
                        {post.excerpt ? (
                          <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-ink-2">
                            {post.excerpt}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2">
                          <CalendarBlankIcon className="size-3.5" aria-hidden="true" />
                          {formatDateV2(post.publishedAt ?? post.createdAt)}
                        </span>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            route="admin.posts.edit"
                            routeParams={{
                              slug: post.slug,
                            }}
                          >
                            <NotePencilIcon className="size-4" aria-hidden="true" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deletePost(post)}>
                          <TrashIcon className="size-4" aria-hidden="true" />
                          Delete
                        </Button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <div className="rounded-3xl bg-accent-subtle p-4 text-accent">
                  <ArticleIcon className="size-8" weight="duotone" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">No posts yet</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-2">
                  Start a draft, assign it to a category, then publish when it is ready for the
                  website.
                </p>
                <Button asChild className="mt-5">
                  <Link route="admin.posts.create">Create post</Link>
                </Button>
              </div>
            )}
          </section>
        </AdminContainer>
      </AdminLayout>
    </>
  )
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-3xl border border-rule bg-surface p-5 shadow-sm">
      <p className="text-sm font-medium text-ink-2">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">
        {numberFormatter.format(value)}
      </p>
    </article>
  )
}
