import { MetadataRoute } from "next";

const siteUrl = "https://www.bersihjaya.id"; // GANTI dengan domain asli

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/layanan", "/harga", "/faq", "/syarat-ketentuan"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
