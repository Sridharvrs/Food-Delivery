let end = Date.now() + 6 * 3600e3;
setInterval(() => {
  let d = Math.max(0, end - Date.now());
  const p = (n) => String(n).padStart(2, "0");
  h.textContent = p(Math.floor(d / 36e5));
  m.textContent = p(Math.floor((d / 6e4) % 60));
  s.textContent = p(Math.floor((d / 1e3) % 60));
}, 1000);
document.querySelectorAll(".cp").forEach(
  (b) =>
    (b.onclick = () => {
      navigator.clipboard && navigator.clipboard.writeText(b.dataset.code);
      b.textContent = "Copied ✓";
      setTimeout(() => (b.textContent = "Copy code"), 1800);
    }),
);
