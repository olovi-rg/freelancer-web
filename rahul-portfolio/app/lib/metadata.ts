import { Metadata } from 'next';

export const siteConfig = {
  name: 'Rahul - Web Developer',
  description: 'Full-stack web developer specializing in Next.js, Sanity CMS, and modern web technologies',
  url: 'https://rahulportfolio.com',
  ogImage: 'https://rahulportfolio.com/og-image.jpg',
  twitter: '@rahuldev',
};

export function generateMetadata(
  title: string,
  description: string,
  image?: string
): Metadata {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image || siteConfig.ogImage }],
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || siteConfig.ogImage],
      creator: siteConfig.twitter,
    },
  };
}
