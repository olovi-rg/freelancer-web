export const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' },
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
      },
    ],
  };
  