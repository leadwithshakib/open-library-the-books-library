'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { User, Mail, Calendar, BookOpen, Star, Edit2, Heart } from 'lucide-react';
import { getReviewsByUserId, books, getFavoriteBooksByUserId, CURRENT_USER_ID } from '@/lib/data';
import StarRating from '@/components/StarRating';
import FavoriteButton from '@/components/FavoriteButton';
import Link from 'next/link';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('Avid reader with a passion for fiction and non-fiction alike. Always looking for my next great read!');
  const [activeTab, setActiveTab] = useState<'reviews' | 'favorites'>('reviews');

  // Mock user reviews and favorites (in a real app, this would be based on the logged-in user)
  const userReviews = getReviewsByUserId(CURRENT_USER_ID);
  const favoriteBooks = getFavoriteBooksByUserId(CURRENT_USER_ID);
  
  const reviewedBooks = userReviews.map(review => ({
    review,
    book: books.find(book => book.id === review.bookId)!
  }));

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-center"
                  />
                ) : (
                  <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined January 2024</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{userReviews.length} books reviewed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Heart className="w-4 h-4" />
                  <span>{favoriteBooks.length} favorite books</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">About</h3>
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full text-sm text-gray-600 bg-transparent border border-gray-300 rounded-md p-2 focus:border-blue-500 outline-none resize-none"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{bio}</p>
                )}
              </div>

              <button
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'reviews'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Reviews ({userReviews.length})
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'favorites'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Favorites ({favoriteBooks.length})
                </button>
              </div>

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
                  
                  {reviewedBooks.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                      <p className="text-gray-600 mb-4">Start exploring books and share your thoughts!</p>
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Browse Books
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviewedBooks.map(({ review, book }) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex gap-4">
                            <Link href={`/book/${book.id}`} className="flex-shrink-0">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                            </Link>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link
                                    href={`/book/${book.id}`}
                                    className="font-medium text-gray-900 hover:text-blue-600"
                                  >
                                    {book.title}
                                  </Link>
                                  <p className="text-sm text-gray-600">by {book.author}</p>
                                </div>
                                <div className="text-right">
                                  <StarRating rating={review.rating} size="sm" />
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(review.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Books</h2>
                  
                  {favoriteBooks.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                      <p className="text-gray-600 mb-4">Start adding books to your favorites!</p>
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Browse Books
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {favoriteBooks.map((book) => (
                        <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex gap-3">
                            <Link href={`/book/${book.id}`} className="flex-shrink-0">
                              <img
                                src={book.cover}
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={`/book/${book.id}`}
                                    className="font-medium text-gray-900 hover:text-blue-600 block truncate"
                                  >
                                    {book.title}
                                  </Link>
                                  <p className="text-sm text-gray-600 truncate">by {book.author}</p>
                                </div>
                                <FavoriteButton bookId={book.id} size="sm" />
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{book.rating}</span>
                              </div>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {book.genre}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}