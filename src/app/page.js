import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-gray-800 px-4 py-10">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3 tracking-tight text-pink-700 text-center">
        Takusa Blog
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 text-center max-w-xl">
        Share stories, learn together, and grow with the community.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center">
        <Link
          href="/login"
          className="w-full sm:w-auto px-6 py-3 bg-pink-600 text-white rounded-2xl shadow-md hover:bg-pink-700 transition-all text-center"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="w-full sm:w-auto px-6 py-3 bg-white border border-pink-400 text-pink-600 rounded-2xl shadow-md hover:bg-pink-100 transition-all text-center"
        >
          Sign Up
        </Link>
        <Link
          href="/about"
          className="w-full sm:w-auto px-6 py-3 bg-pink-200 text-gray-700 rounded-2xl shadow-md hover:bg-pink-300 transition-all text-center"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
