import "react";

export default function AvailabilityDot({ level }) {
  const color = level === "full" ? "#B0453B" : level === "limited" ? "#C48A2E" : "#4C7A4A";
  return <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: color }} />;
}