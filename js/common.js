const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const nav = $(".nav"),
  bg = $(".burger"),
  lm = $("#lm");
bg.onclick = () => {
  nav.classList.toggle("open");
  bg.classList.toggle("open");
};
$$(".nav a").forEach(
  (a) =>
    (a.onclick = () => {
      nav.classList.remove("open");
      bg.classList.remove("open");
    }),
);

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.onclick = () => {
    window.location.href = "login.html";
  };
}

$(".x").onclick = () => lm.classList.remove("show");
lm.onclick = (e) => {
  if (e.target === lm) lm.classList.remove("show");
};
document.onkeydown = (e) => {
  if (e.key === "Escape") lm.classList.remove("show");
};
$$(".roles button").forEach(
  (b) =>
    (b.onclick = () => {
      $$(".roles button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      $("#rn").textContent = b.dataset.r;
    }),
);
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
$$(".reveal").forEach((r) => io.observe(r));
$$("[data-n]").forEach((el) => {
  const t = +el.dataset.n;
  let c = 0;
  const co = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    co.disconnect();
    const i = setInterval(() => {
      c += Math.ceil(t / 60);
      if (c >= t) {
        c = t;
        clearInterval(i);
      }
      el.textContent = c.toLocaleString();
    }, 25);
  });
  co.observe(el);
});
$$(".faq .q button").forEach(
  (b) => (b.onclick = () => b.parentElement.classList.toggle("open")),
);

const bar = document.createElement("div");
bar.id = "bar";
const tp = document.createElement("button");
tp.id = "top";
tp.textContent = "↑";
tp.setAttribute("aria-label", "Back to top");
document.body.append(bar, tp);
tp.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (scrollY / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  tp.classList.toggle("on", scrollY > 400);
});
