import type { Icon } from '@phosphor-icons/react'
import type { urlFor } from '@/client'

export type RouteType = {
  label: string
  route: Parameters<typeof urlFor>[0]
  icon: Icon
}
