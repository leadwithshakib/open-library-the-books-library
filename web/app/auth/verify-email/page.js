"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/auth/verify-email",
        {
          verificationCode: verificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the 6-digit verification code sent to your email
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setVerificationCode(value);
              }}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          <div>
            <button
              onClick={handleVerification}
              disabled={verificationCode.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
