import { MetadataRoute } from "next";

const siteUrl = "https://www.bersihjaya.id"; // GANTI dengan domain asli

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
