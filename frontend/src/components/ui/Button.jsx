import "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const sizes = {
    sm: "text-[13px] px-3.5 py-1.5 rounded-full",
    md: "text-[14px] px-5 py-2.5 rounded-full",
    lg: "text-[15px] px-7 py-3.5 rounded-full",
  };
  const variants = {
    primary: "bg-[#9C4526] text-white hover:bg-[#7E361C] focus-visible:outline-[#9C4526]",
    secondary:
      "bg-transparent text-[#171310] border border-[#171310]/25 hover:border-[#171310] focus-visible:outline-[#171310]",
    ghost: "text-[#171310] hover:bg-black/[0.04] focus-visible:outline-[#171310]",
    dark: "bg-[#171310] text-white hover:bg-black focus-visible:outline-[#171310]",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}