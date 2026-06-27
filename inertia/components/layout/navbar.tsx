import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from '@adonisjs/inertia/react'
import { Magnetic } from '@/components/ui/magnetic'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'
import { globalData } from '@/lib/data/global'

gsap.registerPlugin(useGSAP)

const links = [
  { href: '#works', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setMenuOpen(false)

    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  useGSAP(
    () => {
      if (isMobile) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })

      tl.from(navRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
        .from(
          '.nav-logo',
          {
            x: -20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          '.nav-link-item',
          {
            y: -15,
            opacity: 0,
            stagger: 0.06,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.nav-badge',
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    { scope: navRef, revertOnUpdate: true }
  )

  return (
    <>
      <nav
        ref={navRef}
        id="main-nav"
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-100 flex justify-center px-(--page-gutter) transition-[padding,background,backdrop-filter,box-shadow,border-radius,max-width,margin] duration-slow ease-out',
          scrolled ? 'py-3' : 'py-4'
        )}
      >
        <div
          className={cn(
            'flex items-center gap-6 h-(--nav-height) transition-[max-width,border-radius,background,padding] duration-slow ease-out',
            scrolled
              ? 'max-w-(--nav-pill-max) w-full bg-paper/88 backdrop-blur-md saturate-160 rounded-pill shadow-[0_1px_0_0_var(--color-rule),0_4px_24px_-4px_rgba(14,15,36,0.1)] border border-rule px-6'
              : 'max-w-page-max w-full bg-transparent rounded-none shadow-none border-none backdrop-blur-none px-0'
          )}
        >
          <Magnetic range={40} strength={0.2} className="mr-auto inline-block nav-logo">
            <Link
              href="/"
              className="font-display font-black text-xl text-ink no-underline tracking-tighter leading-none transition-colors duration-fast ease-out hover:text-accent"
              aria-label="Go to homepage"
            >
              F<span className="text-accent">.</span>
            </Link>
          </Magnetic>

          {!isMobile && (
            <>
              <ul className="hidden md:flex items-center gap-3 list-none m-0 p-0" role="list">
                {links.map((link) => (
                  <li key={link.href} className="nav-link-item">
                    <Magnetic range={40} strength={0.25}>
                      <Link
                        href={link.href}
                        className="font-body text-sm font-medium text-ink-2 no-underline py-1 px-3 rounded-md transition-all duration-fast ease-out hover:text-ink hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
                      >
                        {link.label}
                      </Link>
                    </Magnetic>
                  </li>
                ))}
              </ul>
              {globalData.availableForWork && (
                <Magnetic range={45} strength={0.2} className="hidden md:inline-block nav-badge">
                  <span
                    className="flex items-center gap-1 font-mono text-xs font-medium text-accent white-space-nowrap py-1 px-3 bg-accent-subtle rounded-pill"
                    aria-label="Availability status: open to work"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse-dot"
                      aria-hidden="true"
                    />
                    Available
                  </span>
                </Magnetic>
              )}
            </>
          )}

          {isMobile && (
            <button
              id="nav-menu-toggle"
              className="flex md:hidden flex-col justify-center items-center gap-1.25 w-10 h-10 bg-transparent border-none cursor-pointer p-1 rounded-md"
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={cn(
                  'block w-5.5 h-[1.5px] bg-ink transition-[transform,opacity] duration-base ease-out origin-center',
                  menuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                )}
              />
              <span
                className={cn(
                  'block w-5.5 h-[1.5px] bg-ink transition-[transform,opacity] duration-base ease-out origin-center',
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                )}
              />
              <span
                className={cn(
                  'block w-5.5 h-[1.5px] bg-ink transition-[transform,opacity] duration-base ease-out origin-center',
                  menuOpen ? 'translate-y-[-6.5px] -rotate-45' : ''
                )}
              />
            </button>
          )}
        </div>
      </nav>

      {isMobile && (
        <div
          id="nav-mobile-menu"
          className={cn(
            'fixed inset-0 top-(--nav-height) z-99 bg-paper px-(--page-gutter) py-12 flex flex-col gap-12 transition-all duration-base ease-out',
            menuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-2 opacity-0 pointer-events-none'
          )}
          aria-hidden={!menuOpen}
        >
          <ul role="list" className="list-none m-0 p-0 flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block font-display text-3xl font-bold text-ink no-underline py-3 border-b border-rule transition-colors duration-fast ease-out hover:text-accent tracking-tighter"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-3 font-mono text-sm text-accent">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse-dot"
              aria-hidden="true"
            />
            Open to work
          </span>
        </div>
      )}
    </>
  )
}
