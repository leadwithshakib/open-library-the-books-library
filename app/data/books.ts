import { Book } from "../types/book";

export type BookCategory =
  | "Classics"
  | "Fantasy"
  | "Contemporary"
  | "Philosophical"
  | "Thriller"
  | "Historical";

export const books: (Book & { category: BookCategory })[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    rating: 4.5,
    isFavorite: true,
    category: "Classics",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    description:
      "The story of racial injustice and the loss of innocence in the American South.",
    rating: 4.8,
    isFavorite: true,
    category: "Classics",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
    rating: 4.6,
    isFavorite: true,
    category: "Classics",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    description: "A romantic novel of manners.",
    rating: 4.7,
    isFavorite: true,
    category: "Classics",
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    description:
      "A fantasy novel and children's book by English author J. R. R. Tolkien.",
    rating: 4.7,
    isFavorite: true,
    category: "Fantasy",
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    description:
      "A classic coming-of-age story about teenage alienation and loss of innocence.",
    rating: 4.3,
    isFavorite: true,
    category: "Classics",
  },
  {
    id: "7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    description:
      "A philosophical novel about a young shepherd's journey to find his personal legend.",
    rating: 4.5,
    isFavorite: true,
    category: "Philosophical",
  },
  {
    id: "8",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    description:
      "A poetic tale about a young prince who visits various planets in space.",
    rating: 4.8,
    isFavorite: true,
    category: "Philosophical",
  },
  {
    id: "9",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    description:
      "A story of friendship, betrayal, and redemption set in Afghanistan.",
    rating: 4.6,
    isFavorite: false,
    category: "Contemporary",
  },
  {
    id: "10",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    description:
      "A mystery thriller novel that follows symbologist Robert Langdon.",
    rating: 4.2,
    isFavorite: false,
    category: "Thriller",
  },
  {
    id: "11",
    title: "The Book Thief",
    author: "Markus Zusak",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    description: "A historical novel set in Nazi Germany, narrated by Death.",
    rating: 4.7,
    isFavorite: false,
    category: "Historical",
  },
  {
    id: "12",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
    description:
      "A novel about infinite possibilities and the power of choice.",
    rating: 4.4,
    isFavorite: false,
    category: "Contemporary",
  },
];
