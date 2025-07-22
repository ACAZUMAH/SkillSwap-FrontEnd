import dayjs from "dayjs";

/**
 * Formats a date to a human-readable string.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date) => {
  return dayjs(new Date(date)).format("MMMM D, YYYY");
};

/**
 * Formats a date to a human-readable string for new chat dates.
 * It shows the year if it's more than a year ago, month and year if it's more than a month ago,
 * day and month if it's more than a day ago, or time if it's within the same day.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatNewChatDate = (date: Date) => {
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
