import { useState } from "react";
import { X, Menu, LogOut } from "lucide-react";

export default function Navbar({ view, navigate, user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: "landing", label: "Explore" },
    { id: "browse", label: "Spaces" },
    ...(user ? [{ id: "mybookings", label: "My Bookings" }] : []),
    ...(user?.role === "host" ? [{ id: "host", label: "Host Dashboard" }] : []),
  ];

  const handleNavClick = (id) => {
    if (id === "mybookings" && !user) {
      navigate("login");
      return;
    }
    navigate(id);
  };

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
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNavClick(l.id)}
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

        <div className="hidden md:flex items-center">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-[#171310]/10">
              <span className="text-[13.5px] font-medium text-[#171310]/80">{user.name}</span>
              <button
                onClick={onLogout}
                className="text-[12.5px] font-medium text-[#171310]/50 hover:text-[#B0453B] transition-colors flex items-center gap-1"
              >
                <LogOut size={13} /> Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("login")}
              className="text-[13.5px] font-medium text-[#171310]/65 hover:text-[#171310]"
            >
              Log in
            </button>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#F7F1E7] border-t border-[#171310]/10 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  handleNavClick(l.id);
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

          <div className="mt-3 pt-3 border-t border-[#171310]/10">
            {user ? (
              <div className="flex items-center justify-between px-1">
                <span className="text-[14px] font-medium text-[#171310]/80">{user.name}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileOpen(false);
                  }}
                  className="text-[13px] font-medium text-[#171310]/50 flex items-center gap-1.5"
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("login");
                  setMobileOpen(false);
                }}
                className="text-[14px] font-medium text-left py-2 px-1 text-[#171310]/65 w-full"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}