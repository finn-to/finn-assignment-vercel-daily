import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatDate(dateStr: string): string {
  const [year, monthStr, dayStr] = dateStr.slice(0, 10).split("-");
  const month = MONTHS[parseInt(monthStr, 10) - 1] ?? monthStr;
  return `${month} ${parseInt(dayStr, 10)}, ${year}`;
}
