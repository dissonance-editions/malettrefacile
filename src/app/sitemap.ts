import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { getAllLetters } from "@/data/letters";

const BASE_URL = "https://malettrefacile.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const letters = getAllLetters();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/lettres`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/generateur`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tarifs`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/login`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/lettres/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const letterPages: MetadataRoute.Sitemap = letters.map((letter) => ({
    url: `${BASE_URL}/lettres/${letter.category}/${letter.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...letterPages];
}
