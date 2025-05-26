import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'vbews4kx',
  dataset:   'production',
  apiVersion:'2023-01-01',
  useCdn:    true,
});
