"use client";

import { useState } from "react";

export default function PdfToJpgPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setLoading(true);
      setImages([]);

      const file = e.target.files?.[0];

      if (!file) {
        setLoading(false);
        return;
      }

      const pdfjsLib = await import("pdfjs-dist");

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

      const arrayBuffer =
        await file.arrayBuffer();

      const pdf =
        await pdfjsLib.getDocument({
          data: arrayBuffer,
        }).promise;

      const outputImages: string[] = [];

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {
        const page = await pdf.getPage(i);

        const viewport =
          page.getViewport({
            scale: 2,
          });

        const canvas =
          document.createElement("canvas");

        const context =
          canvas.getContext("2d");

        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        outputImages.push(
          canvas.toDataURL(
            "image/jpeg",
            1.0
          )
        );
      }

      setImages(outputImages);
    } catch (error) {
      console.error(error);
      alert("Failed to convert PDF");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (
    image: string,
    index: number
  ) => {
    const link =
      document.createElement("a");

    link.href = image;
    link.download = `page-${
      index + 1
    }.jpg`;

    link.click();
  };

  const downloadAll = () => {
    images.forEach((image, index) => {
      setTimeout(() => {
        downloadImage(image, index);
      }, index * 300);
    });
  };

  return (
    <main className="bg-[#f7f7fb] min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-6 py-3 rounded-full font-semibold mb-8">
              🖼️ Fast PDF Image Converter
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Convert PDF
              <br />
              into JPG Images
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Extract every page from your PDF
              as high-quality JPG images
              instantly and securely.
            </p>
          </div>

          {/* UPLOAD BOX */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-10 max-w-4xl mx-auto">
            <div className="border-2 border-dashed border-cyan-300 rounded-3xl p-14 text-center hover:border-cyan-500 transition">
              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF File
              </h2>

              <p className="text-gray-500 text-lg mb-8">
                Select a PDF file to convert
                into JPG images
              </p>

              <label className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl cursor-pointer transition text-lg">
                Choose PDF
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>

              {loading && (
                <div className="mt-8">
                  <div className="w-14 h-14 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto"></div>

                  <p className="mt-4 text-cyan-700 font-semibold text-lg">
                    Converting PDF...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      {images.length > 0 && (
        <section className="pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* TOP BAR */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                  Converted Images
                </h2>

                <p className="text-gray-600 text-lg">
                  {images.length} pages
                  converted successfully
                </p>
              </div>

              <button
                onClick={downloadAll}
                className="bg-black hover:opacity-90 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg"
              >
                Download All JPGs
              </button>
            </div>

            {/* IMAGE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map(
                (image, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img
                        src={image}
                        alt={`Page ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-2xl font-bold text-gray-900">
                          Page {index + 1}
                        </h3>

                        <div className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full font-semibold text-sm">
                          JPG
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          downloadImage(
                            image,
                            index
                          )
                        }
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-4 rounded-2xl transition"
                      >
                        Download JPG
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}