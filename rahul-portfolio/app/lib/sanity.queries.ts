// ✅ FIXED: Use "project" (singular) - matches your schema
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(publishedAt desc) [0...3]{
  _id,
  title,
  slug,
  description,
  "imageUrl": image.asset->url,
  technologies,
  liveUrl,
  githubUrl,
  featured,
  publishedAt
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) [0...12]{
  _id,
  title,
  slug,
  description,
  "imageUrl": image.asset->url,
  technologies,
  featured,
  liveUrl,
  githubUrl,
  publishedAt
}`

export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  "imageUrl": image.asset->url,  // ← ADD THIS LINE
  "images": images[].asset->url, // ← Multiple images
  technologies,
  liveUrl,
  githubUrl,
  featured,
  publishedAt
}`



// ✅ FIXED: blogPost (matches YOUR schema)
export const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...10]{
  _id,
  title,
  slug,
  excerpt,
  "imageUrl": image.asset->url,      // ← Matches YOUR "image" field
  author->{
    name
  },
  publishedAt,
  categories
}`

export const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content,                          // ← Matches YOUR "content" field
  excerpt,
  "imageUrl": image.asset->url,     // ← Featured Image
  author->{
    name
  },
  publishedAt,
  categories
}`

