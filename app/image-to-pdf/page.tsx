"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Page() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(file);
    });
  };

  const createPdf = async () => {
    if (images.length === 0) return;

    setLoading(true);

    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const imageData = await readFile(images[i]);

      const img = new Image();
      img.src = imageData;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const width = pdf.internal.pageSize.getWidth();

      const height =
        (img.height * width) / img.width;

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
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-black mb-4">
            Image to PDF
          </h1>

          <p className="text-gray-600 text-lg">
            Convert JPG, PNG and other images into PDF instantly
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <label className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              Upload Images
            </h2>

            <p className="text-gray-500 mb-4 text-center">
              Select multiple images to convert into one PDF
            </p>

            <span className="bg-black text-white px-6 py-3 rounded-xl">
              Choose Images
            </span>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* File Count */}
          {images.length > 0 && (
            <div className="mt-6 text-center">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">
                {images.length} image(s) selected
              </span>
            </div>
          )}

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-3 shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />

                  <p className="mt-3 text-sm text-center truncate">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Convert Button */}
          {images.length > 0 && (
            <button
              onClick={createPdf}
              disabled={loading}
              className="w-full mt-10 bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Converting..."
                : "Convert to PDF"}
            </button>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Fast Conversion
            </h3>

            <p className="text-gray-600">
              Convert images into PDFs instantly in your browser.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Secure
            </h3>

            <p className="text-gray-600">
              Your files never leave your device.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Free to Use
            </h3>

            <p className="text-gray-600">
              Unlimited image to PDF conversions for free.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}