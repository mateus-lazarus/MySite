function calculateDateDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0); // Last day of the previous month
      days += lastMonth.getDate(); // Add days in the previous month
  }

  if (months < 0) {
      years--;
      months += 12;
  }

  return `${years} years, ${months} months, and ${days} days`;
}

export function calculateTimeInStoneCompany() {
  const startDate = '2022-04-01'; // YYYY-MM-DD format
  const endDate = new Date(); // Current date
  return calculateDateDifference(startDate, endDate);
}
