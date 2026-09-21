import "react";
import { ArrowLeft, LogOut } from "lucide-react";

export default function HostHeader({ navigate, user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-[#181410] text-white border-b border-white/10">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[17px]">StudioSync</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            Host
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-[13px] font-medium text-white/70 hidden sm:inline">{user.name}</span>
          )}
          <button
            onClick={() => navigate("landing")}
            className="text-[13px] font-medium text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Exit to renter view
          </button>
          <button
            onClick={onLogout}
            className="text-white/50 hover:text-white p-1.5"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}