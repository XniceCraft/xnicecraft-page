import { AdminContainer } from '@/components/container/admin-container'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Link } from '@adonisjs/inertia/react'
import { Head, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { FolderOpenIcon, NotePencilIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { numberFormatter } from '@/lib/utils/number'

import type { Data } from '@generated/data'
import type { InertiaProps } from '@/types'
import type { Paginate } from '@/types/paginate'

type CategoryIndexProps = InertiaProps<{
  categories: Paginate<Data.Category.Variants['withPostsCount'][]>
}>

export default function CategoryIndexPage({ categories }: CategoryIndexProps) {
  function deleteCategory(category: Data.Category) {
    if (!window.confirm(`Delete category "${category.name}"?`)) return

    router.delete(`/admin/category/${category.id}`)
  }

  return (
    <>
      <Head title="Categories" />

      <AdminLayout>
        <AdminContainer>
          <header className="flex flex-col gap-4 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
                Admin categories
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Category library
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink-2 sm:text-base">
                Manage the labels that organize posts across the website.
              </p>
            </div>

            <Button asChild size="lg" className="w-full sm:w-fit">
              <Link route="admin.categories.create">
                <PlusIcon className="size-4" aria-hidden="true" />
                New category
              </Link>
            </Button>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Category metrics">
            <MetricCard label="Total categories" value={categories.data.length} />
            <MetricCard
              label="Attached posts"
              value={categories.data.reduce(
                (total, category) => total + (category.postsCount ?? 0),
                0
              )}
            />
            <MetricCard
              label="Empty categories"
              value={categories.data.filter((category) => !category.postsCount).length}
            />
          </section>

          <section className="overflow-hidden rounded-3xl border border-rule bg-surface shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-ink">All categories</h2>
                <p className="text-sm text-ink-3">
                  {numberFormatter.format(categories.data.length)} records
                </p>
              </div>
            </div>

            {categories.data.length > 0 ? (
              <div className="divide-y divide-rule">
                {categories.data.map((category) => (
                  <article
                    key={category.id}
                    className="grid grid-cols-1 gap-4 px-5 py-4 transition-colors hover:bg-paper-2 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-ink">{category.name}</h3>
                      <p className="mt-1 truncate font-mono text-xs text-ink-3">/{category.slug}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <span className="rounded-full border border-rule bg-paper px-3 py-1 text-xs font-medium text-ink-2">
                        {numberFormatter.format(category.postsCount ?? 0)} posts
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <Link route="admin.categories.edit" routeParams={{ slug: category.slug }}>
                          <NotePencilIcon className="size-4" aria-hidden="true" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteCategory(category)}
                      >
                        <TrashIcon className="size-4" aria-hidden="true" />
                        Delete
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <div className="rounded-3xl bg-accent-subtle p-4 text-accent">
                  <FolderOpenIcon className="size-8" weight="duotone" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-ink">No categories yet</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-2">
                  Create the first category before publishing posts into organized groups.
                </p>
                <Button asChild className="mt-5">
                  <Link route="admin.categories.create">Create category</Link>
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
