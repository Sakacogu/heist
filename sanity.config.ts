import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./src/sanity/schemaTypes/index";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  projectId: "vbews4kx",
  dataset: "production",
  plugins: [deskTool(), visionTool()],
  schema,
});
