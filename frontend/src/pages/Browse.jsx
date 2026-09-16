import { useEffect, useMemo, useState } from "react";
import { MapPin, Calendar, Clock, Building2 } from "lucide-react";
import { RESOURCES, FILTER_OPTIONS } from "../data/mockData";
import QuickField from "../components/ui/QuickField";
import FilterChip from "../components/ui/FilterChip";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import WorkspaceCard from "../components/WorkspaceCard";

export default function Browse({ navigate }) {
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("Recommended");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [filters, sort]);

  const toggleFilter = (f) =>
    setFilters((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const results = useMemo(() => {
    let list = RESOURCES.filter((r) => {
      if (!filters.length) return true;
      return filters.every(
        (f) => r.amenities.includes(f) || (f === "Meeting Room" && r.type === "Meeting room")
      );
    });
    if (sort === "Price") list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sort === "Capacity") list = [...list].sort((a, b) => b.capacity - a.capacity);
    if (sort === "Availability")
      list = [...list].sort((a, b) => b.total - b.booked - (a.total - a.booked));
    return list;
  }, [filters, sort]);

  return (
    <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-display text-[30px] sm:text-[36px] text-[#171310]">Find your space.</h1>
      <p className="text-[14px] text-[#171310]/55 mt-2">
        Filter by what you need, then check who's got room today.
      </p>

      {/* Quick filters */}
      <div className="mt-6 bg-white/60 border border-[#171310]/10 rounded-2xl p-3 flex flex-col sm:flex-row sm:divide-x sm:divide-[#171310]/10 gap-2 sm:gap-0">
        <QuickField icon={MapPin} label="Location" value="Metro Manila" />
        <QuickField icon={Calendar} label="Date" value="Today" />
        <QuickField icon={Clock} label="Time" value="Any time" />
        <QuickField icon={Building2} label="Duration" value="2 hours" />
      </div>

      {/* Filters and sorting */}
      <div className="flex items-center justify-between gap-4 mt-6 flex-wrap">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
          {FILTER_OPTIONS.map((f) => (
            <FilterChip key={f} label={f} active={filters.includes(f)} onClick={() => toggleFilter(f)} />
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[13px] text-[#171310]/55">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-[13px] font-medium text-[#171310] bg-white border border-[#171310]/15 rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#9C4526]"
          >
            {["Recommended", "Price", "Capacity", "Availability"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <Skeleton className="h-3 w-1/3 mt-3" />
                <Skeleton className="h-4 w-2/3 mt-2" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        ) : results.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {results.map((r) => (
              <WorkspaceCard key={r.id} r={r} onView={(res) => navigate("details", res)} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No spaces found"
            body="No workspaces match this combination of filters. Try clearing a few."
            action={
              <Button size="sm" variant="secondary" onClick={() => setFilters([])}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}