import Link from "next/link";

type Props = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

export default function ToolCard({
  title,
  description,
  icon,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl">
        {/* TOP GRADIENT */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>

        {/* ICON */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-50 text-5xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        {/* TITLE */}
        <h3 className="mb-4 text-3xl font-extrabold text-gray-900 transition group-hover:text-cyan-600">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-lg leading-relaxed text-gray-600">
          {description}
        </p>

        {/* BUTTON */}
        <div className="mt-8 flex items-center gap-2 font-bold text-cyan-600">
          Use Tool

          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>

        {/* HOVER GLOW */}
        <div className="absolute -bottom-24 -right-24 h-40 w-40 rounded-full bg-cyan-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100"></div>
      </div>
    </Link>
  );
}