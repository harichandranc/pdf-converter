"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BannerAd from "@/components/BannerAd";

type PagePreview = {
  originalPage: number;
  image: string;
};

export default function DeletePDFPagesPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [pagePreviews, setPagePreviews] =
    useState<PagePreview[]>([]);

  const reviewRef =
    useRef<HTMLDivElement | null>(
      null
    );

  // SOCIAL BAR AD
  useEffect(() => {
    const existingScript =
      document.getElementById(
        "adsterra-social-bar"
      );

    if (existingScript) {
      existingScript.remove();
    }

    const script =
      document.createElement("script");

    script.id =
      "adsterra-social-bar";

    script.src =
      "//pl26710309.profitableratecpm.com/82aa08359e3c52e80c2b278ef851b22c/invoke.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      const oldScript =
        document.getElementById(
          "adsterra-social-bar"
        );

      if (oldScript) {
        oldScript.remove();
      }
    };
  }, []);

  // HANDLE FILE
  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    try {

      setLoading(true);

      setFile(selectedFile);

      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      // VPS THUMBNAILS API
      const response =
        await fetch(
          "http://147.93.110.58:3000/pdf/thumbnails",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!data.success) {

        throw new Error(
          data.error ||
            "Thumbnail generation failed"
        );
      }

      setPagePreviews(
        data.pages.map(
          (page: any) => ({
            originalPage:
              page.originalPage,
            image:
              page.image,
          })
        )
      );

      // AUTO SCROLL
      setTimeout(() => {
        reviewRef.current?.scrollIntoView(
          {
            behavior: "smooth",
            block: "center",
          }
        );
      }, 500);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load PDF pages"
      );

    } finally {

      setLoading(false);
    }
  };

  // REMOVE PAGE
  const removePage = (
    originalPage: number
  ) => {

    const updatedPages =
      pagePreviews.filter(
        (page) =>
          page.originalPage !==
          originalPage
      );

    setPagePreviews(
      updatedPages
    );
  };

  // DOWNLOAD UPDATED PDF
  const downloadUpdatedPDF =
    async () => {

      if (!file) {

        alert("Select PDF file");

        return;
      }

      try {

        setLoading(true);

        // KEEP ORIGINAL PAGE INDEXES
        const keepPages =
          pagePreviews.map(
            (page) =>
              page.originalPage - 1
          );

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "keepPages",
          JSON.stringify(
            keepPages
          )
        );

        const response =
          await fetch(
            "http://147.93.110.58:3000/pdf/delete-pages",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (!data.success) {

          throw new Error(
            data.error ||
              "Delete failed"
          );
        }

        // DOWNLOAD
        const link =
          document.createElement("a");

        link.href =
          data.url;

        link.setAttribute(
          "download",
          "updated.pdf"
        );

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

      } catch (error) {

        console.error(error);

        alert(
          "Delete PDF pages failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="bg-[#f7f7fb] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">

        {/* BG */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-full font-semibold mb-8">
              🗑️ Smart PDF Tool
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Delete PDF
              <br />
              Pages
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Remove unwanted pages visually
              and instantly download updated
              PDF file.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">

            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-red-300 hover:border-red-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >

              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF File
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select PDF file to remove pages
              </p>

              <div className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose PDF
              </div>

              <input
                id="pdf-upload"
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {/* BANNER AD */}
            <div className="mt-10">
              <BannerAd />
            </div>

            {/* REVIEW */}
            {pagePreviews.length >
              0 && (
              <div
                ref={reviewRef}
                className="mt-10"
              >

                {/* FILE CARD */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 break-all mb-3">
                        {file?.name}
                      </h3>

                      <p className="text-gray-600 text-lg">
                        {
                          pagePreviews.length
                        }{" "}
                        Pages Remaining
                      </p>
                    </div>

                    <div className="bg-red-100 text-red-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>
                </div>

                {/* PAGE GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                  {pagePreviews.map(
                    (
                      page,
                      index
                    ) => (
                      <div
                        key={
                          page.originalPage
                        }
                        className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg"
                      >

                        {/* DELETE BTN */}
                        <button
                          onClick={() =>
                            removePage(
                              page.originalPage
                            )
                          }
                          className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full font-bold shadow-lg"
                        >
                          ✕
                        </button>

                        {/* THUMBNAIL */}
                        <img
                          src={
                            page.image
                          }
                          alt={`Page ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />

                        {/* PAGE NUMBER */}
                        <div className="p-4 border-t border-gray-100 text-center">

                          <p className="font-bold text-gray-900">
                            Page{" "}
                            {
                              index + 1
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* DOWNLOAD BTN */}
                <button
                  onClick={
                    downloadUpdatedPDF
                  }
                  disabled={
                    loading
                  }
                  className="w-full mt-12 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Processing..."
                    : "Download Updated PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}