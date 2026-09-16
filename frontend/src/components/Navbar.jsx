import { useState } from "react";
import { X, Menu } from "lucide-react";
import Button from "./ui/Button";

const LINKS = [
  { id: "landing", label: "Explore" },
  { id: "browse", label: "Spaces" },
  { id: "mybookings", label: "My Bookings" },
  { id: "host", label: "Host Dashboard" },
];

export default function Navbar({ view, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F1E7]/95 backdrop-blur border-b border-[#171310]/10">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("landing")}
          className="font-display text-[19px] font-medium tracking-tight text-[#171310]"
        >
          StudioSync
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => navigate(l.id)}
              className={`text-[13.5px] font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                view === l.id
                  ? "bg-[#171310]/[0.07] text-[#171310]"
                  : "text-[#171310]/65 hover:text-[#171310]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("login")}
            className="text-[13.5px] font-medium text-[#171310]/65 hover:text-[#171310]"
          >
            Log in
          </button>
          <Button size="sm" onClick={() => navigate("browse")}>
            Find a space
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#F7F1E7] border-t border-[#171310]/10 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  navigate(l.id);
                  setMobileOpen(false);
                }}
                className={`text-[14px] font-medium text-left py-2 px-1 rounded-md ${
                  view === l.id ? "text-[#171310]" : "text-[#171310]/65"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => {
              navigate("login");
              setMobileOpen(false);
            }}
            className="text-[14px] font-medium text-left py-2 px-1 text-[#171310]/65 w-full"
          >
            Log in
          </button>
          <Button
            size="sm"
            className="w-full mt-2"
            onClick={() => {
              navigate("browse");
              setMobileOpen(false);
            }}
          >
            Find a space
          </Button>
        </div>
      )}
    </header>
  );
}