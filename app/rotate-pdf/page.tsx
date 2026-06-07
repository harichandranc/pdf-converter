"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BannerAd from "@/components/BannerAd";

export default function RotatePDFPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [thumbnail, setThumbnail] =
    useState("");

  const [rotation, setRotation] =
    useState("90");

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

      try {

        setLoading(true);

        const selectedFile =
          e.target.files?.[0];

        if (!selectedFile)
          return;

        setFile(
          selectedFile
        );

        // GET THUMBNAIL
        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile
        );

        const response =
          await fetch(
            "https://api.pdfconverter.chtechgiant.com/pdf/thumbnails",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (
          data.success &&
          data.pages?.length > 0
        ) {

          setThumbnail(
            data.pages[0]
              .image
          );
        }

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

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to load PDF"
        );

      } finally {

        setLoading(false);
      }
    };

  // REMOVE FILE
  const removeFile =
    () => {

      setFile(null);

      setThumbnail("");
    };

  // ROTATE PDF
  const rotatePDF =
    async () => {

      if (!file) {

        alert(
          "Select PDF file"
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

        formData.append(
          "rotation",
          rotation
        );

        const response =
          await fetch(
            "https://api.pdfconverter.chtechgiant.com/pdf/rotate",
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
              "Rotate PDF failed"
          );
        }

        // DOWNLOAD
        const link =
          document.createElement(
            "a"
          );

        link.href =
          data.url;

        link.setAttribute(
          "download",
          "rotated.pdf"
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
          "Rotate PDF failed"
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold mb-8">
              🔄 Smart PDF Rotator
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Rotate PDF
              <br />
              Pages Easily
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rotate PDF pages instantly and
              download perfectly aligned PDF
              documents in seconds.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">

            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >

              <div className="text-7xl mb-6">
                📄
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF File
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select PDF file to rotate pages
              </p>

              <div className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
                Choose PDF
              </div>

              <input
                id="pdf-upload"
                type="file"
                accept=".pdf"
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

            {/* REVIEW */}
            {file && (
              <div
                ref={reviewRef}
                className="mt-10"
              >

                {/* FILE CARD */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">

                  <div className="flex flex-col lg:flex-row gap-8">

                    {/* THUMB */}
                    <div className="w-full lg:w-72 flex-shrink-0 relative">

                      {/* REMOVE */}
                      <button
                        onClick={
                          removeFile
                        }
                        className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full font-bold shadow-lg"
                      >
                        ✕
                      </button>

                      {thumbnail ? (
                        <img
                          src={
                            thumbnail
                          }
                          alt="PDF"
                          className="w-full rounded-2xl border border-gray-200 shadow-lg"
                        />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-gray-200 rounded-2xl flex items-center justify-center text-6xl">
                          📄
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

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

                        <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                          Ready
                        </div>
                      </div>

                      {/* ROTATION OPTIONS */}
                      <div>

                        <label className="block text-2xl font-bold text-gray-900 mb-5">
                          Rotate Angle
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                          {[
                            {
                              value:
                                "90",
                              title:
                                "90°",
                              desc:
                                "Rotate Right",
                            },
                            {
                              value:
                                "180",
                              title:
                                "180°",
                              desc:
                                "Upside Down",
                            },
                            {
                              value:
                                "270",
                              title:
                                "270°",
                              desc:
                                "Rotate Left",
                            },
                          ].map(
                            (
                              item
                            ) => (
                              <button
                                key={
                                  item.value
                                }
                                type="button"
                                onClick={() =>
                                  setRotation(
                                    item.value
                                  )
                                }
                                className={`p-5 rounded-2xl border-2 transition text-left ${
                                  rotation ===
                                  item.value
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 bg-white"
                                }`}
                              >

                                <h4 className="font-bold text-xl text-gray-900 mb-2">
                                  {
                                    item.title
                                  }
                                </h4>

                                <p className="text-gray-600">
                                  {
                                    item.desc
                                  }
                                </p>
                              </button>
                            )
                          )}
                        </div>

                        {/* INFO BOX */}
                        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">

                          <p className="text-blue-800 font-medium leading-relaxed">
                            💡 Rotate all pages
                            in your PDF instantly
                            while preserving quality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={
                    rotatePDF
                  }
                  disabled={
                    loading
                  }
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Rotating PDF..."
                    : "Rotate PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}