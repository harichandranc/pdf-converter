import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  href,
}: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300 h-full flex flex-col">
        {/* ICON */}
        <div className="w-24 h-24 rounded-3xl bg-cyan-50 flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition">
          {icon}
        </div>

        {/* TITLE */}
        <h3 className="text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-xl leading-relaxed flex-grow">
          {description}
        </p>

        {/* BUTTON */}
        <div className="mt-8 inline-flex items-center gap-2 text-cyan-600 font-bold text-xl">
          Use Tool
          <span className="group-hover:translate-x-1 transition">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}