import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-pink-700">
          About Takusa Blog
        </h1>

        <p className="text-lg mb-4 leading-relaxed">
          <span className="font-semibold text-pink-700">Takusa Blog</span> is a
          modern and minimal blogging platform built to bring together creative
          minds, developers, and storytellers. Whether you're sharing thoughts,
          coding insights, or personal reflections, Takusa Blog gives you the
          space to express yourself freely.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          It’s both a community-driven space and a portfolio project that
          showcases technical depth and design clarity.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href={"https://github.com/raisulconnects"}
            target="_blank"
            className="px-5 py-2 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-700 transition-all shadow-md"
          >
            Github
          </Link>
          <Link
            href={"https://linkedin.com/in/raisul-tanna"}
            className="px-5 py-2 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-md"
            target="_blank"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}
