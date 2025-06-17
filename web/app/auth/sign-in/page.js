"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/auth/sign-in", {
        email,
        password,
      });
      const response2 = await axios.post("http://localhost:3000/api/tokens", {
        access_token: response.data.accessToken,
      });
      if (response2.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-tight">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {/* Email SVG */}
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6"
                />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg transition"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {/* Password SVG */}
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m6-6V7a6 6 0 10-12 0v4m12 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12z"
                />
              </svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg transition"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold text-lg shadow-md hover:from-blue-700 hover:to-purple-600 transition"
          >
            {/* Lock SVG */}
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m6-6V7a6 6 0 10-12 0v4m12 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12z"
              />
            </svg>
            Sign In
          </button>
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold text-lg shadow hover:bg-gray-50 transition"
          onClick={() =>
            (window.location.href = "http://localhost:7000/auth/google")
          }
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <button
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-800 bg-gray-900 text-white font-semibold text-lg shadow hover:bg-gray-800 transition"
          onClick={() =>
            (window.location.href = "http://localhost:7000/auth/github")
          }
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            className="w-5 h-5 bg-white rounded-full"
          />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
