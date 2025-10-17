"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(" --> From Login PageJSX, res => ", res);

      if (res.error) {
        throw new Error("Invalid Credentials!");
      } else {
        setLoading(false);
        router.push("/public-feed");
      }
    } catch (e) {
      console.error(e.message);
      setLoading(false);
      setMessage(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-700">
          Welcome Back
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            />
          </div>
          <label
            htmlFor="password"
            className="mb-2 font-semibold text-gray-700"
          >
            {message}
          </label>
          <button
            type="submit"
            className="bg-pink-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50"
            disabled={loading}
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href={"/register"}
            className="text-pink-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
