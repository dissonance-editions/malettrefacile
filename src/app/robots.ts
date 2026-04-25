import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/generateur/"],
      },
    ],
    sitemap: "https://malettrefacile.fr/sitemap.xml",
  };
}
