import { defineType, defineField } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title',     title: 'Title',      type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: { list: ['UniFi', 'Plejd', 'Shelly', 'HomeAssistant'] },
    }),
    defineField({ name: 'priceISK', title: 'Price (ISK)', type: 'number' }),
    defineField({ name: 'image',    title: 'Image',       type: 'image'  }),
    defineField({ name: 'stock',    title: 'Stock',       type: 'number', initialValue: 10 }),
    defineField({ name: 'blurb',    title: 'Description', type: 'text'   }),

    defineField({
      name: 'functions',
      title: 'Function tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Lighting',  value: 'lighting' },
          { title: 'Heating',   value: 'heating'  },
          { title: 'Security',  value: 'security' },
          { title: 'Wi-Fi',     value: 'wifi'     },
          { title: 'Blinds',    value: 'blinds'   },
        ],
      },
    }),
  ],
});
