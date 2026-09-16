import { useEffect } from "react";
import { CircleCheck } from "lucide-react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#171717] text-white text-[13px] font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
      <CircleCheck size={16} className="text-[#7FB6FF]" />
      {message}
    </div>
  );
}
