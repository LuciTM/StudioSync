import "react";

export default function Skeleton({ className }) {
  return <div className={`bg-[#E9E7E1] rounded-md animate-pulse ${className}`} />;
}
