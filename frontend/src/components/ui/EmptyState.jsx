import "react";
import { Search } from "lucide-react";

export default function EmptyState({ title, body, action }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6 border border-dashed border-[#171310]/20 rounded-2xl bg-white/40">
      <div className="w-10 h-10 rounded-full bg-[#F3E4DB] flex items-center justify-center mb-4">
        <Search size={16} className="text-[#9C4526]" />
      </div>
      <p className="font-display text-[17px] text-[#171310] mb-1">{title}</p>
      <p className="text-[13px] text-[#171310]/55 max-w-xs mb-5">{body}</p>
      {action}
    </div>
  );
}