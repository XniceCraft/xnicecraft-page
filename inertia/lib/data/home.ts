import type { LinkType } from '@/types/link'

type ContactLinkType = {
  label: string
} & LinkType

type HomePageDataType = {
  heroSection: {
    firstName: string
    lastName: string
    description: string
    ctaButtonText: string
  }
  aboutSection: {
    skills: {
      group: string
      items: string[]
    }[]
    education: {
      school: string
      major: string
      startYear: string
      endYear: string
    }[]
  }
  projectSection: {
    projects: {
      title: string
      description: string
      role: string
      stack: string[]
      live: string
      github: string
    }[]
  }
  blogSection: {
    posts: {
      slug: string
      title: string
      date: string
      readTime: string
      tags: string[]
      excerpt: string
    }[]
  }
  contactSection: {
    links: ContactLinkType[]
  }
}

export const homePageData: HomePageDataType = {
  heroSection: {
    firstName: 'Farel',
    lastName: 'Erdiansyah',
    description: 'Fullstack Engineer — software crafted with intent.',
    ctaButtonText: 'View my work',
  },
  aboutSection: {
    skills: [
      {
        group: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Arduino'],
      },
      {
        group: 'Frontend',
        items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP'],
      },
      {
        group: 'Backend',
        items: ['Laravel', 'AdonisJS'],
      },
      {
        group: 'Data',
        items: ['MySQL', 'Redis', 'IndexedDB'],
      },
      {
        group: 'Tooling',
        items: ['Git', 'Linux', 'VS Code/Antigravity'],
      },
    ],
    education: [
      {
        school: 'SMK Negeri 1 Banyuwangi',
        major: 'Pengembangan Perangkat Lunak dan Gim',
        startYear: '2023',
        endYear: '2026',
      },
      {
        school: 'Politeknik Negeri Banyuwangi',
        major: 'Teknik Rekayasa Perangkat Lunak',
        startYear: '2026',
        endYear: 'Present',
      },
    ],
  },
  projectSection: {
    projects: [
      {
        title: 'Real-Time Vision Dashboard',
        description:
          'A live computer-vision monitoring interface built with WebSockets and OpenCV. Streams processed frames at sub-100 ms latency with configurable detection pipelines.',
        role: 'Fullstack — frontend + backend + CV pipeline',
        stack: ['Python', 'OpenCV', 'FastAPI', 'React', 'WebSockets'],
        live: '#',
        github: '#',
      },
      {
        title: 'Collaborative Dev Environment',
        description:
          'A multiplayer code editor with real-time presence, syntax highlighting, and shared terminal sessions. Think Linear meets Replit, scoped for small teams.',
        role: 'Frontend lead + WebSocket protocol design',
        stack: ['Next.js', 'TypeScript', 'Socket.io', 'Monaco', 'Redis'],
        live: '#',
        github: '#',
      },
      {
        title: 'Inventory Intelligence System',
        description:
          'End-to-end stock management for a local distributor — barcode scanning, demand forecasting heuristics, and a one-page dashboard that replaced three spreadsheets.',
        role: 'Solo — full product design + engineering',
        stack: ['Node.js', 'PostgreSQL', 'Prisma', 'React', 'Chart.js'],
        live: '#',
        github: '#',
      },
      {
        title: 'Personal Finance Tracker',
        description:
          'A privacy-first budget tracker that runs entirely in the browser. CSV import, category rules, monthly trend charts — no account, no backend, no tracking.',
        role: 'Product design + engineering',
        stack: ['TypeScript', 'IndexedDB', 'D3.js', 'Vite'],
        live: '#',
        github: '#',
      },
    ],
  },
  blogSection: {
    posts: [
      {
        slug: 'building-realtime-cv-dashboard',
        title: 'Building a Real-Time CV Dashboard at Sub-100ms Latency',
        date: '2026-05-12',
        readTime: '8 min',
        tags: ['Computer Vision', 'WebSockets', 'Python'],
        excerpt:
          'How I wired OpenCV frame streams into a React frontend without turning the browser into a slideshow — and what I learned about WebSocket back-pressure along the way.',
      },
      {
        slug: 'typescript-strict-mode-worth-it',
        title: 'TypeScript Strict Mode Is Always Worth It',
        date: '2026-04-28',
        readTime: '5 min',
        tags: ['TypeScript', 'Opinion'],
        excerpt:
          "Six months into using strict TypeScript on every project, here's what I'd tell my past self — and why the early pain is entirely front-loaded.",
      },
      {
        slug: 'gsap-scroll-trigger-patterns',
        title: 'Three GSAP ScrollTrigger Patterns I Use on Every Project',
        date: '2026-03-15',
        readTime: '6 min',
        tags: ['GSAP', 'Animation', 'Frontend'],
        excerpt:
          'Pinned scrubs, batch reveals, and the morph-on-scroll nav: the three patterns that cover 90% of scroll-animation needs without overengineering.',
      },
    ],
  },
  contactSection: {
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
  },
}
