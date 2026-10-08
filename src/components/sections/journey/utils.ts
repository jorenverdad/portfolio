/**
 * Calculates human-readable duration following LinkedIn's tenure conventions
 * (e.g. "4 mos", "1 yr 11 mos", "2 mos").
 *
 * @param startDate - ISO month string "YYYY-MM"
 * @param endDate - ISO month string "YYYY-MM" or "present" (defaults to "present")
 */
export function calculateDuration(startDate: string, endDate?: string): string {
  if (!startDate) return "";

  const [startYearStr, startMonthStr] = startDate.split("-");
  if (!startYearStr || !startMonthStr) return "";

  const startYear = parseInt(startYearStr, 10);
  const startMonth = parseInt(startMonthStr, 10);

  if (isNaN(startYear) || isNaN(startMonth)) return "";

  let endYear: number;
  let endMonth: number;

  if (!endDate || endDate.toLowerCase() === "present") {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1; // 1-indexed
  } else {
    const [endYearStr, endMonthStr] = endDate.split("-");
    if (!endYearStr || !endMonthStr) return "";

    endYear = parseInt(endYearStr, 10);
    endMonth = parseInt(endMonthStr, 10);
    if (isNaN(endYear) || isNaN(endMonth)) return "";
  }

  // Inclusive month calculation (LinkedIn convention)
  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "mo" : "mos"}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "yr" : "yrs"}`;
  }

  return `${years} ${years === 1 ? "yr" : "yrs"} ${remainingMonths} ${remainingMonths === 1 ? "mo" : "mos"}`;
}
