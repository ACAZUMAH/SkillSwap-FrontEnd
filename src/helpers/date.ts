import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/**
 * Formats a date to a human-readable string.
 * @param {Date} date - The date to format.
 * @returns - The formatted date string.
 */
export const formatDate = (date: Date) => {
  return dayjs(new Date(date)).format("MMMM D, YYYY");
};

/**
 * Formats a time value.
 * Accepts:
 *  - "20:00" -> 8:00 PM
 *  - "08:05" -> 8:05 AM
 *  - "20:00:30" -> 8:00 PM (seconds ignored unless you change output format)
 *  - Date object or ISO string -> formatted directly
 */
export const formatTime = (time: string | Date) => {
  const outputFmt: string = "h:mm A";
  if (!time) return "";
  if (typeof time === "string") {
    const t = time.trim();
    const hhmm = /^(\d{2}):(\d{2})$/;
    const hhmmss = /^(\d{2}):(\d{2}):(\d{2})$/;

    if (hhmm.test(t)) {
      const d = dayjs(t, "HH:mm", true); // strict
      if (d.isValid()) return d.format(outputFmt);
    } else if (hhmmss.test(t)) {
      const d = dayjs(t, "HH:mm:ss", true);
      if (d.isValid()) return d.format(outputFmt);
    } else {
      // Manual fallback (handles e.g. "8:05")
      const parts = t.split(":");
      if (parts.length >= 2) {
        const h = Number(parts[0]);
        const m = Number(parts[1]);
        if (!isNaN(h) && !isNaN(m)) {
          return dayjs().hour(h).minute(m).second(0).format(outputFmt);
        }
      }
    }
  }
  const d = dayjs(time);
  return d.isValid() ? d.format(outputFmt) : "";
};

/**
 * Formats a date to a human-readable string for new chat dates.
 * It shows the year if it's more than a year ago, month and year if it's more than a month ago,
 * day and month if it's more than a day ago, or time if it's within the same day.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatSideBarChatDate = (date: Date): string => {
  const now = dayjs();
  const chatDate = dayjs(new Date(date));
  const diffInYears = now.diff(chatDate, "year");
  const diffInMonths = now.diff(chatDate, "month");
  const diffInDays = now.diff(chatDate, "day");
  const diffInHours = now.diff(chatDate, "hour");
  const diffInMinutes = now.diff(chatDate, "minute");
  const diffInSeconds = now.diff(chatDate, "second");

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} d${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} h${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} m${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} s${diffInSeconds > 1 ? "s" : ""} ago`;
  }
};

/**
 *
 * @param date
 * @returns
 */
export const formatMessageDate = (date: Date) => {
  const now = dayjs();
  const chatDate = dayjs(new Date(date));
  const diffInYears = now.diff(chatDate, "year");
  const diffInMonths = now.diff(chatDate, "month");
  const diffInDays = now.diff(chatDate, "day");
  const diffInHours = now.diff(chatDate, "hour");
  const diffInMinutes = now.diff(chatDate, "minute");

  if (diffInYears > 0) {
    return chatDate.format("YY"); // Shows: 23
  } else if (diffInMonths > 0 || diffInDays > 0) {
    return chatDate.format("DD/M/YY"); // Shows: 10/1/24
  } else if (diffInHours > 0) {
    return chatDate.format("h:mm A"); // Shows: 2:30 PM
  } else if (diffInMinutes > 0) {
    return chatDate.format("h:mm A"); // Shows: 2:30 PM
  } else {
    return "Just now";
  }
};
