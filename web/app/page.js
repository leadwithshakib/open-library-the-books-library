"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
export default function Home() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  const handleGetBooks = useCallback(async () => {
    try {
      const data = await axios.get("http://localhost:3000/api/tokens");
      if (data.data.token) {
        const response = await axios.get(
          "http://localhost:7000/books?field=title,author,coverImage,genre",
          {
            headers: {
              Authorization: `Bearer ${data.data.token}`,
            },
          }
        );
        setBooks(response.data.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Unauthorized");
        const response = await axios.delete("http://localhost:3000/api/tokens");
        if (response.status === 200) {
          router.push("/auth/sign-in");
        }
      }
    } 
  }, []);

  useEffect(() => {
    handleGetBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <header className="mb-10 flex items-center justify-between relative">
        <div className="flex-1"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-full pointer-events-none">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 drop-shadow pointer-events-auto">
            Books Library
          </h1>
          <p className="text-lg text-gray-600 pointer-events-auto">
            Explore your collection of books
          </p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-auto mr-2 cursor-pointer"
          onClick={async () => {
            const response = await axios.delete(
              "http://localhost:3000/api/tokens"
            );
            if (response.status === 200) {
              router.push("/auth/sign-in");
            }
          }}
        >
          Logout
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md ml-auto cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile
        </button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-5 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl w-full max-w-xs cursor-pointer"
              onClick={() => {
                router.push(`/book/${book._id}`);
                console.log(book._id);
              }}
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-40 h-60 object-cover mb-4 rounded-lg shadow"
              />
              <h2 className="text-xl font-semibold mb-1 text-center text-purple-700">
                {book.title}
              </h2>
              <p className="text-gray-700 mb-1 text-center">by {book.author}</p>
              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mb-2">
                {book.genre}
              </span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-gray-500">
                  Reviews: {book.reviewStats?.reviewCount ?? 0}
                </span>
                <span className="text-sm text-yellow-500 flex items-center">
                  ★ {book.reviewStats?.averageRating ?? 0}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
}
