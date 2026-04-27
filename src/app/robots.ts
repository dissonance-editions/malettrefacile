import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/compte", "/login", "/reset-password", "/envoi/"],
      },
    ],
    sitemap: "https://malettrefacile.fr/sitemap.xml",
    host: "https://malettrefacile.fr",
  };
}