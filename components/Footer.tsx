import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-black font-extrabold text-2xl">
                P
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  PDF Converter
                </h2>

                <p className="text-sm text-gray-500">
                  Online PDF Tools
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Free online PDF tools for merging,
              splitting, compressing and converting
              PDF files quickly and securely.
            </p>
          </div>

          {/* PDF TOOLS */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              PDF Tools
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link
                href="/merge-pdf"
                className="hover:text-cyan-500 transition"
              >
                Merge PDF
              </Link>

              <Link
                href="/split-pdf"
                className="hover:text-cyan-500 transition"
              >
                Split PDF
              </Link>

              <Link
                href="/compress-pdf"
                className="hover:text-cyan-500 transition"
              >
                Compress PDF
              </Link>

              <Link
                href="/image-to-pdf"
                className="hover:text-cyan-500 transition"
              >
                Image to PDF
              </Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                About Us
              </Link>

              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                Contact
              </Link>

              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                Help Center
              </Link>

              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                FAQs
              </Link>

              <Link
                href="/"
                className="hover:text-cyan-500 transition"
              >
                Report Issue
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-center md:text-left">
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
    </footer>
  );
}