"use client";

import { useState } from "react";

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

  return (
    <div className="mb-16">
      {/* HEADING */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Explore PDF Tools
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from powerful PDF tools to
          organize, convert and optimize your
          documents online.
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4">
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
                  ? "bg-black text-white border-black shadow-xl"
                  : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-lg"
              }`}
            >
              {/* GLOW EFFECT */}
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
    </div>
  );
}