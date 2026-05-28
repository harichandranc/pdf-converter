"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { jsPDF } from "jspdf";

import BannerAd from "@/components/BannerAd";

export default function Page() {

  const [images, setImages] =
    useState<File[]>([]);

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

  // HANDLE IMAGE UPLOAD
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    const selectedImages =
      Array.from(e.target.files);

    setImages(selectedImages);

    // AUTO SCROLL
    setTimeout(() => {

      reviewRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "center",
        }
      );

    }, 500);
  };

  // REMOVE IMAGE
  const removeImage = (
    index: number
  ) => {

    const updated =
      [...images];

    updated.splice(index, 1);

    setImages(updated);
  };

  // READ FILE
  const readFile = (
    file: File
  ): Promise<string> => {

    return new Promise(
      (resolve) => {

        const reader =
          new FileReader();

        reader.onload = () => {

          resolve(
            reader.result as string
          );
        };

        reader.readAsDataURL(file);
      }
    );
  };

  // CREATE PDF
  const createPdf =
    async () => {

      if (
        images.length === 0
      ) return;

      try {

        setLoading(true);

        const pdf =
          new jsPDF({
            orientation:
              "portrait",
            unit: "mm",
            format: "a4",
          });

        for (
          let i = 0;
          i < images.length;
          i++
        ) {

          const imageData =
            await readFile(
              images[i]
            );

          const img =
            new Image();

          img.src =
            imageData;

          await new Promise(
            (
              resolve
            ) => {

              img.onload =
                resolve;
            }
          );

          const pdfWidth =
            210;

          const pdfHeight =
            297;

          const margin =
            10;

          const imgWidth =
            pdfWidth -
            margin * 2;

          const imgHeight =
            (img.height *
              imgWidth) /
            img.width;

          let finalHeight =
            imgHeight;

          let finalWidth =
            imgWidth;

          // FIT HEIGHT
          if (
            finalHeight >
            pdfHeight -
              margin * 2
          ) {

            finalHeight =
              pdfHeight -
              margin * 2;

            finalWidth =
              (img.width *
                finalHeight) /
              img.height;
          }

          const x =
            (pdfWidth -
              finalWidth) /
            2;

          const y =
            (pdfHeight -
              finalHeight) /
            2;

          if (i !== 0) {
            pdf.addPage();
          }

          pdf.addImage(
            imageData,
            "JPEG",
            x,
            y,
            finalWidth,
            finalHeight
          );
        }

        pdf.save(
          "converted.pdf"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "PDF creation failed"
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

            {/* UPLOAD */}
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

            {/* BANNER AD */}
            <div className="mt-10">
              <BannerAd />
            </div>

            {/* REVIEW */}
            {images.length >
              0 && (
              <div
                ref={reviewRef}
                className="mt-10"
              >

                {/* INFO */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>

                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        Selected Images
                      </h3>

                      <p className="text-gray-600 text-lg">
                        {
                          images.length
                        }{" "}
                        Images Ready
                      </p>
                    </div>

                    <div className="bg-cyan-100 text-cyan-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>
                </div>

                {/* IMAGE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {images.map(
                    (
                      image,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg"
                      >

                        {/* REMOVE BTN */}
                        <button
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full font-bold shadow-lg"
                        >
                          ✕
                        </button>

                        {/* IMAGE */}
                        <img
                          src={URL.createObjectURL(
                            image
                          )}
                          alt={
                            image.name
                          }
                          className="w-full h-72 object-cover"
                        />

                        {/* INFO */}
                        <div className="p-5">

                          <h4 className="font-bold text-gray-900 break-all text-lg mb-2">
                            {
                              image.name
                            }
                          </h4>

                          <p className="text-gray-500">
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
                  onClick={
                    createPdf
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