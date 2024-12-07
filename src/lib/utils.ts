import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function HandlingDate(from: Date) {
  const myFrom = new Date(from);
  const currentDate = new Date();
  if (currentDate.getTime() - myFrom?.getTime() < 24 * 60 * 60 * 1000) {
      return formatDistanceToNowStrict(myFrom, { addSuffix: true })
  } else {
      if (currentDate.getFullYear() === myFrom.getFullYear()) {
          return formatDate(myFrom, "MMM d")
      } else {
          return formatDate(myFrom, "MMM d, yyy")
      }
  }
}