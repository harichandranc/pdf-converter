"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPDFPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

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

      const compressed =
        await pdf.save({
          useObjectStreams: true,
        });

      const blob = new Blob(
        [new Uint8Array(compressed)],
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
    <main className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl p-10">
        <h1 className="text-5xl font-extrabold text-center mb-10">
          Compress PDF
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null
            )
          }
          className="mb-8"
        />

        <button
          onClick={compressPDF}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 py-5 rounded-2xl font-bold"
        >
          {loading
            ? "Compressing..."
            : "Compress PDF"}
        </button>
      </div>
    </main>
  );
}