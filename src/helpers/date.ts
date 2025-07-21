import dayjs from "dayjs";

/**
 * Formats a date to a human-readable string.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date) => {
  return dayjs(new Date(date)).format("MMMM D, YYYY");
};
