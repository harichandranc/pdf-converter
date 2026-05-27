"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Page() {
  const [images, setImages] =
    useState<File[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setImages(
        Array.from(e.target.files)
      );
    }
  };

  const readFile = (
    file: File
  ): Promise<string> => {
    return new Promise((resolve) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        resolve(
          reader.result as string
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const createPdf = async () => {
    if (images.length === 0) return;

    setLoading(true);

    const pdf = new jsPDF();

    for (
      let i = 0;
      i < images.length;
      i++
    ) {
      const imageData =
        await readFile(images[i]);

      const img = new Image();

      img.src = imageData;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const width =
        pdf.internal.pageSize.getWidth();

      const height =
        (img.height * width) /
        img.width;

      if (i !== 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        0,
        width,
        height
      );
    }

    pdf.save("converted.pdf");

    setLoading(false);
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
              🖼️ Smart Image Converter
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Convert Images
              <br />
              into PDF Files
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Convert JPG, PNG and other image
              formats into professional PDF
              documents instantly.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-12">
            {/* UPLOAD BOX */}
            <label className="border-2 border-dashed border-cyan-300 hover:border-cyan-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer">
              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Images
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select multiple images to
                combine into one PDF file
              </p>

              <div className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose Images
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />
            </label>

            {/* FILE INFO */}
            {images.length > 0 && (
              <div className="mt-10">
                {/* TOP INFO */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      Selected Images
                    </h3>

                    <p className="text-gray-600 text-lg">
                      {images.length} images
                      ready for conversion
                    </p>
                  </div>

                  <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                    Ready to Convert
                  </div>
                </div>

                {/* IMAGE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map(
                    (image, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={URL.createObjectURL(
                              image
                            )}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-5">
                          <h4 className="font-bold text-gray-900 truncate text-lg">
                            {image.name}
                          </h4>

                          <p className="text-gray-500 mt-2">
                            {(
                              image.size /
                              1024 /
                              1024
                            ).toFixed(
                              2
                            )}{" "}
                            MB
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* INFO BOX */}
                <div className="mt-8 bg-cyan-50 border border-cyan-100 rounded-2xl p-5">
                  <p className="text-cyan-800 font-medium leading-relaxed">
                    💡 Images will appear in the
                    PDF in the same order shown
                    above.
                  </p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={createPdf}
                  disabled={loading}
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