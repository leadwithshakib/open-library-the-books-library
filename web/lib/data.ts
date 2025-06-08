export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  genre: string;
  rating: number;
  totalRatings: number;
  publishedYear: number;
  pages: number;
  isbn: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  bookId: string;
  dateAdded: string;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    cover: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Fiction",
    rating: 4.2,
    totalRatings: 1247,
    publishedYear: 2020,
    pages: 288,
    isbn: "978-0525559474"
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. No matter your goals, Atomic Habits offers a proven framework for improving every day.",
    cover: "https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Self-Help",
    rating: 4.6,
    totalRatings: 2156,
    publishedYear: 2018,
    pages: 320,
    isbn: "978-0735211292"
  },
  {
    id: "3",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    cover: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Historical Fiction",
    rating: 4.5,
    totalRatings: 1834,
    publishedYear: 2017,
    pages: 400,
    isbn: "978-1501161933"
  },
  {
    id: "4",
    title: "Educated",
    author: "Tara Westover",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    cover: "https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Biography",
    rating: 4.4,
    totalRatings: 1923,
    publishedYear: 2018,
    pages: 334,
    isbn: "978-0399590504"
  },
  {
    id: "5",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A woman's act of violence against her husband and her refusal to speak sends shockwaves through London.",
    cover: "https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Thriller",
    rating: 4.1,
    totalRatings: 1567,
    publishedYear: 2019,
    pages: 336,
    isbn: "978-1250301697"
  },
  {
    id: "6",
    title: "Becoming",
    author: "Michelle Obama",
    description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world.",
    cover: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    genre: "Biography",
    rating: 4.7,
    totalRatings: 2845,
    publishedYear: 2018,
    pages: 448,
    isbn: "978-1524763138"
  }
];

export const reviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    userId: "user1",
    userName: "Sarah Chen",
    rating: 5,
    comment: "Absolutely beautiful and thought-provoking. Made me think about all the paths my life could have taken.",
    date: "2024-01-15"
  },
  {
    id: "2",
    bookId: "1",
    userId: "user2",
    userName: "Mike Johnson",
    rating: 4,
    comment: "Great concept and execution. Some parts felt a bit slow but overall very engaging.",
    date: "2024-01-10"
  },
  {
    id: "3",
    bookId: "2",
    userId: "user3",
    userName: "Emily Rodriguez",
    rating: 5,
    comment: "Life-changing book! The small changes really do add up. Highly recommend.",
    date: "2024-01-08"
  }
];

export const userFavorites: UserFavorite[] = [
  {
    id: "fav1",
    userId: "user1",
    bookId: "1",
    dateAdded: "2024-01-15"
  },
  {
    id: "fav2",
    userId: "user1",
    bookId: "3",
    dateAdded: "2024-01-12"
  }
];

// Mock current user ID (in a real app, this would come from authentication)
export const CURRENT_USER_ID = "user1";

export function getAllBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | undefined {
  return books.find(book => book.id === id);
}

export function getReviewsByBookId(bookId: string): Review[] {
  return reviews.filter(review => review.bookId === bookId);
}

export function getReviewsByUserId(userId: string): Review[] {
  return reviews.filter(review => review.userId === userId);
}

export function getFavoritesByUserId(userId: string): UserFavorite[] {
  return userFavorites.filter(favorite => favorite.userId === userId);
}

export function getFavoriteBooksByUserId(userId: string): Book[] {
  const favorites = getFavoritesByUserId(userId);
  return favorites.map(favorite => getBookById(favorite.bookId)!).filter(Boolean);
}

export function isBookFavorited(bookId: string, userId: string): boolean {
  return userFavorites.some(favorite => 
    favorite.bookId === bookId && favorite.userId === userId
  );
}

export function addToFavorites(bookId: string, userId: string): void {
  if (!isBookFavorited(bookId, userId)) {
    const newFavorite: UserFavorite = {
      id: `fav${Date.now()}`,
      userId,
      bookId,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    userFavorites.push(newFavorite);
  }
}

export function removeFromFavorites(bookId: string, userId: string): void {
  const index = userFavorites.findIndex(favorite => 
    favorite.bookId === bookId && favorite.userId === userId
  );
  if (index > -1) {
    userFavorites.splice(index, 1);
  }
}

export function addReview(review: Omit<Review, 'id'>): void {
  const newReview: Review = {
    ...review,
    id: `review${Date.now()}`
  };
  reviews.push(newReview);
}