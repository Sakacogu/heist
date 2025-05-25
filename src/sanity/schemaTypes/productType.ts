import { defineType, defineField } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'brand',
      type: 'string',
      title: 'Brand',
      options: { list: ['UniFi', 'Plejd', 'Shelly', 'HomeAssistant'] },
    }),
    defineField({ name: 'priceISK', type: 'number', title: 'Price (ISK)' }),
    defineField({ name: 'image', type: 'image', title: 'Image' }),
    defineField({ name: 'stock', type: 'number', title: 'Stock', initialValue: 10 }),
    defineField({ name: 'blurb', type: 'text', title: 'Description' }),
  ],
});
