"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BannerAd from "@/components/BannerAd";

type PDFPreview = {
  id: string;
  file: File;
  thumbnail: string;
  pages: number;
};

export default function MergePDFPage() {
  const [pdfFiles, setPdfFiles] =
    useState<PDFPreview[]>([]);

  const [loading, setLoading] =
    useState(false);

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

  // HANDLE MULTIPLE FILES
  const handleFiles = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFiles =
      e.target.files;

    if (
      !selectedFiles ||
      selectedFiles.length === 0
    )
      return;

    try {

      setLoading(true);

      const uploadedFiles =
        Array.from(selectedFiles);

      const previews:
        PDFPreview[] = [];

      for (const file of uploadedFiles) {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        // VPS THUMBNAIL API
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
          continue;
        }

        previews.push({
          id:
            Date.now() +
            Math.random().toString(),
          file,
          thumbnail:
            data.pages?.[0]?.image ||
            "",
          pages:
            data.pages?.length || 0,
        });
      }

      setPdfFiles(previews);

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
        "Failed to load PDF files"
      );

    } finally {

      setLoading(false);
    }
  };

  // REMOVE PDF
  const removePDF = (
    id: string
  ) => {

    const updated =
      pdfFiles.filter(
        (item) =>
          item.id !== id
      );

    setPdfFiles(updated);
  };

  // MERGE PDF
  const mergePDFs =
    async () => {

      if (
        pdfFiles.length < 2
      ) {

        alert(
          "Upload at least 2 PDF files"
        );

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        pdfFiles.forEach(
          (item) => {
            formData.append(
              "files",
              item.file
            );
          }
        );

        const response =
          await fetch(
            "http://147.93.110.58:3000/pdf/merge",
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
              "Merge failed"
          );
        }

        // DOWNLOAD
        const link =
          document.createElement("a");

        link.href =
          data.url;

        link.setAttribute(
          "download",
          "merged.pdf"
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
          "Merge PDF failed"
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold mb-8">
              🔗 Smart PDF Tool
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Merge PDF
              <br />
              Files
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combine multiple PDF files
              into one professional PDF
              instantly.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">

            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >

              <div className="text-7xl mb-6">
                📚
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF Files
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select multiple PDF files
                to merge
              </p>

              <div className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose PDFs
              </div>

              <input
                id="pdf-upload"
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFiles}
                className="hidden"
              />
            </label>

            {/* BANNER AD */}
            <div className="mt-10">
              <BannerAd />
            </div>

            {/* REVIEW */}
            {pdfFiles.length >
              0 && (
              <div
                ref={reviewRef}
                className="mt-10"
              >

                {/* FILE COUNT */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        Ready To Merge
                      </h3>

                      <p className="text-gray-600 text-lg">
                        {
                          pdfFiles.length
                        }{" "}
                        PDF Files Selected
                      </p>
                    </div>

                    <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>
                </div>

                {/* PDF GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {pdfFiles.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={item.id}
                        className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg"
                      >

                        {/* DELETE BTN */}
                        <button
                          onClick={() =>
                            removePDF(
                              item.id
                            )
                          }
                          className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full font-bold shadow-lg"
                        >
                          ✕
                        </button>

                        {/* THUMB */}
                        <img
                          src={
                            item.thumbnail
                          }
                          alt="PDF"
                          className="w-full h-72 object-cover"
                        />

                        {/* INFO */}
                        <div className="p-5">

                          <h3 className="font-bold text-lg text-gray-900 break-all mb-2">
                            {
                              item.file
                                .name
                            }
                          </h3>

                          <p className="text-gray-600">
                            {
                              item.pages
                            }{" "}
                            Pages
                          </p>

                          <div className="mt-3 inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold text-sm">
                            PDF #
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* MERGE BTN */}
                <button
                  onClick={
                    mergePDFs
                  }
                  disabled={
                    loading
                  }
                  className="w-full mt-12 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Processing..."
                    : "Merge PDFs"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}