"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>(
    []
  );

  const [loading, setLoading] =
    useState(false);

  const handleFiles = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFiles(
        Array.from(e.target.files)
      );
    }
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert(
        "Please select at least 2 PDF files."
      );
      return;
    }

    try {
      setLoading(true);

      const mergedPdf =
        await PDFDocument.create();

      for (const file of files) {
        const bytes =
          await file.arrayBuffer();

        const pdf =
          await PDFDocument.load(bytes);

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
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

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
              📚 Smart PDF Merger
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Merge Multiple
              <br />
              PDF Files
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combine multiple PDF documents
              into one single file instantly
              and securely.
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
                Upload PDF Files
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select multiple PDF files to
                merge together
              </p>

              <div className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose PDFs
              </div>

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
                {/* TOP INFO */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Selected Files
                    </h3>

                    <p className="text-gray-600 text-lg">
                      {files.length} PDF
                      files ready to merge
                    </p>
                  </div>

                  <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                    Ready to Merge
                  </div>
                </div>

                {/* FILE CARDS */}
                <div className="space-y-5">
                  {files.map(
                    (file, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-3xl p-6 hover:shadow-lg transition"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-5 min-w-0">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl shrink-0">
                              📄
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xl font-bold text-gray-900 truncate">
                                {file.name}
                              </h4>

                              <p className="text-gray-500 mt-1">
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

                          <div className="hidden md:flex bg-cyan-50 text-cyan-700 px-5 py-2 rounded-xl font-semibold">
                            PDF
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* INFO BOX */}
                <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-2xl p-5">
                  <p className="text-cyan-800 font-medium leading-relaxed">
                    💡 Files will be merged in
                    the same order shown above.
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={mergePDFs}
                  disabled={loading}
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Merging PDFs..."
                    : "Merge PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}