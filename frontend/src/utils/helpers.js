export function availabilityState(booked, total) {
  const left = total - booked;
  if (left <= 0) return "full";
  if (left / total <= 0.3) return "limited";
  return "available";
}

export function fmtPeso(n) {
  return `₱${n.toLocaleString("en-PH")}`;
}

export function addHour(t) {
  const [time, mer] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  h += 1;
  let outMer = mer;
  if (h === 12) outMer = mer === "AM" ? "PM" : "AM";
  if (h > 12) h -= 12;
  return `${h}:${String(m).padStart(2, "0")} ${outMer}`;
}

// 4.80 -> "4.8", 5.00 -> "5"
export function fmtRating(n) {
  return n % 1 === 0 ? String(n) : String(n).replace(/0$/, "").replace(/\.$/, "");
}