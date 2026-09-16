import "react";
import { Check } from "lucide-react";
import { INITIAL_BOOKINGS } from "../data/mockData";
import { fmtPeso } from "../utils/helpers";
import { SummaryRow } from "../components/BookingSummary";
import StatusBadge from "../components/ui/StatusBadge";
import Button from "../components/ui/Button";

export default function Confirmation({ booking, navigate }) {
  const b = booking || INITIAL_BOOKINGS[0];

  return (
    <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E7F0E6] flex items-center justify-center mx-auto mb-6">
        <Check size={28} className="text-[#4C7A4A]" strokeWidth={2.5} />
      </div>

      <h1 className="font-display text-[30px] text-[#171310]">Booking confirmed.</h1>
      <p className="text-[14.5px] text-[#171310]/55 mt-2">Your workspace is ready.</p>

      <div className="mt-8 bg-white/60 border border-[#171310]/10 rounded-2xl divide-y divide-[#171310]/10 text-left">
        <SummaryRow label="Space" value={b.resourceName} />
        <SummaryRow label="Date" value={b.date} />
        <SummaryRow label="Time" value={b.time} />
        <SummaryRow label="Duration" value={b.duration} />
        <SummaryRow label="Booking ID" value={b.id} />
        <SummaryRow label="Total" value={fmtPeso(b.total)} bold />
        <div className="px-5 py-3 flex items-center justify-between">
          <span className="text-[13px] text-[#171310]/55">Status</span>
          <StatusBadge status="confirmed" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Button variant="secondary" onClick={() => navigate("mybookings")}>
          View booking
        </Button>
        <Button onClick={() => navigate("browse")}>Browse more spaces</Button>
      </div>
    </div>
  );
}