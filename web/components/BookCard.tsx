'use client';

import { Book } from '@/lib/data';
import { Star } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white rounded-full shadow-md">
              <FavoriteButton bookId={book.id} size="sm" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                {book.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({book.totalRatings} reviews)
            </span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {book.genre}
          </p>
        </div>
      </div>
    </Link>
  );
}