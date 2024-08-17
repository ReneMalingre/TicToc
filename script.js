function countdown() {
  // Contract start and end dates
  const startDate = new Date("2024-02-29T00:00:00");
  const endDate = new Date("2026-02-28T17:15:00");
  const adelaideTimeZone = "Australia/Adelaide";

  function updateCountdown() {
    const now = new Date();

    // Time calculations for countdown
    const timeDifference = endDate - now;
    if (timeDifference <= 0) {
      document.getElementById("time").innerHTML = "Time's up!";
      document.getElementById("percentage").innerHTML = "100% through!";
      clearInterval(interval);
      return;
    }

    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
    );
    const days = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Calculate the percentage of the contract elapsed
    const totalContractTime = endDate - startDate;
    const elapsedTime = now - startDate;
    const percentageElapsed = (elapsedTime / totalContractTime) * 100;

    // Display the countdown
    let innerHTML = "";
    if (months > 0) {
      innerHTML += `${months} mths, `;
    }
    if (weeks > 0) {
      innerHTML += `${weeks} wks, `;
    }

    innerHTML += `${days} days, ${hours} hours, ${minutes} min, ${seconds} sec`;

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
