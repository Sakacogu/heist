import {
  Lightbulb,
  Thermometer,
  Shield,
  Wifi,
  AlignVerticalJustifyCenter,
} from "lucide-react";

export const fnIcons: Record<string, React.FC<{ className?: string }>> = {
  lighting: Lightbulb,
  heating: Thermometer,
  security: Shield,
  wifi: Wifi,
  blinds: AlignVerticalJustifyCenter,
};

export const fnLabels: Record<string, string> = {
  lighting: "Lýsing",
  heating: "Hiti",
  security: "Öryggi",
  wifi: "Wi-Fi",
  blinds: "Gardínur",
};
