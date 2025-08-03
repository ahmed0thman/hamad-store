import { Brand, category, Product, ProductItem } from "@/types";
import { api } from "../axios";
import { AxiosError } from "axios";
import { delay } from "../utils";
import { success } from "zod";

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

export async function getBrandsBytitle(title?: string) {
  try {
    const response = await api.get(`home/brands/`);
    const brands: Brand[] = response.data.data;
    return brands;
  } catch (error) {
    console.error("Error fetching brands by title:", error);
    throw error;
  }
}

export async function getProductsBytitle(title: string) {
  try {
    const response = await api.get(`home/products/${title}`);
    const products: ProductItem[] = response.data.data;
    return products;
  } catch (error) {
    console.error("Error fetching products by title:", error);
    throw error;
  }
}

// Get Search Products
export async function getSearchProducts(categoryId: string, keyword: string) {
  try {
    console.log("Searching products with:", { categoryId, keyword });
    const response = await api.get(`header/search`, {
      params: { category_id: categoryId, keyword: keyword },
    });
    // console.log("Search API response:", response.data.data.products);
    if (
      response.data.result === "Success" &&
      response.data.data.products.length > 0
    ) {
      const products: ProductItem[] = response.data.data.products;
      return {
        success: true,
        data: products,
      };
    }

    return {
      success: false,
      data: [],
      empty: true,
    };
  } catch (error) {
    console.error("Error searching products:", error);
    return {
      success: false,
    };
  }
}

// Get Filtered Products
interface filterParams {
  price_min?: string;
  price_max?: string;
  user_rating_min?: string;
  pharmacist_rating_min?: string;
  keyword?: string;
  categoryId?: string;
  brandId?: string;
  inStock?: string;
  pageSize?: number;
  page?: number;
  sort?: string;
  sortBy?: string;
}
export async function getFilteredProducts(filterParams: filterParams = {}) {
  // await delay(300000);
  try {
    const response = await api.get(`home/products/filter`, {
      params: {
        price_min: filterParams.price_min || "100",
        price_max: filterParams.price_max || "",
        user_rating_min: filterParams.user_rating_min || "",
        pharmacist_rating_min: filterParams.pharmacist_rating_min || "",
        keyword: filterParams.keyword || "",
        category_id: filterParams.categoryId || "",
        brand_id: filterParams.brandId || "",
        in_stock: filterParams.inStock || "",
      },
    });
    // console.log("Api response:", response.data.data);
    const productsData = response.data.data;
    return {
      success: true,
      products: productsData.products as ProductItem[],
      pagination: productsData.pagination,
      message: "Filtered products retrieved successfully",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching filtered request:", error.request.message);
      console.log("Error response data:", error.response);
    }
    return {
      success: false,
      message: "Failed to retrieve filtered products",
      products: null,
    };
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
