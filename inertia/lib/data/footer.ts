import type { LinkType } from '@/types/link'

type FooterLinkType = {
  label: string
} & LinkType

type FooterType = {
  message: {
    primary: string
    secondary: string
  }
  copyright: string
  links: FooterLinkType[]
}

export const footerData: FooterType = {
  message: {
    primary: 'Built with intent',
    secondary: 'every pixel deliberate',
  },
  copyright: 'Farel Erdiansyah Widiarta',
  links: [
    { label: 'Home', href: 'home', type: 'internal' },
    { label: 'Blog', href: '/blog', type: 'external' },
    { label: 'GitHub', href: 'https://github.com/XniceCraft', type: 'external' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/farel-erdiansyah-widiarta',
      type: 'external',
    },
  ],
}
