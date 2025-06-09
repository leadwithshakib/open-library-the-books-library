import Image from "next/image";
import Link from "next/link";

export default function BookDetails({ params }) {
  // Dummy book data - in a real app, this would come from an API
  const book = {
    id: params.id,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://picsum.photos/400/600",
    year: 1925,
    genre: "Fiction",
    pages: 180,
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: {
          name: "John Doe",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        rating: 5,
        comment:
          "A masterpiece of American literature. The prose is beautiful and the story is timeless.",
        date: "2024-02-15",
      },
      {
        id: 2,
        user: {
          name: "Jane Smith",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        rating: 4,
        comment:
          "A classic that everyone should read. The themes are still relevant today.",
        date: "2024-02-10",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Open Library
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Image
                src="https://i.pravatar.cc/150?img=1"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>My Profile</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:flex-shrink-0">
              <div className="relative h-64 md:h-full md:w-64">
                <Image
                  src={book.cover}
                  alt={`${book.title} cover`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold">
                {book.genre}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {book.title}
              </h1>
              <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">
                by {book.author}
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {book.rating}
                  </span>
                </div>
                <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {book.pages} pages
                </span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Published {book.year}
                </span>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {book.description}
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Reviews
            </h2>
            <div className="space-y-6">
              {book.reviews.map((review) => (
                <div key={review.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {review.user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
