import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schema } from "./src/sanity/schemaTypes/index";

export default defineConfig({
  projectId: "vbews4kx",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema,
});
