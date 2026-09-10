import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Matches the noindex on the resume route itself.
      disallow: "/resume",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
