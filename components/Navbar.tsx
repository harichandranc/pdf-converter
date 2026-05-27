"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
    },
    {
      name: "Split PDF",
      href: "/split-pdf",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
    },
    {
      name: "Image to PDF",
      href: "/image-to-pdf",
    },
    {
      name: "PDF to JPG",
      href: "/pdf-to-jpg",
    },
    {
      name: "Word to PDF",
      href: "/word-to-pdf",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center"
        >
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-none">
              PDF Converter
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Online PDF Tools
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-cyan-500 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* ALL TOOLS */}
          <a
            href="/#explore-tools"
            className="hidden md:flex bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold transition"
          >
            All Tools
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="lg:hidden w-12 h-12 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
          >
            {menuOpen ? (
              <span className="text-2xl">
                ✕
              </span>
            ) : (
              <span className="text-2xl">
                ☰
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() =>
                  setMenuOpen(false)
                }
                className="text-gray-700 hover:text-cyan-500 text-lg font-medium transition"
              >
                {link.name}
              </Link>
            ))}

            {/* MOBILE ALL TOOLS */}
            <a
              href="/#explore-tools"
              onClick={() =>
                setMenuOpen(false)
              }
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-4 rounded-xl font-bold text-center transition"
            >
              View All Tools
            </a>
          </div>
        </div>
      )}
    </header>
  );
}