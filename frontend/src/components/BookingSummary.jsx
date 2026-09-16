import "react";
import { fmtPeso } from "../utils/helpers";

export function SummaryRow({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className={`text-sm ${bold ? "text-[#171310] font-semibold" : "text-[#171310]/55"}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? "text-[#171310] font-semibold" : "text-[#171310]/85"}`}>
        {value}
      </span>
    </div>
  );
}

export default function BookingSummary({ r, timeLabel, duration, price, people }) {
  return (
    <div className="bg-white/60 rounded-2xl border border-[#171310]/10 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#171310]/10">
        <h2 className="font-display text-[18px] text-[#171310]">{r.name}</h2>
        <p className="text-[13px] text-[#171310]/55 mt-0.5">{r.location}</p>
      </div>

      {/* Summary rows */}
      <div className="divide-y divide-[#171310]/10">
        <SummaryRow label="Date" value="September 14, 2026" />
        <SummaryRow label="Time" value={timeLabel} />
        <SummaryRow label="Duration" value={duration} />
        {people && <SummaryRow label="Capacity" value={`${people} people`} />}
        <SummaryRow label="Price" value={fmtPeso(price)} bold />
      </div>
    </div>
  );
}