import { getBookById, getReviewsByBookId, getAllBooks } from '@/lib/data';
import Header from '@/components/Header';
import StarRating from '@/components/StarRating';
import ReviewForm from '@/components/ReviewForm';
import ReviewsList from '@/components/ReviewsList';
import FavoriteButton from '@/components/FavoriteButton';
import { notFound } from 'next/navigation';
import { Calendar, FileText, Hash } from 'lucide-react';

interface BookPageProps {
  params: {
    bookId: string;
  };
}

export async function generateStaticParams() {
  const books = getAllBooks();
  
  return books.map((book) => ({
    bookId: book.id,
  }));
}

export default function BookPage({ params }: BookPageProps) {
  const book = getBookById(params.bookId);
  const reviews = getReviewsByBookId(params.bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="aspect-[3/4] mb-6 relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-white rounded-full shadow-md">
                    <FavoriteButton bookId={book.id} size="lg" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={book.rating} />
                  <span className="text-sm text-gray-600">
                    ({book.totalRatings} reviews)
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published {book.publishedYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>{book.isbn}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {book.genre}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <FavoriteButton bookId={book.id} size="md" showText={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
              
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this book
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write a Review
              </h3>
              <ReviewForm bookId={book.id} />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reviews ({reviews.length})
              </h3>
              <ReviewsList reviews={reviews} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}