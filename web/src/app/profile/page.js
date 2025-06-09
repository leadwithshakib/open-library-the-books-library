import Image from "next/image";
import Link from "next/link";
import {
  FaBook,
  FaCalendarAlt,
  FaCog,
  FaEdit,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Profile() {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    joinDate: "January 2024",
    avatar: "https://i.pravatar.cc/300",
    bio: "Book enthusiast and avid reader. Love exploring different genres and sharing thoughts about books.",
    stats: {
      booksRead: 42,
      reviews: 28,
      favorites: 15,
    },
  };

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      rating: 4.5,
      date: "2024-02-15",
      comment:
        "A masterpiece of American literature. The prose is beautiful and the story is timeless.",
    },
    {
      id: 2,
      bookTitle: "1984",
      rating: 5,
      date: "2024-02-10",
      comment:
        "Disturbing yet brilliant. Orwell's vision of the future is more relevant than ever.",
    },
    {
      id: 3,
      bookTitle: "The Hobbit",
      rating: 4,
      date: "2024-02-05",
      comment:
        "A wonderful adventure story that takes you to Middle-earth. Perfect for fantasy lovers.",
    },
  ];

  // Dummy favorite books
  const favoriteBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://picsum.photos/400/600?random=1",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://picsum.photos/400/600?random=2",
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://picsum.photos/400/600?random=3",
    },
  ];

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
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaCog className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={user.avatar}
                alt="Profile picture"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name}
              </h2>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <MdEmail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdLocationOn className="w-5 h-5" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="w-5 h-5" />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {user.bio}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaBook className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.stats.booksRead}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Books Read</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaStar className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.stats.reviews}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Reviews</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaHeart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.stats.favorites}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            My Reviews
          </h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.bookTitle}
                  </h4>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {review.comment}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4" />
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Books Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Favorite Books
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteBooks.map((book) => (
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
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {book.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {book.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
