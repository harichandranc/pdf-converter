"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPDFPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [totalPages, setTotalPages] =
    useState(0);

  const [selectedPages, setSelectedPages] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // HANDLE FILE
  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const bytes =
      await selectedFile.arrayBuffer();

    const pdf =
      await PDFDocument.load(bytes);

    setTotalPages(pdf.getPageCount());
  };

  // SPLIT PDF
  const splitPDF = async () => {
    if (!file) {
      alert("Select PDF file");
      return;
    }

    if (!selectedPages.trim()) {
      alert(
        "Enter pages to extract"
      );
      return;
    }

    try {
      setLoading(true);

      const bytes =
        await file.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      const pageNumbers =
        selectedPages
          .split(",")
          .map((p) => parseInt(p.trim()) - 1)
          .filter(
            (p) =>
              p >= 0 &&
              p < pdf.getPageCount()
          );

      if (pageNumbers.length === 0) {
        alert("Invalid page numbers");
        return;
      }

      const newPdf =
        await PDFDocument.create();

      const pages =
        await newPdf.copyPages(
          pdf,
          pageNumbers
        );

      pages.forEach((page) => {
        newPdf.addPage(page);
      });

      const pdfBytes =
        await newPdf.save();

      const blob = new Blob(
        [new Uint8Array(pdfBytes)],
        {
          type: "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download = "split.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to split PDF");
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
              ✂️ Smart PDF Splitter
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Split PDF
              <br />
              into Separate Pages
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Extract selected pages from your
              PDF file instantly with fast and
              secure processing.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">
            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-cyan-300 hover:border-cyan-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF File
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select your PDF file to split
                pages
              </p>

              <div className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
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

            {/* FILE INFO */}
            {file && (
              <div className="mt-10">
                {/* FILE CARD */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3 break-all">
                        {file.name}
                      </h3>

                      <p className="text-gray-600 text-lg">
                        Total Pages:
                        <span className="font-bold text-cyan-700 ml-2">
                          {totalPages}
                        </span>
                      </p>
                    </div>

                    <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      PDF Ready
                    </div>
                  </div>
                </div>

                {/* PAGE INPUT */}
                <div className="mt-10">
                  <label className="block text-2xl font-bold text-gray-900 mb-4">
                    Enter Pages to Extract
                  </label>

                  <input
                    type="text"
                    placeholder="Example: 1,3,5"
                    value={selectedPages}
                    onChange={(e) =>
                      setSelectedPages(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition bg-white"
                  />

                  <div className="mt-4 bg-cyan-50 border border-cyan-100 rounded-2xl p-5">
                    <p className="text-cyan-800 font-medium leading-relaxed">
                      💡 Enter page numbers
                      separated by commas.
                      Example: 1,3,5
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={splitPDF}
                  disabled={loading}
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Splitting PDF..."
                    : "Split PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}