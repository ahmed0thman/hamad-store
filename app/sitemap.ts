import { MetadataRoute } from "next";
import { getAllCategories, getFilteredProducts } from "@/lib/api/apiProducts";

const SITE_URL = process.env.NEXTAUTH_URL || "https://valideria.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with all important pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/plans`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    // Get categories for dynamic pages
    const categories = await getAllCategories();
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${SITE_URL}/products?category=${category.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));

    // Get products for dynamic pages (limit to recent ones for performance)
    const productsResponse = await getFilteredProducts({
      pageSize: 100, // Limit for performance
      page: 1,
    });

    const productPages: MetadataRoute.Sitemap =
      productsResponse.success && productsResponse.products
        ? productsResponse.products.map((product) => ({
            url: `${SITE_URL}/product/${product.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          }))
        : [];

    return [...staticPages, ...categoryPages, ...productPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static pages if API fails
    return staticPages;
  }
}
