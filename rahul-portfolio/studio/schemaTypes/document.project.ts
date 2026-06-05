export const project = {
    name: 'project',
    title: 'Project',
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
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 4,
      },
      {
        name: 'longDescription',
        title: 'Long Description',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'images',
        title: 'Project Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
      {
        name: 'technologies',
        title: 'Technologies Used',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'liveUrl',
        title: 'Live URL',
        type: 'url',
      },
      {
        name: 'githubUrl',
        title: 'GitHub URL',
        type: 'url',
      },
      {
        name: 'featured',
        title: 'Featured Project',
        type: 'boolean',
        initialValue: false,
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
      },
    ],
  };
  