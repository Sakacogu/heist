import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './block-Content-Type'
import {categoryType} from './category-Type'
import {postType} from './post-Type'
import {authorType} from './author-Type'
import {productType} from './product-Type';
 

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    authorType,
    categoryType,
    postType,
    blockContentType,
  ],
}
