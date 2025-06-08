export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  rating?: number;
  reviews?: Review[];
  isFavorite?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
