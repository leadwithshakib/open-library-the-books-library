import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaStar, FaUser } from "react-icons/fa";

export default function Home() {
  // Sample book data
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://picsum.photos/400/600?random=1",
      year: 1925,
      rating: 4.5,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://picsum.photos/400/600?random=2",
      year: 1949,
      rating: 4.8,
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://picsum.photos/400/600?random=3",
      year: 1937,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://picsum.photos/400/600?random=4",
      year: 1813,
      rating: 4.6,
    },
    {
      id: 5,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://picsum.photos/400/600?random=5",
      year: 1960,
      rating: 4.9,
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "https://picsum.photos/400/600?random=6",
      year: 1951,
      rating: 4.3,
    },
    {
      id: 7,
      title: "Lord of the Flies",
      author: "William Golding",
      cover: "https://picsum.photos/400/600?random=7",
      year: 1954,
      rating: 4.2,
    },
    {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://picsum.photos/400/600?random=8",
      year: 1988,
      rating: 4.4,
    },
    {
      id: 9,
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      cover: "https://picsum.photos/400/600?random=9",
      year: 1943,
      rating: 4.7,
    },
    {
      id: 10,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      cover: "https://picsum.photos/400/600?random=10",
      year: 2003,
      rating: 4.6,
    },
    {
      id: 11,
      title: "The Book Thief",
      author: "Markus Zusak",
      cover: "https://picsum.photos/400/600?random=11",
      year: 2005,
      rating: 4.8,
    },
    {
      id: 12,
      title: "The Giver",
      author: "Lois Lowry",
      cover: "https://picsum.photos/400/600?random=12",
      year: 1993,
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Open Library
            </h1>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <FaUser className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={book.cover}
                  alt={`${book.title} cover`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {book.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {book.author}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {book.rating}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {book.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
