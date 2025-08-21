import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: 'https://krci-ai.kuberocketci.io/sitemap.xml',
    host: 'https://krci-ai.kuberocketci.io',
  }
}
