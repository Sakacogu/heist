import Link from "next/link";

import type { LucideIcon } from "lucide-react";

export interface Feature {
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

export default function FeatureCard(props: FeatureCardProps) {
  const { title, description, icon: BrandIcon, features, href } = props;

  // choose wrapper tag based on the presence of a link
  const Wrapper: React.ElementType = href ? Link : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="
        group block p-6 bg-white rounded-2xl shadow-lg transition
        hover:shadow-2xl hover:-translate-y-1
      "
    >
      <header className="mb-4 flex items-center gap-3">
        <BrandIcon className="h-8 w-8 text-cyan-600" />
        <h3 className="text-xl font-semibold group-hover:text-cyan-600">
          {title}
        </h3>
      </header>

      <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

      <ul className="flex flex-wrap gap-4">
        {features.map(({ icon: FIcon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-gray-700 transition group-hover:text-cyan-600"
          >
            <FIcon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
