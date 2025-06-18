export type BookCategory =
  | "Fiction"
  | "Non-Fiction"
  | "Programming"
  | "Science Fiction"
  | "Biography"
  | "Mystery";

export interface ReviewStats {
  reviewCount: number;
  averageRating: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: BookCategory;
  rating: number;
  description: string;
  isFavorite: boolean;
  reviewStats?: ReviewStats;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  pagination: PaginationInfo;
  sort: {
    order: string;
    fields: string[];
  };
}
