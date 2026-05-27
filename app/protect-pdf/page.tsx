"use client";

import { useState } from "react";

export default function ProtectPDFPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // HANDLE FILE
  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  // PROTECT PDF
  const protectPDF = async () => {
    if (!file) {
      alert("Select PDF file");
      return;
    }

    if (!password.trim()) {
      alert("Enter password");
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append("file", file);

      formData.append(
        "password",
        password
      );

      // VPS API CALL
      const response = await fetch(
        "http://147.93.110.58:3000/pdf/protect",
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
            "Protect PDF failed"
        );
      }

      // DOWNLOAD PDF
      const link =
        document.createElement("a");

      link.href = data.url;

      link.setAttribute(
        "download",
        "protected.pdf"
      );

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error(error);

      alert("Protect PDF failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f7f7fb] min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold mb-8">
              🔒 Smart PDF Security
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              Protect PDF
              <br />
              With Password
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Add password protection to your
              PDF file instantly and keep your
              documents secure.
            </p>
          </div>

          {/* MAIN BOX */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-12">
            {/* FILE PICKER */}
            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed border-green-300 hover:border-green-500 transition rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-7xl mb-6">
                🔐
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload PDF File
              </h2>

              <p className="text-gray-500 text-lg text-center mb-8">
                Select PDF file to protect with
                password
              </p>

              <div className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl transition text-lg">
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 break-all mb-3">
                        {file.name}
                      </h3>

                      <p className="text-gray-600 text-lg">
                        {(
                          file.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>

                    <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-bold text-lg w-fit">
                      Ready
                    </div>
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="mt-8">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    PDF Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter strong password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:border-green-500"
                  />
                </div>

                {/* BUTTON */}
                <button
                  onClick={protectPDF}
                  disabled={loading}
                  className="w-full mt-10 bg-black hover:opacity-90 disabled:opacity-50 text-white font-bold text-xl py-5 rounded-2xl transition"
                >
                  {loading
                    ? "Protecting..."
                    : "Protect PDF"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}