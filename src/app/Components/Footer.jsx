"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-pink-100 py-6 px-6 mt-10 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-700">
        {/* Left Side - Brand and Text */}
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-pink-700">Takusa Blog</span> —
          Built by Raisul Tanna.
        </p>

        {/* Right Side - Social Links */}
        <div className="flex gap-3">
          <Link
            href={"https://github.com/raisulconnects"}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition-all shadow-md"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <Link
            href={"https://linkedin.com/in/raisul-tanna"}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-all shadow-md"
          >
            <Linkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
