import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Article, ChartBar, FolderOpen, GlobeHemisphereWest } from '@phosphor-icons/react'
import { Head } from '@inertiajs/react'
import { numberFormatter } from '@/lib/utils/number'

import type { InertiaProps } from '@/types'

type DashboardStats = {
  website: {
    totalPosts: number
    publishedPosts: number
  }
  categories: {
    total: number
  }
  posts: {
    total: number
    published: number
    draft: number
    archived: number
  }
}

type DashboardProps = InertiaProps<{
  stats: DashboardStats
}>

export default function DashboardPage({ stats }: DashboardProps) {
  const publishedRate = stats.posts.total
    ? Math.round((stats.posts.published / stats.posts.total) * 100)
    : 0

  const metrics = [
    {
      label: 'Website posts',
      value: stats.website.totalPosts,
      detail: `${numberFormatter.format(stats.website.publishedPosts)} published`,
      icon: GlobeHemisphereWest,
    },
    {
      label: 'Categories',
      value: stats.categories.total,
      detail: 'Content groups available',
      icon: FolderOpen,
    },
    {
      label: 'Published posts',
      value: stats.posts.published,
      detail: `${publishedRate}% of all posts`,
      icon: ChartBar,
    },
    {
      label: 'Draft posts',
      value: stats.posts.draft,
      detail: `${numberFormatter.format(stats.posts.archived)} archived`,
      icon: Article,
    },
  ]

  return (
    <>
      <Head title="Admin dashboard" />

      <AdminLayout>
        <AdminContainer>
          <header className="flex flex-col gap-3 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
                Admin overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Dashboard stats
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink-2 sm:text-base">
                A quick read on website content, category coverage, and post publishing status.
              </p>
            </div>

            <div className="rounded-2xl border border-rule bg-surface px-4 py-3 text-sm text-ink-2 shadow-sm">
              <span className="font-medium text-ink">
                {numberFormatter.format(stats.posts.total)}
              </span>{' '}
              total posts tracked
            </div>
          </header>

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Dashboard metrics"
          >
            {metrics.map((metric) => {
              const Icon = metric.icon

              return (
                <article
                  key={metric.label}
                  className="rounded-3xl border border-rule bg-surface p-5 shadow-sm transition-transform duration-fast ease-out hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-ink-2">{metric.label}</p>
                      <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">
                        {numberFormatter.format(metric.value)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-accent-subtle p-3 text-accent">
                      <Icon className="size-6" weight="duotone" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="mt-5 border-t border-rule pt-4 text-sm text-ink-3">
                    {metric.detail}
                  </p>
                </article>
              )
            })}
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <article className="rounded-3xl border border-rule bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-ink">Posts metrics</h2>
                  <p className="text-sm text-ink-3">Current editorial pipeline by status.</p>
                </div>
                <p className="text-sm font-medium text-ink-2">{publishedRate}% published</p>
              </div>

              <div className="mt-6 space-y-4">
                <StatusBar
                  label="Published"
                  value={stats.posts.published}
                  total={stats.posts.total}
                />
                <StatusBar label="Draft" value={stats.posts.draft} total={stats.posts.total} />
                <StatusBar
                  label="Archived"
                  value={stats.posts.archived}
                  total={stats.posts.total}
                />
              </div>
            </article>

            <article className="rounded-3xl border border-rule bg-surface p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-ink">Category coverage</h2>
              <p className="mt-2 text-sm leading-6 text-ink-3">
                {stats.categories.total > 0
                  ? `${numberFormatter.format(stats.categories.total)} categories are available for organizing posts.`
                  : 'No categories have been created yet.'}
              </p>

              <div className="mt-6 rounded-2xl bg-paper-2 p-4">
                <p className="text-sm font-medium text-ink-2">Average posts per category</p>
                <p className="mt-2 text-3xl font-semibold text-ink">
                  {stats.categories.total
                    ? numberFormatter.format(Math.round(stats.posts.total / stats.categories.total))
                    : '0'}
                </p>
              </div>
            </article>
          </section>
        </AdminContainer>
      </AdminLayout>
    </>
  )
}

function StatusBar({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = total ? Math.round((value / total) * 100) : 0

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink-2">{label}</span>
        <span className="text-ink-3">
          {numberFormatter.format(value)} · {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-paper-3">
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
