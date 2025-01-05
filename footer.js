// Dynamically set the current year in the footer
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  });
  