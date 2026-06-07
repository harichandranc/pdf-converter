"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import BannerAd from "@/components/BannerAd";

export default function UnlockPDFPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [password, setPassword] =
    useState("");

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
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const selectedFile =
        e.target.files?.[0];

      if (!selectedFile)
        return;

      setFile(
        selectedFile
      );

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
    };

  // REMOVE FILE
  const removeFile =
    () => {

      setFile(null);

      setPassword("");
    };

  // UNLOCK PDF
  const unlockPDF =
    async () => {

      if (!file) {

        alert(
          "Select PDF file"
        );

        return;
      }

      if (
        !password.trim()
      ) {

        alert(
          "Enter PDF password"
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
          "password",
          password
        );

        const response =
          await fetch(
            "https://api.pdfconverter.chtechgiant.com/pdf/unlock",
            {
              method: "POST",
              body: formData,
            }
          );

        if (!response.ok) {

          const errorText =
            await response.text();

          console.log(
            errorText
          );

          throw new Error(
            `Server Error ${response.status}`
          );
        }

        const data =
          await response.json();

        console.log(data);

        if (
          !data.success
        ) {

          throw new Error(
            data.error ||
              "Unlock PDF failed"
          );
        }

        // FIX URL
        let downloadUrl =
          data.url;

        if (
          downloadUrl &&
          !downloadUrl.startsWith(
            "http"
          )
        ) {

          downloadUrl =
            `https://api.pdfconverter.chtechgiant.com${downloadUrl}`;
        }

        // DOWNLOAD
        window.open(
          downloadUrl,
          "_blank"
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Unlock PDF failed"
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">

            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-6 py-3 rounded-full font-semibold mb-8">
              🔓 Smart PDF Unlocker
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Unlock PDF
              <br />
              Password Protection
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Remove password protection from
              your PDF instantly and download
              unlocked PDF file securely.
            </p>
          </div>

          {/* MAIN */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">

            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-yellow-300 hover:border-yellow-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >

              <div className="text-7xl mb-6">
                🔓
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Locked PDF
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select password protected PDF
                file to unlock
              </p>

              <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
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

                {/* CARD */}
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">

                  <div className="flex flex-col gap-8">

                    {/* REMOVE */}
                    <div className="flex justify-end">

                      <button
                        onClick={
                          removeFile
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-bold"
                      >
                        Remove File
                      </button>
                    </div>

                    {/* FILE INFO */}
                    <div>

                      <h3 className="text-3xl font-bold text-gray-900 break-all mb-3">
                        {
                          file.name
                        }
                      </h3>

                      <p className="text-gray-600 text-lg mb-6">
                        {(
                          file.size /
                          1024 /
                          1024
                        ).toFixed(
                          2
                        )}{" "}
                        MB
                      </p>

                      <div className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                        Ready
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>

                      <label className="block text-2xl font-bold text-gray-900 mb-5">
                        PDF Password
                      </label>

                      <input
                        type="password"
                        placeholder="Enter PDF password"
                        value={
                          password
                        }
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition bg-white"
                      />

                      {/* INFO */}
                      <div className="mt-5 bg-yellow-50 border border-yellow-100 rounded-2xl p-5">

                        <p className="text-yellow-800 font-medium leading-relaxed">
                          💡 Enter the correct password
                          used to protect this PDF file.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={
                    unlockPDF
                  }
                  disabled={
                    loading
                  }
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Unlocking PDF..."
                    : "Unlock PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}