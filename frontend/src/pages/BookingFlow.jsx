import React, { useEffect, useState } from "react";
import { Check, ChevronRight, ChevronLeft, Loader2, CircleCheck } from "lucide-react";
import { RESOURCES } from "../data/mockData";
import { addHour } from "../utils/helpers";
import Button from "../components/ui/Button";
import BookingSummary from "../components/BookingSummary";

export default function BookingFlow({ draft, navigate, onConfirm }) {
  const r = draft?.resource || RESOURCES[4];
  const slot = draft?.slot;
  const fullDay = draft?.fullDay;
  const [step, setStep] = useState(3);
  const [people, setPeople] = useState(2);
  const [note, setNote] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const timeLabel = fullDay ? "Full day" : slot ? `${slot.time} – ${addHour(slot.time)}` : "—";
  const duration = fullDay ? "Full day" : "1 hour";
  const price = fullDay ? r.pricePerDay : r.pricePerHour;

  const steps = ["Space", "Time", "Details", "Confirm"];

  useEffect(() => {
    if (step === 4 && !verified && !verifying) {
      setVerifying(true);
      const t = setTimeout(() => {
        setVerifying(false);
        setVerified(true);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [step, verified, verifying]);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      const booking = {
        id: `SS-${Math.floor(40000 + Math.random() * 9000)}`,
        resourceName: r.name,
        location: r.location,
        date: "September 14, 2026",
        time: timeLabel,
        duration,
        total: price,
        status: "confirmed",
      };
      onConfirm(booking);
      setConfirming(false);
      navigate("confirmation", booking);
    }, 900);
  };

  return (
    <div className="max-w-[760px] mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                  i + 1 <= step ? "bg-[#9C4526] text-white" : "bg-[#171310]/10 text-[#171310]/50"
                }`}
              >
                {i + 1 < step ? <Check size={12} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[13px] font-medium ${
                  i + 1 <= step ? "text-[#171310]" : "text-[#171310]/40"
                }`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-[#171310]/10" />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white/60 border border-[#171310]/10 rounded-2xl p-6 sm:p-8">
        {step === 3 && (
          <div>
            <h2 className="font-display text-[20px] text-[#171310] mb-5">Your details</h2>
            <BookingSummary r={r} timeLabel={timeLabel} duration={duration} price={price} />
            <div className="mt-6">
              <label className="text-[13px] font-medium text-[#171310] block mb-1.5">
                Number of people
              </label>
              <input
                type="number"
                min={1}
                max={r.capacity}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full sm:w-40 border border-[#171310]/20 rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#9C4526]"
              />
              <label className="text-[13px] font-medium text-[#171310] block mt-4 mb-1.5">
                Note for the host (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Anything the host should know"
                className="w-full border border-[#171310]/20 rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#9C4526] resize-none"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setStep(4)}>
                Continue <ChevronRight size={15} />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-[20px] text-[#171310] mb-5">Confirm booking</h2>
            <BookingSummary r={r} timeLabel={timeLabel} duration={duration} price={price} people={people} />

            <div className="mt-5 flex items-center gap-2 text-[12.5px]">
              {verifying ? (
                <span className="flex items-center gap-1.5 text-[#171310]/55">
                  <Loader2 size={13} className="animate-spin" /> Checking availability…
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#4C7A4A] font-medium">
                  <CircleCheck size={13} /> Availability verified just now
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-7 pt-5 border-t border-[#171310]/10">
              <button
                onClick={() => setStep(3)}
                className="text-[13.5px] font-medium text-[#171310]/60 hover:text-[#171310] flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Back
              </button>
              <Button disabled={verifying || confirming} onClick={handleConfirm}>
                {confirming ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Confirming…
                  </>
                ) : (
                  "Confirm booking"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}