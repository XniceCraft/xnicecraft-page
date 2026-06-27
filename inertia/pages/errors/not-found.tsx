import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SEO } from '@/components/seo'
import { Link } from '@adonisjs/inertia/react'

export default function NotFound() {
  return (
    <>
      <SEO title="404 Not Found" noIndex />
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center px-(--page-gutter) pt-(--nav-height)">
        <div className="max-w-page-max mx-auto w-full flex flex-col items-center text-center">
          <p
            className="font-display text-[clamp(6rem,25vw,12rem)] font-black tracking-[-0.04em] leading-[0.85] text-ink m-0 select-none"
            aria-hidden="true"
          >
            404
          </p>
          <hr className="w-16 h-[2px] bg-rule-strong border-none my-8 mx-auto" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink m-0 mb-4">
            Page not found
          </h1>
          <p className="font-body text-lg text-ink-2 m-0 mb-10 max-w-[42ch] leading-[1.6]">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-base font-semibold text-ink no-underline py-3 px-6 border-[1.5px] border-ink rounded-pill transition-all duration-fast ease-out hover:bg-ink hover:text-paper hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-3 whitespace-nowrap min-h-11"
          >
            Back to home
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
