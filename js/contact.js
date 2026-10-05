document.querySelector(".form").addEventListener("submit", () => {
  document.querySelector(".ok").textContent =
    "Thanks! We will reply within 2 hours.";
  document.querySelector(".form").reset();
});
