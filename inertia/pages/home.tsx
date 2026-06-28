import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from './(home)/_components/hero-section'
import { AboutSection } from './(home)/_components/about-section'
import { ProjectSection } from './(home)/_components/project-section'
import { BlogSection } from './(home)/_components/blog-section'
import { Footer } from '@/components/layout/footer'
import { SEO } from '@/components/seo'

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}
