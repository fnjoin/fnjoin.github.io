/** app/sitemap.xml/route.ts **/

import { MetadataRoute } from "next";
import { BlogRepository, PageRepository } from "@/lib/repository";

function getPostsForSitemap(): MetadataRoute.Sitemap {
    const posts = BlogRepository.fromCwd().getAllPosts();
    const pages = PageRepository.fromCwd().getAllPosts();

    return [...posts, ...pages].map((page) => {
        let path = page.slug;
        if (!path.endsWith("/")) {
            path += "/";
        }

        // Format date as yyyy-mm-dd for sitemap
        const formatDate = (date: string | Date) => {
            if (!date) return new Date().toISOString().split("T")[0];
            const d = new Date(date);
            return d.toISOString().split("T")[0];
        };

        return {
            url: `https://fnjoin.com/${path}`,
            lastModified: formatDate(page.date),
            changeFrequency: "daily",
            priority: 0.5,
        };
    });
}

// dynamically generate sitemap xml data
function getSitemap() {
    const map = getPostsForSitemap();

    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${map
          .map(
              (item) => `
              <url>
                <loc>${item.url}</loc>
                <lastmod>${item.lastModified}</lastmod>
                <changefreq>${item.changeFrequency}</changefreq>
                <priority>${item.priority}</priority>
              </url>
            `,
          )
          .join("")}
      </urlset>
    `;
}

export async function GET() {
    return new Response(getSitemap(), {
        headers: {
            "Content-Type": "text/xml",
        },
    });
}
