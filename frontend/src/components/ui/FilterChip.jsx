import "react";
import { Check } from "lucide-react";

export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-full border transition-colors duration-150 whitespace-nowrap ${
        active
          ? "bg-[#9C4526] border-[#9C4526] text-white"
          : "bg-transparent border-[#171310]/20 text-[#171310] hover:border-[#171310]"
      }`}
    >
      {active && <Check size={13} strokeWidth={2.5} />}
      {label}
    </button>
  );
}