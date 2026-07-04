export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
}

export type ProductBadge = "featured" | "trending" | "new_arrival" | "best_seller";

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  category?: Category;
  brandId: string;
  brand?: Brand;
  summary: string;
  description: string;
  ingredients: string;
  benefits: string[];
  howToUse: string;
  images: ProductImage[];
  thumbnail: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  sku: string;
  weight: string;
  volume: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  rating: number;
  reviewCount: number;
  faqs: ProductFAQ[];
  source?: string;
  sourceUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  productCount?: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  productCount?: number;
}

export interface ProductReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
  verified: boolean;
  helpfulCount: number;
  user?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface ProductFilters {
  category?: string[];
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  availability?: "in_stock" | "out_of_stock";
  tags?: string[];
  badges?: ProductBadge[];
}

export type ProductSortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "newest"
  | "best_seller";

export interface ProductListParams {
  page?: number;
  limit?: number;
  sort?: ProductSortOption;
  filters?: ProductFilters;
  search?: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
