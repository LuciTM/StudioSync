import "react";
import { Check } from "lucide-react";
import { AMENITY_ICONS } from "../../data/mockData";

export default function AmenityBadge({ name }) {
  const Icon = AMENITY_ICONS[name] || Check;
  return (
    <span className="inline-flex items-center gap-1 text-[12px] text-[#171310]/60 border border-[#171310]/15 rounded-full px-2.5 py-1">
      <Icon size={12} strokeWidth={1.75} />
      {name}
    </span>
  );
}