// About: timeline items highlight on hover
document.querySelectorAll(".tl div").forEach((d) => {
  d.onmouseenter = () => (d.style.transform = "translateX(10px)");
  d.onmouseleave = () => (d.style.transform = "");
});
