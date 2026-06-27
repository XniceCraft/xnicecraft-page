import type { urlFor } from '@/client'

type InternalLink = {
  href: Parameters<typeof urlFor>[0]
  type: 'internal'
}

type ExternalLink = {
  href: string
  type: 'external'
}

export type LinkType = InternalLink | ExternalLink
