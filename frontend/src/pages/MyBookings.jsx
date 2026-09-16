import { useState } from "react";
import { MapPin } from "lucide-react";
import { RESOURCES } from "../data/mockData";
import { fmtPeso } from "../utils/helpers";
import StatusBadge from "../components/ui/StatusBadge";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

export default function MyBookings({ bookings, navigate }) {
  const [tab, setTab] = useState("Upcoming");
  const tabs = ["Upcoming", "Past", "Cancelled"];

  const filtered = bookings.filter((b) => {
    if (tab === "Upcoming") return b.status === "confirmed" || b.status === "pending";
    if (tab === "Past") return b.status === "past";
    return b.status === "cancelled";
  });

  return (
    <div className="max-w-[840px] mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-display text-[30px] sm:text-[34px] text-[#171310] mb-6">My bookings</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#171310]/10 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-[13.5px] font-medium px-4 py-2.5 border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-[#9C4526] text-[#171310]"
                : "border-transparent text-[#171310]/55 hover:text-[#171310]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length ? (
        <div className="space-y-3">
          {filtered.map((b) => {
            const matchedResource = RESOURCES.find((r) => r.name === b.resourceName);
            return (
              <div
                key={b.id}
                className="bg-white/60 border border-[#171310]/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <p className="font-display text-[16px] text-[#171310]">{b.resourceName}</p>
                  <p className="text-[12.5px] text-[#171310]/55 mt-1 flex items-center gap-1">
                    <MapPin size={11} /> {b.location}
                  </p>
                  <p className="text-[13px] text-[#171310] mt-2">
                    {b.date} · {b.time}
                  </p>
                  <p className="text-[12.5px] text-[#171310]/55 mt-0.5">
                    {b.duration} · {fmtPeso(b.total)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={b.status} />
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!matchedResource}
                    onClick={() => matchedResource && navigate("details", matchedResource)}
                  >
                    View details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={`No ${tab.toLowerCase()} bookings`}
          body="When you book a space, it will show up here."
          action={
            <Button size="sm" onClick={() => navigate("browse")}>
              Explore spaces
            </Button>
          }
        />
      )}
    </div>
  );
}