import "react";
import { MapPin, Star } from "lucide-react";
import { availabilityState, fmtPeso, fmtRating } from "../utils/helpers";
import AvailabilityDot from "./ui/AvailabilityDot";

export default function WorkspaceCard({ r, onView }) {
  const state = availabilityState(r.booked, r.total);
  const left = r.total - r.booked;
  const label = state === "full" ? "Fully booked" : `${left} available`;

  return (
    <div onClick={() => onView(r)} className="group cursor-pointer">
      <div className="rounded-2xl overflow-hidden aspect-[4/3]">
        <img
          src={r.image}
          alt={r.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">
          {r.category}
        </span>
        <span className="flex items-center gap-1 text-[12.5px] text-[#171310]">
          <Star size={12} className="fill-[#171310] text-[#171310]" /> {fmtRating(r.rating)}
        </span>
      </div>

      <h3 className="font-display text-[19px] text-[#171310] mt-1">{r.name}</h3>
      <p className="text-[13px] text-[#171310]/55 mt-0.5 flex items-center gap-1">
        <MapPin size={12} /> {r.location}
      </p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#171310]/10">
        <div>
          <span className="text-[15px] font-medium text-[#171310]">{fmtPeso(r.pricePerHour)}</span>
          <span className="text-[13px] text-[#171310]/55"> / hour</span>
        </div>
        <div
          className="flex items-center gap-1.5 text-[12.5px] font-medium"
          style={{ color: state === "full" ? "#171310aa" : "#4C7A4A" }}
        >
          <AvailabilityDot level={state} />
          {label}
        </div>
      </div>
    </div>
  );
}