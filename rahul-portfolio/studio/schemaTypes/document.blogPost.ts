export const blogPost = {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title' },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          {
            type: 'image',
            options: { hotspot: true },
          },
        ],
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          list: [
            { title: 'Next.js', value: 'nextjs' },
            { title: 'React', value: 'react' },
            { title: 'TypeScript', value: 'typescript' },
            { title: 'Web Development', value: 'web-dev' },
          ],
        },
      },
    ],
  };
  