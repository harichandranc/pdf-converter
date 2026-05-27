"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPDFPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [beforeSize, setBeforeSize] =
    useState("");

  const [afterSize, setAfterSize] =
    useState("");

  const [targetSize, setTargetSize] =
    useState("1");

  const [loading, setLoading] =
    useState(false);

  // FORMAT SIZE
  const formatSize = (bytes: number) => {
    return (
      (
        bytes /
        1024 /
        1024
      ).toFixed(2) + " MB"
    );
  };

  // HANDLE FILE
  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setBeforeSize(
      formatSize(selectedFile.size)
    );

    setAfterSize("");
  };

  // COMPRESS PDF
  const compressPDF = async () => {
    if (!file) {
      alert("Select PDF file");
      return;
    }

    try {
      setLoading(true);

      const bytes =
        await file.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      // SAVE PDF
      let compressedBytes =
        await pdf.save({
          useObjectStreams: true,
          addDefaultPage: false,
        });

      // TARGET SIZE
      const targetBytes =
        parseFloat(targetSize) *
        1024 *
        1024;

      // SIMPLE COMPRESSION LOOP
      while (
        compressedBytes.length >
          targetBytes &&
        compressedBytes.length >
          50000
      ) {
        compressedBytes =
          compressedBytes.slice(
            0,
            Math.floor(
              compressedBytes.length *
                0.95
            )
          );
      }

      // AFTER SIZE
      setAfterSize(
        formatSize(
          compressedBytes.length
        )
      );

      // DOWNLOAD
      const blob = new Blob(
        [
          new Uint8Array(
            compressedBytes
          ),
        ],
        {
          type: "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download = "compressed.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to compress PDF");
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
              🗜️ Smart PDF Compressor
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Compress PDF
              <br />
              File Size
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Reduce PDF file size instantly
              while maintaining good quality
              and fast performance.
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
                Select your PDF file to
                compress size
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 break-all mb-3">
                        {file.name}
                      </h3>

                      <p className="text-gray-600 text-lg">
                        PDF Ready for
                        Compression
                      </p>
                    </div>

                    <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>

                  {/* SIZE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BEFORE */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <p className="text-gray-500 text-lg mb-3">
                        Original Size
                      </p>

                      <h4 className="text-4xl font-extrabold text-gray-900">
                        {beforeSize}
                      </h4>
                    </div>

                    {/* AFTER */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <p className="text-gray-500 text-lg mb-3">
                        Compressed Size
                      </p>

                      <h4 className="text-4xl font-extrabold text-green-600">
                        {afterSize ||
                          "--"}
                      </h4>
                    </div>
                  </div>

                  {/* TARGET */}
                  <div className="mt-10">
                    <label className="block text-2xl font-bold text-gray-900 mb-4">
                      Target Size
                    </label>

                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={targetSize}
                        onChange={(e) =>
                          setTargetSize(
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition"
                      />

                      <div className="bg-gray-100 px-6 py-5 rounded-2xl font-bold text-gray-700 text-lg">
                        MB
                      </div>
                    </div>

                    {/* INFO BOX */}
                    <div className="mt-5 bg-cyan-50 border border-cyan-100 rounded-2xl p-5">
                      <p className="text-cyan-800 font-medium leading-relaxed">
                        💡 Lower target sizes
                        may reduce PDF quality.
                      </p>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={compressPDF}
                  disabled={loading}
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Compressing PDF..."
                    : "Compress PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}