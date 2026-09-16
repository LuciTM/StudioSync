import "react";

export default function StatusBadge({ status }) {
  const map = {
    confirmed: { label: "Confirmed", bg: "#E7F4EC", fg: "#16803C", dot: "#16803C" },
    pending: { label: "Pending", bg: "#FCF3E3", fg: "#92640B", dot: "#C7860B" },
    cancelled: { label: "Cancelled", bg: "#F1EEEA", fg: "#6B6B67", dot: "#9A9691" },
    past: { label: "Completed", bg: "#EEF1FA", fg: "#3A4A7A", dot: "#5C6FA8" },
  };
  const s = map[status] || map.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {s.label}
    </span>
  );
}
