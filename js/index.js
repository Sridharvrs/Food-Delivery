// Home: subtle parallax on the hero picture
const hi = document.querySelector(".himg");
addEventListener("scroll", () => {
  hi.style.transform = `translateY(${Math.min(scrollY * 0.08, 30)}px)`;
});
