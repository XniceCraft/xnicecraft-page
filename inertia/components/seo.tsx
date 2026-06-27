import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME
const siteUrl = import.meta.env.VITE_APP_URL

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string | string[]
  author?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  robots?: string
  noIndex?: boolean
}

export function SEO({
  title,
  description = 'XniceCraft',
  image,
  type = 'website',
  keywords,
  author = 'XniceCraft',
  twitterCard = 'summary_large_image',
  robots,
  noIndex = false,
}: SEOProps) {
  const { url } = usePage()

  const seoUrl = url ? `${siteUrl}${url}` : siteUrl
  const seoImage = image?.startsWith('http') ? image : `${siteUrl}${image}`
  const formattedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords
  const robotsContent = noIndex ? 'noindex, nofollow' : robots || 'index, follow'

  return (
    <Head title={title}>
      <meta name="description" content={description} />
      {formattedKeywords && <meta name="keywords" content={formattedKeywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={seoUrl} />

      <meta property="og:title" content={title || appName} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={seoImage} />}
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={appName} />

      <meta name="twitter:card" content={twitterCard} />
      {image && <meta name="twitter:image" content={seoImage} />}
      <meta name="twitter:title" content={title || appName} />
      <meta name="twitter:description" content={description} />
      {author && <meta name="twitter:creator" content={author} />}
    </Head>
  )
}
