import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "vbews4kx",
  dataset: "production",
  apiVersion: "2023-01-01", // use a fixed API date for cache safety
  useCdn: true, // fastest for read-only queries
});
