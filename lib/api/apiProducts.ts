import { category, Product, ProductItem } from "@/types";
import { api } from "../axios";

// Get Endpoints

// Get All Categories
export async function getAllCategories() {
  try {
    const response = await api.get("home/categories");
    const categories: category[] = response.data.data;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Home API Endpoints
// Get Offers

// Get Search Products
export async function getSearchProducts(
  categoryId?: string,
  keyword?: string
): Promise<ProductItem[]> {
  try {
    const response = await api.get(`products/search`, {
      params: { category_id: categoryId, keyword: keyword },
    });
    const products: ProductItem[] = response.data.data;
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
}

// Get Filtered Products
export async function getFilteredProducts(): Promise<ProductItem[]> {
  try {
    const response = await api.get(`filter-products`, {
      params: {
        price_min: "100",
        price_max: "",
        user_rating_min: "",
        pharmacist_rating_min: "",
      },
    });
    const products: ProductItem[] = response.data.data;
    return products;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
}

// Get a single product by ID

export async function getProduct(productId: string): Promise<Product> {
  try {
    const response = await api.get(`products/${productId}`);
    const product: Product = response.data.data;
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// Post Endpoints

// Delete Endpoints
