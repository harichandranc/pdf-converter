import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* LEFT - PDF TOOLS */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              PDF Tools
            </h3>

            <div className="flex flex-col gap-4">
              <Link
                href="/merge-pdf"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Merge PDF
              </Link>

              <Link
                href="/split-pdf"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Split PDF
              </Link>

              <Link
                href="/compress-pdf"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Compress PDF
              </Link>

              <Link
                href="/image-to-pdf"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Image to PDF
              </Link>

              <Link
                href="/pdf-to-jpg"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                PDF to JPG
              </Link>

              <Link
                href="/word-to-pdf"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Word to PDF
              </Link>
            </div>
          </div>

          {/* MIDDLE - COMPANY */}
          <div className="md:mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Company
            </h3>

            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                About Us
              </Link>

              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT - BRAND */}
          <div className="md:ml-auto text-left md:text-right">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
              PDF Converter
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg max-w-xs md:ml-auto">
              Free online PDF tools for merging,
              splitting, compressing and converting
              PDF files quickly and securely.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-14 pt-8">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-gray-500">
              © 2026 PDF Converter. All rights
              reserved.
            </p>

            <a
              href="https://chtechgiant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan-500 transition font-medium"
            >
              Developed by CH Tech Giant
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}