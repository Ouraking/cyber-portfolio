import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWriteupProjects } from "@/data/projects";

/**
 * /resume is deliberately absent: it is noindex, and listing a page in the
 * sitemap while telling robots not to index it is a contradictory signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getWriteupProjects().map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
