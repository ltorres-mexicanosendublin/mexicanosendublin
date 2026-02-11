import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mexicanosendublin.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/guias`, lastModified: new Date() },
    { url: `${baseUrl}/productos`, lastModified: new Date() },
    { url: `${baseUrl}/escuelas`, lastModified: new Date() },
    { url: `${baseUrl}/directorio`, lastModified: new Date() },
  ];
}
