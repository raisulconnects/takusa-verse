import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-gray-800 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight text-pink-700">
        Takusa Blog
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-10 text-center">
        Share stories, learn together, and grow with the community.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition-all"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-white border border-pink-400 text-pink-600 rounded-2xl shadow-md hover:bg-pink-100 transition-all"
        >
          Sign Up
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 bg-pink-200 text-gray-700 rounded-2xl shadow-md hover:bg-pink-300 transition-all"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
