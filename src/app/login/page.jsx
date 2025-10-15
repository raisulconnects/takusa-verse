import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-400">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700">
          Welcome Back
        </h2>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="border-2 border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
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
              className="border-2 border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 transform transition-all"
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
            {" "}
            Register{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
