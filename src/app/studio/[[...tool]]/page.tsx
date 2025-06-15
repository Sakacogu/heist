"use client";

import { Studio } from "sanity";

import config from "../../../../sanity.config";

export const metadata = { title: 'Heist - Studio' };

export default function StudioPage() {
  return <Studio config={config} />;
}
