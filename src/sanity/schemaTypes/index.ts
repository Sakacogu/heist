import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { productType } from "./productType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, authorType, categoryType, postType, blockContentType],
};
