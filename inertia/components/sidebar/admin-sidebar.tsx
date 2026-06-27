import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { cn } from '@/lib/utils'
import {
  ChartBarIcon,
  FolderIcon,
  FileTextIcon,
  GlobeIcon,
  GearSixIcon,
  SignOutIcon,
} from '@phosphor-icons/react'
import { urlFor } from '@/client'

import type { RouteType } from '@/types/route'

const navigation: RouteType[] = [
  {
    label: 'Dashboard',
    route: 'admin.dashboard',
    icon: ChartBarIcon,
  },
  {
    label: 'Posts',
    route: 'admin.posts.index',
    icon: FileTextIcon,
  },
  {
    label: 'Categories',
    route: 'admin.categories.index',
    icon: FolderIcon,
  },
  {
    label: 'Website',
    route: 'admin.posts.index',
    icon: GlobeIcon,
  },
]

export function AdminSidebar() {
  const { url } = usePage()

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-rule bg-surface font-sans">
      <div className="border-b border-rule px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-paper shadow-sm">
            <GearSixIcon size={20} weight="fill" />
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-ink-3 uppercase">
              Admin Panel
            </p>
            <h2 className="text-lg font-bold tracking-tight text-ink">xnicecraft</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="mb-4 px-3.5 font-mono text-[10px] tracking-[0.2em] text-ink-3 uppercase">
          Navigation
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const normalizedURL = url.endsWith('/') ? url.substring(0, url.length - 1) : url
            const active = urlFor(item.route) === normalizedURL

            return (
              <Link
                key={item.label}
                route={item.route}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-fast ease-out outline-none',
                  'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-1',
                  'active:translate-y-px active:scale-[0.98]',
                  'disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none',
                  'data-[state=loading]:opacity-70 data-[state=loading]:cursor-wait',
                  'data-[state=error]:text-destructive data-[state=error]:border-destructive',
                  'data-[state=success]:text-accent',
                  active
                    ? 'bg-accent-subtle text-accent shadow-sm'
                    : 'text-ink-2 hover:bg-paper-2 hover:text-ink hover:translate-x-0.5'
                )}
              >
                <item.icon size={20} weight="duotone" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-rule p-4">
        <div className="mb-4 rounded-2xl border border-rule bg-paper-2 p-4">
          <p className="text-sm font-semibold text-ink">Administrator</p>
          <p className="mt-1 text-xs text-ink-3">Manage website content</p>
        </div>

        <Link
          href="/logout"
          method="post"
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-fast ease-out outline-none',
            'focus-visible:outline-2 focus-visible:outline-destructive focus-visible:outline-offset-1',
            'active:translate-y-px active:scale-[0.98]',
            'text-ink-2 hover:bg-destructive/10 hover:text-destructive hover:translate-x-0.5'
          )}
        >
          <SignOutIcon size={20} weight="duotone" />
          Logout
        </Link>
      </div>
    </aside>
  )
}
