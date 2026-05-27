"use client";

import { useMemo, useState } from "react";
import ToolCard from "./ToolCard";

export default function CategoryTabs() {
  const [activeTab, setActiveTab] =
    useState("All");

  const tabs = [
    {
      name: "All",
      icon: "✨",
    },
    {
      name: "Organize PDF",
      icon: "📚",
    },
    {
      name: "Convert PDF",
      icon: "🔄",
    },
    {
      name: "Optimize PDF",
      icon: "⚡",
    },
    {
      name: "Security",
      icon: "🔒",
    },
  ];

  const tools = [
    {
      title: "Merge PDF",
      description:
        "Combine multiple PDF files into one document quickly and securely.",
      icon: "📚",
      href: "/merge-pdf",
      category: "Organize PDF",
    },
    {
      title: "Split PDF",
      description:
        "Extract pages from PDFs and create separate files instantly.",
      icon: "✂️",
      href: "/split-pdf",
      category: "Organize PDF",
    },
    {
      title: "Rotate PDF",
      description:
        "Rotate PDF pages permanently and save the updated file.",
      icon: "🔄",
      href: "/rotate-pdf",
      category: "Organize PDF",
    },
    {
      title: "Delete PDF Pages",
      description:
        "Remove unwanted pages from your PDF documents.",
      icon: "🗑️",
      href: "/delete-pdf",
      category: "Organize PDF",
    },
    {
      title: "Image to PDF",
      description:
        "Convert JPG and PNG images into PDF files easily.",
      icon: "🖼️",
      href: "/image-to-pdf",
      category: "Convert PDF",
    },
    {
      title: "PDF to JPG",
      description:
        "Convert PDF pages into high-quality JPG images.",
      icon: "📄",
      href: "/pdf-to-jpg",
      category: "Convert PDF",
    },
    {
      title: "Word to PDF",
      description:
        "Convert DOC and DOCX files into PDF documents.",
      icon: "📝",
      href: "/word-to-pdf",
      category: "Convert PDF",
    },
    {
      title: "PDF to Word",
      description:
        "Convert PDF files into editable Word documents.",
      icon: "📘",
      href: "/pdf-to-word",
      category: "Convert PDF",
    },
    {
      title: "Compress PDF",
      description:
        "Reduce PDF size while maintaining quality.",
      icon: "🗜️",
      href: "/compress-pdf",
      category: "Optimize PDF",
    },
    {
      title: "Protect PDF",
      description:
        "Add password protection to your PDF files securely.",
      icon: "🔒",
      href: "/protect-pdf",
      category: "Security",
    },
    {
      title: "Unlock PDF",
      description:
        "Remove password protection from PDF files instantly.",
      icon: "🔓",
      href: "/unlock-pdf",
      category: "Security",
    },
  ];

  // FILTER TOOLS
  const filteredTools = useMemo(() => {
    if (activeTab === "All") {
      return tools;
    }

    return tools.filter(
      (tool) =>
        tool.category === activeTab
    );
  }, [activeTab]);

  return (
    <section className="py-10">
      {/* HEADING */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-6 py-3 rounded-full font-semibold mb-6">
          🚀 PDF Categories
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Explore PDF Tools
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Choose from powerful PDF tools to
          organize, convert, optimize and
          secure your PDF documents online.
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() =>
                setActiveTab(tab.name)
              }
              className={`group relative overflow-hidden px-7 py-4 rounded-2xl border font-semibold text-lg transition-all duration-300 ${
                isActive
                  ? "bg-black text-white border-black shadow-xl scale-105"
                  : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-lg"
              }`}
            >
              {/* GLOW */}
              {!isActive && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-50 transition duration-300"></div>
              )}

              {/* CONTENT */}
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">
                  {tab.icon}
                </span>

                <span>{tab.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* TOOL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            href={tool.href}
          />
        ))}
      </div>
    </section>
  );
}