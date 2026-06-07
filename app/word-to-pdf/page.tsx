"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BannerAd from "@/components/BannerAd";

export default function WordToPDFPage() {

  const [file, setFile] =
    useState<File | null>(null);

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

    document.body.appendChild(
      script
    );

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
  const handleFile =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const selectedFile =
        e.target.files?.[0];

      if (!selectedFile)
        return;

      setFile(
        selectedFile
      );

      // AUTO SCROLL
      setTimeout(() => {

        reviewRef.current?.scrollIntoView(
          {
            behavior:
              "smooth",
            block:
              "center",
          }
        );

      }, 500);
    };

  // CONVERT WORD TO PDF
  const convertToPDF =
    async () => {

      if (!file) {

        alert(
          "Select Word file"
        );

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        // VPS API
        const response =
          await fetch(
            "https://api.pdfconverter.chtechgiant.com/convert/word-to-pdf",
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
              "Conversion failed"
          );
        }

        // DOWNLOAD PDF
        const link =
          document.createElement(
            "a"
          );

        link.href =
          data.url;

        link.setAttribute(
          "download",
          "converted.pdf"
        );

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Word to PDF conversion failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <main className="bg-[#f7f7fb] min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-6 py-3 rounded-full font-semibold mb-8">
              📝 Smart Word Converter
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Convert Word
              <br />
              to PDF
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Convert DOC and DOCX files into
              professional PDF documents
              instantly with original layout
              preserved.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">

            {/* FILE PICKER */}
            <label
              htmlFor="word-upload"
              className="border-2 border-dashed border-cyan-300 hover:border-cyan-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >

              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Word File
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select DOC or DOCX file to
                convert into PDF
              </p>

              <div className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose File
              </div>

              <input
                id="word-upload"
                type="file"
                accept=".doc,.docx"
                onChange={
                  handleFile
                }
                className="hidden"
              />
            </label>

            {/* BANNER AD */}
            <div className="mt-10">
              <BannerAd />
            </div>

            {/* FILE INFO */}
            {file && (
              <div
                ref={reviewRef}
                className="mt-10"
              >

                {/* CARD */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                      {/* ICON */}
                      <div className="w-24 h-24 rounded-3xl bg-blue-100 flex items-center justify-center text-5xl flex-shrink-0">
                        📝
                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="text-3xl font-bold text-gray-900 break-all mb-3">
                          {
                            file.name
                          }
                        </h3>

                        <p className="text-gray-600 text-lg">
                          {(
                            file.size /
                            1024 /
                            1024
                          ).toFixed(
                            2
                          )}{" "}
                          MB
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>

                  {/* INFO BOX */}
                  <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-2xl p-5">

                    <p className="text-cyan-800 font-medium leading-relaxed">
                      💡 Original formatting,
                      tables, images and layout
                      will be preserved during
                      conversion.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={
                    convertToPDF
                  }
                  disabled={
                    loading
                  }
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Converting..."
                    : "Convert to PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}