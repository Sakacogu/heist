import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  label: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: Feature[];
  href?: string;
}

export default function FeatureCard({
  title,
  description,
  icon: BrandIcon,
  features,
  href,
}: FeatureCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className="
        group block p-6 bg-white rounded-2xl shadow-lg transition
        hover:shadow-2xl hover:-translate-y-1
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <BrandIcon className="w-8 h-8 text-cyan-600" />
        <h3 className="text-xl font-semibold group-hover:text-cyan-600">
          {title}
        </h3>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

      <div className="flex flex-wrap gap-4">
        {features.map(({ icon: FIcon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-gray-700 group-hover:text-cyan-600"
          >
            <FIcon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
