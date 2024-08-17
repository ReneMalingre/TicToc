function countdown() {
  // Target date and time
  const targetDate = new Date("2026-02-28T17:15:00");
  const adelaideTimeZone = "Australia/Adelaide";

  function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      document.getElementById("time").innerHTML = "Time's up!";
      clearInterval(interval);
      return;
    }

    // Time calculations for months, days, hours, minutes, and seconds
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

    // Display the result
    document.getElementById(
      "time"
    ).innerHTML = `${months} months, ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  // Update the countdown every second
  const interval = setInterval(updateCountdown, 1000);
}

countdown();
