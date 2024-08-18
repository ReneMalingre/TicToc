// Extend Day.js with the necessary plugins
dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);
dayjs.extend(dayjs_plugin_isSameOrAfter);

function countdown() {
  // Contract start date: 9:00 am, 29th February 2024 in Adelaide, South Australia
  const contractStartDate = dayjs.tz("2024-02-29 09:00", "Australia/Adelaide");

  // Contract end date: 5:15 pm, 28th February 2026 in Adelaide, South Australia
  const endDate = dayjs.tz("2026-02-28 17:15", "Australia/Adelaide");

  function updateCountdown() {
    // Get current time in Adelaide
    const now = dayjs.tz(dayjs(), "Australia/Adelaide");

    if (now.isSameOrAfter(endDate)) {
      document.getElementById("time").innerHTML = "Time's up!";
      document.getElementById("percentage").innerHTML = "100% through!";
      clearInterval(interval);
      return;
    }

    // Calculate the remaining time
    const years = endDate.diff(now, "year");
    const months = endDate.diff(now.add(years, "year"), "month");
    const days = endDate.diff(
      now.add(years, "year").add(months, "month"),
      "day"
    );

    // Calculate the number of full weeks and remaining days
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    const hours = endDate.diff(
      now.add(years, "year").add(months, "month").add(days, "day"),
      "hour"
    );
    const minutes = endDate.diff(
      now
        .add(years, "year")
        .add(months, "month")
        .add(days, "day")
        .add(hours, "hour"),
      "minute"
    );
    const seconds = endDate.diff(
      now
        .add(years, "year")
        .add(months, "month")
        .add(days, "day")
        .add(hours, "hour")
        .add(minutes, "minute"),
      "second"
    );

    // Calculate the percentage of the contract elapsed
    const totalContractTime = endDate.diff(contractStartDate);
    const elapsedTime = now.diff(contractStartDate);
    const percentageElapsed = (elapsedTime / totalContractTime) * 100;

    // Display the countdown with singular/plural terms
    let innerHTML = "";
    if (years > 0) innerHTML += `${years} year${years > 1 ? "s" : ""}, `;
    if (months > 0) innerHTML += `${months} month${months > 1 ? "s" : ""}, `;
    if (weeks > 0) innerHTML += `${weeks} week${weeks > 1 ? "s" : ""}, `;
    if (remainingDays > 0)
      innerHTML += `${remainingDays} day${remainingDays > 1 ? "s" : ""}, `;
    if (hours > 0) innerHTML += `${hours} hour${hours > 1 ? "s" : ""}, `;
    if (minutes > 0)
      innerHTML += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
    innerHTML += `${seconds} second${seconds > 1 ? "s" : ""}`;

    document.getElementById("time").innerHTML = innerHTML;

    // Display the percentage through the contract
    document.getElementById(
      "percentage"
    ).innerHTML = `Through: ${percentageElapsed.toFixed(2)}%`;
  }

  // Update the countdown every second
  const interval = setInterval(updateCountdown, 1000);
}

countdown();
