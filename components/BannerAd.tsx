"use client";

import { useEffect } from "react";

export default function BannerAd() {
  useEffect(() => {
    const container =
      document.getElementById(
        "container-82aa08359e3c52e80c2b278ef851b22c"
      );

    // PREVENT DUPLICATE ADS
    if (
      container &&
      container.childNodes.length === 0
    ) {
      const script =
        document.createElement("script");

      script.src =
        "https://recollectsideway.com/82aa08359e3c52e80c2b278ef851b22c/invoke.js";

      script.async = true;

      script.setAttribute(
        "data-cfasync",
        "false"
      );

      container.appendChild(script);
    }
  }, []);

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 overflow-hidden">
          <div
            id="container-82aa08359e3c52e80c2b278ef851b22c"
            className="w-full flex justify-center"
          />
        </div>
      </div>
    </section>
  );
}