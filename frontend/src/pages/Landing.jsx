import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Search, ArrowRight, Check } from "lucide-react";
import { RESOURCES, TIME_SLOTS, FILTER_OPTIONS, HERO_IMAGE } from "../data/mockData";
import { availabilityState, addHour } from "../utils/helpers";
import Button from "../components/ui/Button";
import FilterChip from "../components/ui/FilterChip";
import AvailabilityDot from "../components/ui/AvailabilityDot";
import EmptyState from "../components/ui/EmptyState";
import StatusBadge from "../components/ui/StatusBadge";
import WorkspaceCard from "../components/WorkspaceCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroField({ icon: Icon, label, value }) {
  return (
    <div className="flex-1 px-4 py-2.5">
      <p className="text-[10.5px] font-medium tracking-wide text-[#9C4526] uppercase">{label}</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <Icon size={14} className="text-[#171310]/50" />
        <span className="text-[13.5px] text-[#171310] font-medium">{value}</span>
      </div>
    </div>
  );
}

export default function Landing({ navigate, notify }) {
  const [activeFilters, setActiveFilters] = useState(["Fiber"]);
  const filteredExamples = useMemo(
    () =>
      RESOURCES.filter((r) =>
        activeFilters.length ? activeFilters.every((f) => r.amenities.includes(f)) : true
      ).slice(0, 3),
    [activeFilters]
  );

  const toggleFilter = (f) =>
    setActiveFilters((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const steps = [
    { title: "Browse live availability", body: "See real openings before you commit to anything." },
    { title: "Book by the hour, or the full day", body: "Pay for exactly the time you need." },
    { title: "Show up — your space is ready", body: "No check-in desk, no waiting around." },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[560px] sm:h-[640px] overflow-hidden">
          <img src={HERO_IMAGE} alt="A sunlit loft workspace" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

          <div className="absolute inset-0 max-w-[1180px] mx-auto px-5 sm:px-8 flex flex-col justify-end pb-24 sm:pb-28">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="text-[12px] font-medium tracking-wide text-white/70 uppercase"
            >
              Workspaces across Metro Manila
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="font-display text-[40px] sm:text-[60px] leading-[1.05] text-white mt-3 max-w-[640px]"
            >
              A good place to get things done.
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="text-[15.5px] sm:text-[16.5px] text-white/85 mt-4 max-w-[420px] leading-relaxed"
            >
              Desks, studios, and meeting rooms you can book by the hour or the day.
            </motion.p>
          </div>
        </div>

        {/* Search bar, overlapping the photo */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="max-w-[1180px] mx-auto px-5 sm:px-8 -mt-12 sm:-mt-14 relative z-10"
        >
          <div className="bg-[#FBF8F2] rounded-2xl shadow-[0_16px_40px_rgba(23,19,16,0.16)] p-2 flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-[#171310]/10">
            <HeroField icon={MapPin} label="Where" value="Makati, Metro Manila" />
            <HeroField icon={Calendar} label="When" value="Today" />
            <HeroField icon={Clock} label="Time" value="2 hours" />
            <div className="p-1.5 sm:pl-3">
              <Button className="w-full sm:w-auto" onClick={() => navigate("browse")}>
                <Search size={15} /> Search
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-20 pb-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">
              Available today
            </p>
            <h2 className="font-display text-[28px] sm:text-[34px] text-[#171310] mt-1.5">
              Rooms worth leaving home for.
            </h2>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate("browse")}>
            See all spaces <ArrowRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {RESOURCES.slice(0, 3).map((r) => (
            <WorkspaceCard key={r.id} r={r} onView={(res) => navigate("details", res)} />
          ))}
        </div>
      </section>

      {/* LIVE AVAILABILITY */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 border-t border-[#171310]/10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">
              Live availability
            </p>
            <h2 className="font-display text-[28px] sm:text-[32px] text-[#171310] mt-1.5 max-w-[380px]">
              See what's open before you book.
            </h2>
            <p className="text-[14px] text-[#171310]/60 mt-3 max-w-[380px] leading-relaxed">
              Every slot reflects real capacity from the booking system — never a guess.
            </p>
          </div>
          <div className="bg-white/70 border border-[#171310]/10 rounded-2xl p-5">
            <p className="font-display text-[16px] text-[#171310] mb-0.5">Creative Room A</p>
            <p className="text-[12.5px] text-[#171310]/55 mb-4">Today</p>
            <div className="space-y-2">
              {TIME_SLOTS.slice(0, 4).map((s) => {
                const state = availabilityState(s.booked, s.total);
                const left = s.total - s.booked;
                return (
                  <div
                    key={s.time}
                    className="flex items-center justify-between border border-[#171310]/10 rounded-lg px-3.5 py-2.5"
                  >
                    <span className="text-[13.5px] text-[#171310] font-medium">
                      {s.time} — {addHour(s.time)}
                    </span>
                    <span
                      className="text-[13px] font-medium flex items-center gap-1.5"
                      style={{ color: state === "full" ? "#171310aa" : "#171310" }}
                    >
                      <AvailabilityDot level={state} />
                      {state === "full" ? "Fully booked" : `${left} / ${s.total} available`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 border-t border-[#171310]/10">
        <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">Filters</p>
        <h2 className="font-display text-[28px] sm:text-[32px] text-[#171310] mt-1.5 mb-6">
          Filter for what you actually need.
        </h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_OPTIONS.map((f) => (
            <FilterChip key={f} label={f} active={activeFilters.includes(f)} onClick={() => toggleFilter(f)} />
          ))}
        </div>
        {filteredExamples.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredExamples.map((r) => (
              <WorkspaceCard key={r.id} r={r} onView={(res) => navigate("details", res)} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No spaces match those filters"
            body="Try removing a filter to see more available spaces."
            action={
              <Button size="sm" variant="secondary" onClick={() => setActiveFilters([])}>
                Clear filters
              </Button>
            }
          />
        )}
      </section>

      {/* BOOKING LIFECYCLE */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 border-t border-[#171310]/10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11.5px] font-medium tracking-wide text-[#9C4526] uppercase">
              Booking status
            </p>
            <h2 className="font-display text-[26px] sm:text-[30px] text-[#171310] mt-1.5 max-w-[400px]">
              You'll always know where a booking stands.
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status="pending" />
            <ArrowRight size={16} className="text-[#171310]/30" />
            <StatusBadge status="confirmed" />
            <ArrowRight size={16} className="text-[#171310]/30" />
            <StatusBadge status="cancelled" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — dark panel */}
      <section className="bg-[#181410] text-white">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-20 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[11.5px] font-medium tracking-wide text-white/50 uppercase">
              How it works
            </p>
            <h2 className="font-display text-[30px] sm:text-[36px] leading-[1.15] mt-2 max-w-[360px]">
              Pick a room. Choose a time. Show up.
            </h2>
          </div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-5"
          >
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                custom={i}
                variants={fadeUp}
                className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#B65A38] text-white text-[12px] font-medium flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium">{s.title}</p>
                    <p className="text-[13.5px] text-white/55 mt-1">{s.body}</p>
                  </div>
                </div>
                <Check size={16} className="text-white/40 shrink-0 mt-1" />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1180px] mx-auto px-5 sm:px-8 py-24 text-center">
        <h2 className="font-display text-[30px] sm:text-[38px] text-[#171310] max-w-[520px] mx-auto leading-tight">
          Book a room, and get back to work.
        </h2>
        <Button size="lg" className="mt-8" onClick={() => navigate("browse")}>
          Explore spaces <ArrowRight size={16} />
        </Button>
      </section>
    </div>
  );
}