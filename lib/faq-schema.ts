import type { FAQItem } from './faq-data';
import { BASE_URL } from '@/lib/constants';

/**
 * Generate JSON-LD structured data for FAQ Rich Results
 * Follow Google's FAQ structured data guidelines
 * https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: cleanAnswerForSchema(faq.answer),
      },
    })),
  };
}

/**
 * Clean FAQ answer text for schema.org
 * Remove markdown formatting and code blocks for better search results
 */
function cleanAnswerForSchema(answer: string): string {
  return (
    answer
      // Remove markdown bold/italic
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')

      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')

      // Remove code blocks but keep content
      .replace(/```[\s\S]*?```/g, match => {
        // Extract just the code content without backticks
        const codeContent = match.replace(/```[\w]*\n?/g, '').replace(/```$/g, '');
        return codeContent.trim();
      })

      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')

      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

      // Remove bullet points
      .replace(/^[\s]*[-*+]\s+/gm, '')

      // Clean up excessive whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim()
  );
}

/**
 * Generate meta tags for FAQ page SEO
 */
export function getFAQMetaTags() {
  return {
    title: 'Frequently Asked Questions - KubeRocketAI',
    description:
      'Find answers to common questions about KubeRocketAI installation, implementation, IDE integration, and platform features.',
    keywords:
      'KubeRocketAI FAQ, AI agent framework, SDLC automation, software development, CI/CD, questions answers',
    openGraph: {
      title: 'KubeRocketAI FAQ - Answers to Common Questions',
      description:
        'Get answers about KubeRocketAI installation, IDE integration, platform features, and more.',
      type: 'website',
      url: `${BASE_URL}/faq`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KubeRocketAI FAQ - Answers to Common Questions',
      description:
        'Get answers about KubeRocketAI installation, IDE integration, platform features, and more.',
    },
  };
}

/**
 * Generate breadcrumb structured data for FAQ page
 */
export function getFAQBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: `${BASE_URL}/faq`,
      },
    ],
  };
}
