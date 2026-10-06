const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const nav = $(".nav");
const bg = $(".burger");
const lm = $("#lm");

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

if (nav && bg) {

  function toggleMenu() {
    const isOpen = nav.classList.toggle("open");

    bg.classList.toggle("open", isOpen);

    /* Lock / unlock the complete page */
    document.documentElement.classList.toggle("menu-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  function closeMenu() {
    nav.classList.remove("open");
    bg.classList.remove("open");

    document.documentElement.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
  }

  bg.addEventListener("click", toggleMenu);

  $$(".nav a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
}


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.onclick = () => {
    window.location.href = "login.html";
  };
}


/* =========================================================
   MODAL CLOSE
   ========================================================= */

if ($(".x") && lm) {

  $(".x").onclick = () => {
    lm.classList.remove("show");
  };

  lm.onclick = (e) => {
    if (e.target === lm) {
      lm.classList.remove("show");
    }
  };

}

document.onkeydown = (e) => {

  if (e.key === "Escape") {

    if (lm) {
      lm.classList.remove("show");
    }

    if (nav && bg) {
      nav.classList.remove("open");
      bg.classList.remove("open");

      document.documentElement.classList.remove("menu-open");
      document.body.classList.remove("menu-open");
    }

  }

};


/* =========================================================
   ROLE BUTTONS
   ========================================================= */

$$(".roles button").forEach((b) => {

  b.onclick = () => {

    $$(".roles button").forEach((x) => {
      x.classList.remove("on");
    });

    b.classList.add("on");

    const rn = $("#rn");

    if (rn) {
      rn.textContent = b.dataset.r;
    }

  };

});


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {

      if (e.isIntersecting) {

        e.target.classList.add("in");
        io.unobserve(e.target);

      }

    }),
  { threshold: 0.15 }
);

$$(".reveal").forEach((r) => io.observe(r));


/* =========================================================
   NUMBER COUNTERS
   ========================================================= */

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


/* =========================================================
   FAQ
   ========================================================= */

$$(".faq .q button").forEach(
  (b) =>
    (b.onclick = () =>
      b.parentElement.classList.toggle("open"))
);


/* =========================================================
   SCROLL PROGRESS + BACK TO TOP
   ========================================================= */

const bar = document.createElement("div");
bar.id = "bar";

const tp = document.createElement("button");
tp.id = "top";
tp.textContent = "↑";
tp.setAttribute("aria-label", "Back to top");

document.body.append(bar, tp);

tp.onclick = () =>
  scrollTo({
    top: 0,
    behavior: "smooth"
  });

addEventListener("scroll", () => {

  const h = document.documentElement;

  const maxScroll = h.scrollHeight - h.clientHeight;

  if (maxScroll > 0) {
    bar.style.width =
      (scrollY / maxScroll) * 100 + "%";
  }

  tp.classList.toggle("on", scrollY > 400);

});