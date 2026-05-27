"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files.");
      return;
    }

    try {
      setLoading(true);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();

        const pdf = await PDFDocument.load(bytes);

        const copiedPages =
          await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes =
        await mergedPdf.save();

      const blob = new Blob(
        [new Uint8Array(mergedBytes)], 
        {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "merged.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to merge PDFs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-4 py-20">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Merge PDF
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combine multiple PDF files into one document
            instantly and securely.
          </p>
        </div>

        {/* UPLOAD BOX */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-14 shadow-sm">
          <label
            htmlFor="pdf-upload"
            className="border-2 border-dashed border-gray-300 hover:border-cyan-400 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Select PDF Files
            </h2>

            <p className="text-gray-500 text-lg text-center">
              Drag & drop PDFs here or click to browse
            </p>

            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
          </label>

          {/* FILE LIST */}
          {files.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Selected Files
              </h3>

              <div className="space-y-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">
                        📄
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {file.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={mergePDFs}
                disabled={loading}
                className="w-full mt-10 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-lg py-5 rounded-2xl transition"
              >
                {loading
                  ? "Merging PDFs..."
                  : "Merge PDF"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}