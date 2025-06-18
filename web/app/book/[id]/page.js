"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const handleGetBook = useCallback(async () => {
    try {
      const token = await axios.get("http://localhost:3000/api/tokens");
      if (token.data.token) {
      const response = await axios.get(`http://localhost:7000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token.data.token}`,
          },
        });
        setBook(response.data.data);
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
    handleGetBook();
  }, []);

  if (!book)
    return (
      <div className="flex justify-center items-center h-[80vh] text-2xl text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex gap-10 flex-wrap">
        <div className="flex flex-col items-center flex-shrink-0 w-[220px]">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-52 h-80 object-cover rounded-xl shadow-md"
          />
          <a
            href={book.buyHardCopyFrom}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors duration-200 inline-block"
          >
            Buy on Amazon
          </a>
        </div>
        <div className="flex-1 min-w-[260px]">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4 font-medium">
            by {book.author}
          </p>
          <div className="flex gap-6 flex-wrap mb-4">
            <span className="bg-blue-100 text-blue-700 rounded px-3 py-1 font-medium">
              {book.genre}
            </span>
            <span className="text-gray-400">
              Published: {new Date(book.publishedDate).toLocaleDateString()}
            </span>
            <span className="text-gray-400">ISBN: {book.ISBN}</span>
          </div>
          <p className="text-base text-gray-800 mb-3">
            <strong>Summary:</strong> {book.summary}
          </p>
          <p className="text-base text-gray-700 mb-3">
            <strong>Description:</strong> {book.description}
          </p>
          <p className="text-xl text-blue-600 font-bold mb-0">${book.price}</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Reviews ({book.reviewStats?.reviewCount || 0})
        </h2>
        <p className="text-gray-600 mb-6">
          Average Rating:{" "}
          <span className="text-orange-400 font-semibold">
            {book.reviewStats?.averageRating || "N/A"}
          </span>
        </p>
        {book.reviews && book.reviews.length > 0 ? (
          <div className="flex flex-col gap-5">
            {book.reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 rounded-lg p-5 bg-gray-50 flex gap-5 items-start shadow-sm"
              >
                <img
                  src={review.userId.avatar}
                  alt={review.userId.email}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="flex-1">
                  <p className="font-semibold text-blue-700 mb-0.5">
                    {review.userId.email}
                  </p>
                  <p className="text-orange-400 font-medium mb-1">
                    Rating: {review.rating}
                  </p>
                  <p className="text-gray-800 mb-1">{review.comment}</p>
                  <p className="text-gray-400 text-xs">
                    <small>{new Date(review.createdAt).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
