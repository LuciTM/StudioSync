import "react";

export default function QuickField({ icon: Icon, label, value }) {
  return (
    <div className="flex-1 px-3 py-2 sm:px-4">
      <p className="text-[11px] font-medium text-[#9A9691] uppercase tracking-wide">{label}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <Icon size={14} className="text-[#6B6B67]" />
        <span className="text-[13.5px] text-[#171717]">{value}</span>
      </div>
    </div>
  );
}
