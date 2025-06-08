'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { isBookFavorited, addToFavorites, removeFromFavorites, CURRENT_USER_ID } from '@/lib/data';

interface FavoriteButtonProps {
  bookId: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function FavoriteButton({ bookId, size = 'md', showText = false }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(isBookFavorited(bookId, CURRENT_USER_ID));
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (isFavorited) {
      removeFromFavorites(bookId, CURRENT_USER_ID);
      setIsFavorited(false);
    } else {
      addToFavorites(bookId, CURRENT_USER_ID);
      setIsFavorited(true);
    }
    
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]}
        ${isFavorited 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
        }
        transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
        ${showText ? 'flex items-center gap-2' : ''}
      `}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`${sizeClasses[size]} transition-all duration-200 ${
          isFavorited ? 'fill-current' : ''
        }`}
      />
      {showText && (
        <span className="text-sm font-medium">
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}