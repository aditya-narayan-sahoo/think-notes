/**
 * Format a date string as a string in the format "Month DD, YYYY", where:
 * - Month is the full month name (e.g. "January")
 * - DD is the day of the month as a zero-padded two-digit number (e.g. "01")
 * - YYYY is the four-digit year (e.g. "2022")
 *
 * @param {string} date The date string to format
 * @returns {string} The formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
