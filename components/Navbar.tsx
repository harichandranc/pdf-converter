"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [pdfMenuOpen, setPdfMenuOpen] =
    useState(false);

  const router = useRouter();

  const organizeTools = [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      icon: "📚",
    },
    {
      name: "Split PDF",
      href: "/split-pdf",
      icon: "✂️",
    },
    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
      icon: "🔄",
    },
    {
      name: "Delete PDF Pages",
      href: "/delete-pdf",
      icon: "🗑️",
    },
  ];

  const convertTools = [
    {
      name: "Image to PDF",
      href: "/image-to-pdf",
      icon: "🖼️",
    },
    {
      name: "PDF to JPG",
      href: "/pdf-to-jpg",
      icon: "📄",
    },
    {
      name: "Word to PDF",
      href: "/word-to-pdf",
      icon: "📝",
    },
    {
      name: "PDF to Word",
      href: "/pdf-to-word",
      icon: "📘",
    },
  ];

  const securityTools = [
    {
      name: "Protect PDF",
      href: "/protect-pdf",
      icon: "🔒",
    },
    {
      name: "Unlock PDF",
      href: "/unlock-pdf",
      icon: "🔓",
    },
  ];

  const optimizeTools = [
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      icon: "🗜️",
    },
  ];

  // SCROLL FUNCTION
  const goToToolsSection = () => {
    router.push("/");

    setTimeout(() => {
      const section =
        document.getElementById(
          "explore-tools"
        );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

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
          {/* HOME */}
          <Link
            href="/"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Home
          </Link>

          {/* PDF TOOLS DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-700 hover:text-cyan-500 font-medium transition">
              PDF Tools
              <span className="text-sm">
                ▼
              </span>
            </button>

            {/* DROPDOWN */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="w-[900px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* ORGANIZE */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                      📚 Organize PDF
                    </h3>

                    <div className="space-y-3">
                      {organizeTools.map(
                        (tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition"
                          >
                            <span className="text-2xl">
                              {tool.icon}
                            </span>

                            <span className="font-medium text-gray-700">
                              {tool.name}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>

                  {/* CONVERT */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                      🔄 Convert PDF
                    </h3>

                    <div className="space-y-3">
                      {convertTools.map(
                        (tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition"
                          >
                            <span className="text-2xl">
                              {tool.icon}
                            </span>

                            <span className="font-medium text-gray-700">
                              {tool.name}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>

                  {/* OPTIMIZE */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                      ⚡ Optimize PDF
                    </h3>

                    <div className="space-y-3">
                      {optimizeTools.map(
                        (tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition"
                          >
                            <span className="text-2xl">
                              {tool.icon}
                            </span>

                            <span className="font-medium text-gray-700">
                              {tool.name}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>

                  {/* SECURITY */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5">
                      🔒 Security
                    </h3>

                    <div className="space-y-3">
                      {securityTools.map(
                        (tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cyan-50 transition"
                          >
                            <span className="text-2xl">
                              {tool.icon}
                            </span>

                            <span className="font-medium text-gray-700">
                              {tool.name}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <Link
            href="/about"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            About
          </Link>

          {/* PRIVACY */}
          <Link
            href="/privacy-policy"
            className="text-gray-700 hover:text-cyan-500 font-medium transition"
          >
            Privacy
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* ALL TOOLS */}
          <button
            onClick={goToToolsSection}
            className="hidden md:flex bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold transition"
          >
            All Tools
          </button>

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
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* HOME */}
            <Link
              href="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="block py-4 text-lg font-semibold text-gray-800"
            >
              🏠 Home
            </Link>

            {/* MOBILE PDF TOOLS */}
            <button
              onClick={() =>
                setPdfMenuOpen(
                  !pdfMenuOpen
                )
              }
              className="w-full flex items-center justify-between py-4 text-lg font-semibold text-gray-800"
            >
              <span>
                🛠️ PDF Tools
              </span>

              <span>
                {pdfMenuOpen
                  ? "−"
                  : "+"}
              </span>
            </button>

            {/* SUB MENU */}
            {pdfMenuOpen && (
              <div className="pb-4 space-y-3 flex flex-col items-center text-center">
                {[
                  ...organizeTools,
                  ...convertTools,
                  ...optimizeTools,
                  ...securityTools,
                ].map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="flex items-center justify-center gap-3 py-3 text-gray-700 hover:text-cyan-500 transition w-full"
                  >
                    <span className="text-xl">
                      {tool.icon}
                    </span>

                    <span>
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* ABOUT */}
            <Link
              href="/about"
              onClick={() =>
                setMenuOpen(false)
              }
              className="block py-4 text-lg font-semibold text-gray-800"
            >
              ℹ️ About
            </Link>

            {/* PRIVACY */}
            <Link
              href="/privacy-policy"
              onClick={() =>
                setMenuOpen(false)
              }
              className="block py-4 text-lg font-semibold text-gray-800"
            >
              🔒 Privacy Policy
            </Link>

            {/* ALL TOOLS */}
            <button
              onClick={() => {
                setMenuOpen(false);
                goToToolsSection();
              }}
              className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-4 rounded-2xl font-bold transition"
            >
              View All Tools
            </button>
          </div>
        </div>
      )}
    </header>
  );
}