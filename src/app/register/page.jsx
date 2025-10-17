"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassoword] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (password === confirmPassword) {
      try {
        await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        setLoading(false);
        router.push("/login");
      } catch (e) {
        console.error(e.message);
        setErrorMessage(e.message);
      }
    } else {
      setLoading(false);
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-700">
          Create Account
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
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
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-2 font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              className="border-2 border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
              onChange={(e) => {
                setConfirmPassoword(e.target.value);
              }}
              value={confirmPassword}
              required
            />
          </div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 font-semibold text-gray-700"
          >
            {errorMessage}
          </label>
          <button
            type="submit"
            className="bg-pink-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-pink-700 transition-all disabled:opacity-50"
            disabled={loading}
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?
          <Link
            href={"/login"}
            className="text-pink-500 font-semibold hover:underline"
          >
            {" "}
            Login{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
