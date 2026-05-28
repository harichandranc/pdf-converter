import Link from "next/link";

export default function Footer() {

  const pdfTools = [

    {
      name: "Merge PDF",
      href: "/merge-pdf",
    },

    {
      name: "Split PDF",
      href: "/split-pdf",
    },

    {
      name: "Compress PDF",
      href: "/compress-pdf",
    },

    {
      name: "Image to PDF",
      href: "/image-to-pdf",
    },

    {
      name: "PDF to JPG",
      href: "/pdf-to-jpg",
    },

    {
      name: "Word to PDF",
      href: "/word-to-pdf",
    },

    {
      name: "PDF to Word",
      href: "/pdf-to-word",
    },

    {
      name: "Excel to PDF",
      href: "/excel-to-pdf",
    },


    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
    },

    {
      name: "Delete PDF Pages",
      href: "/delete-pdf",
    },

    {
      name: "Protect PDF",
      href: "/protect-pdf",
    },

    {
      name: "Unlock PDF",
      href: "/unlock-pdf",
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-24">

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* LEFT - PDF TOOLS */}
          <div>

            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              PDF Tools
            </h3>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">

              {pdfTools.map((tool) => (

                <Link
                  key={tool.name}
                  href={tool.href}
                  className="text-gray-600 hover:text-cyan-500 transition"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* MIDDLE - COMPANY */}
          <div className="md:mx-auto">

            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Company
            </h3>

            <div className="flex flex-col gap-4">

              <a
                href="https://chtechgiant.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                CH Tech Giant
              </a>
              
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

              <a
                href="mailto:info@chtechgiant.com"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Contact
              </a>

              

              <a
                href="https://play.google.com/store/apps/developer?id=CH+TECH+GIANT+%28OPC%29+PRIVATE+LIMITED"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Play Store
              </a>
            </div>
          </div>

          {/* RIGHT - BRAND */}
          <div className="md:ml-auto text-left md:text-right">

            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-5 py-2 rounded-full font-semibold mb-6">
              ⚡ Fast & Secure
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
              PDF Converter
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg max-w-sm md:ml-auto">
              Free online PDF tools for merging,
              splitting, compressing, converting,
              rotating and protecting PDF files
              quickly and securely.
            </p>

            {/* PLAY STORE BADGE */}
            <div className="mt-8 md:flex md:justify-end">

              <a
                href="https://play.google.com/store/apps/details?id=com.chtechgiant.everything_converter&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-105 inline-block"
              >

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-14"
                />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-14 pt-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* COPYRIGHT */}
            <p className="text-gray-500 text-center md:text-left">
              © 2026 PDF Converter. All rights
              reserved.
            </p>

            {/* LINKS */}
            <div className="flex items-center gap-6 flex-wrap justify-center">

              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/about"
                className="text-gray-600 hover:text-cyan-500 transition"
              >
                About
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=com.chtechgiant.everything_converter&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-cyan-500 transition font-medium"
              >
                Play Store
              </a>

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
      </div>
    </footer>
  );
}