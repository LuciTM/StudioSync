import "react";
import { Plus } from "lucide-react";
import Button from "../components/ui/Button";

export default function HostDashboard({ notify }) {
  const stats = [
    { label: "Total bookings", value: "12" },
    { label: "Active spaces", value: "8" },
    { label: "This month", value: "₱24,850" },
    { label: "Average capacity", value: "72%" },
  ];
  const rows = [
    { name: "Creative Room A", capacity: 6, today: 4, avail: 2 },
    { name: "Studio North", capacity: 5, today: 3, avail: 2 },
    { name: "Desk Area B", capacity: 12, today: 7, avail: 5 },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="font-display text-[28px] text-[#171310]">Your spaces</h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => notify("Availability manager opened.")}>
            Manage availability
          </Button>
          <Button size="sm" onClick={() => notify("Space draft created.")}>
            <Plus size={14} /> Add space
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/60 border border-[#171310]/10 rounded-2xl p-4">
            <p className="text-[22px] font-semibold text-[#171310]">{s.value}</p>
            <p className="text-[12.5px] text-[#171310]/55 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/60 border border-[#171310]/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#171310]/10 bg-[#171310]/[0.03]">
              {["Space", "Capacity", "Today's Bookings", "Availability"].map((h) => (
                <th key={h} className="text-[12px] font-medium text-[#171310]/55 px-4 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={i !== rows.length - 1 ? "border-b border-[#171310]/10" : ""}>
                <td className="px-4 py-3.5 text-[13.5px] font-medium text-[#171310] whitespace-nowrap">
                  {r.name}
                </td>
                <td className="px-4 py-3.5 text-[13.5px] text-[#171310]">{r.capacity}</td>
                <td className="px-4 py-3.5 text-[13.5px] text-[#171310]">{r.today}</td>
                <td className="px-4 py-3.5 text-[13.5px] text-[#4C7A4A] font-medium whitespace-nowrap">
                  {r.avail} available
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}