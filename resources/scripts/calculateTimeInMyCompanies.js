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

  // Calculate total seconds
  const startOfEndDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const secondsDifference = Math.floor((end - startOfEndDay) / 1000);

  return `${years} years, ${months} months, ${days} days, and ${secondsDifference} seconds`;
}

function updateCounter() {
  const startDate = '2022-04-01'; // Starting date
  const endDate = new Date(); // Current date
  const counterElement = document.getElementById('myTimeInStone');

  if (counterElement) {
    counterElement.textContent = calculateDateDifference(startDate, endDate);
  }
}

// Update the counter every second
setInterval(updateCounter, 1000);

// Initialize immediately
updateCounter();
