import { useState } from "react";
import { ChevronLeft, MapPin, Star, Users, Calendar } from "lucide-react";
import { RESOURCES, TIME_SLOTS } from "../data/mockData";
import { availabilityState, addHour, fmtPeso, fmtRating } from "../utils/helpers";
import AmenityBadge from "../components/ui/AmenityBadge";
import AvailabilityDot from "../components/ui/AvailabilityDot";
import Button from "../components/ui/Button";

export default function Details({ resource, navigate }) {
  const r = resource || RESOURCES[4];
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-10">
      <button
        onClick={() => navigate("browse")}
        className="text-[13px] text-[#171310]/55 hover:text-[#171310] flex items-center gap-1 mb-6"
      >
        <ChevronLeft size={14} /> Back to spaces
      </button>

      <div className="h-56 sm:h-80 w-full rounded-2xl mb-8 overflow-hidden">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div>
          <span className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">
            {r.category}
          </span>
          <h1 className="font-display text-[28px] sm:text-[32px] text-[#171310] mt-1">{r.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-[13.5px] text-[#171310]/55">
            <span className="flex items-center gap-1">
              <MapPin size={13} /> {r.location}
            </span>
            <span className="flex items-center gap-1">
              <Star size={13} className="fill-[#171310] text-[#171310]" /> {fmtRating(r.rating)}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} /> {r.capacity} people
            </span>
          </div>

          <p className="text-[14.5px] text-[#171310]/80 leading-relaxed mt-6 max-w-[560px]">
            A flexible creative workspace designed for focused work, small productions, and
            collaborative sessions.
          </p>

          <div className="mt-8">
            <p className="text-[13px] font-semibold text-[#171310] mb-3">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {r.amenities.map((a) => (
                <AmenityBadge key={a} name={a} />
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#171310]/10">
            <p className="text-[13px] font-semibold text-[#171310] mb-3">Availability today</p>
            <div className="hidden sm:block space-y-2 max-w-[420px]">
              {TIME_SLOTS.map((s) => {
                const state = availabilityState(s.booked, s.total);
                const left = s.total - s.booked;
                const isFull = state === "full";
                const active = selectedSlot?.time === s.time;
                return (
                  <button
                    key={s.time}
                    disabled={isFull}
                    onClick={() => setSelectedSlot(s)}
                    className={`w-full flex items-center justify-between border rounded-lg px-3.5 py-2.5 text-left transition-colors ${
                      isFull
                        ? "border-[#171310]/10 opacity-50 cursor-not-allowed"
                        : active
                        ? "border-[#9C4526] bg-[#F3E4DB]"
                        : "border-[#171310]/10 hover:border-[#171310]/40"
                    }`}
                  >
                    <span className="text-[13.5px] font-medium text-[#171310]">
                      {s.time} — {addHour(s.time)}
                    </span>
                    <span
                      className="text-[12.5px] font-medium flex items-center gap-1.5"
                      style={{ color: isFull ? "#171310aa" : "#171310" }}
                    >
                      <AvailabilityDot level={state} />
                      {isFull ? "Full" : `${left} / ${s.total} available`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-white/60 border border-[#171310]/10 rounded-2xl p-5">
          <p className="text-[12px] font-medium text-[#171310]/45 uppercase tracking-wide mb-1">Date</p>
          <div className="flex items-center gap-2 text-[13.5px] font-medium text-[#171310] mb-4">
            <Calendar size={14} /> Today, Sep 14
          </div>

          <div className="sm:hidden mb-4">
            <select
              className="w-full text-[13.5px] border border-[#171310]/15 rounded-md px-3 py-2 focus:outline-none focus:border-[#9C4526]"
              onChange={(e) =>
                setSelectedSlot(TIME_SLOTS.find((s) => s.time === e.target.value) || null)
              }
              defaultValue=""
            >
              <option value="" disabled>
                Choose a time slot
              </option>
              {TIME_SLOTS.map((s) => (
                <option
                  key={s.time}
                  value={s.time}
                  disabled={availabilityState(s.booked, s.total) === "full"}
                >
                  {s.time} —{" "}
                  {availabilityState(s.booked, s.total) === "full"
                    ? "Full"
                    : `${s.total - s.booked} available`}
                </option>
              ))}
            </select>
          </div>

          {selectedSlot ? (
            <div className="border border-[#9C4526] bg-[#F3E4DB] rounded-lg px-3.5 py-2.5 mb-4">
              <p className="text-[13.5px] font-semibold text-[#171310]">
                {selectedSlot.time} — {addHour(selectedSlot.time)}
              </p>
              <p className="text-[12px] text-[#9C4526] font-medium mt-0.5">
                {selectedSlot.total - selectedSlot.booked} / {selectedSlot.total} available
              </p>
            </div>
          ) : (
            <p className="text-[13px] text-[#171310]/55 mb-4">Select a time slot to continue.</p>
          )}

          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-[22px] font-semibold text-[#171310]">{fmtPeso(r.pricePerHour)}</span>
            <span className="text-[13px] text-[#171310]/55">/ hour</span>
          </div>

          <Button
            className="w-full"
            disabled={!selectedSlot}
            onClick={() => navigate("booking", { resource: r, slot: selectedSlot })}
          >
            Book this slot
          </Button>
          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={() => navigate("booking", { resource: r, slot: null, fullDay: true })}
          >
            Book for the day — {fmtPeso(r.pricePerDay)}
          </Button>
        </aside>
      </div>
    </div>
  );
}