const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser?.name) {
  // Dynamic name
  document.querySelectorAll(".profileName").forEach(element => {
    element.textContent = currentUser.name;
  });

  // First letter for avatar
  const firstLetter = currentUser.name.trim().charAt(0).toUpperCase();

  document.querySelectorAll(".avatar").forEach(element => {
    element.textContent = firstLetter;
  });
}

// ==================================================================================
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sb = $("#sb"),
  ov = $("#ov"),
  ts = $("#ts");
const toast = (m) => {
  ts.textContent = m;
  ts.classList.add("on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => ts.classList.remove("on"), 2200);
};
const side = (v) => {
  sb.classList.toggle("open", v);
  ov.classList.toggle("on", v);
};
$("#tg").onclick = () => side(!sb.classList.contains("open"));
ov.onclick = () => side(false);
const count = (el) => {
  const t = +el.dataset.n,
    p = el.textContent.replace(/[0-9,]/g, "");
  let c = 0;
  clearInterval(el.i);
  el.i = setInterval(() => {
    c += Math.ceil(t / 40);
    if (c >= t) {
      c = t;
      clearInterval(el.i);
    }
    el.textContent = p + c.toLocaleString("en-IN");
  }, 28);
};
const show = (id) => {
  $$(".mod").forEach((m) => m.classList.toggle("on", m.id === id));
  $$(".sb nav button").forEach((b) =>
    b.classList.toggle("on", b.dataset.m === id),
  );
  const b = $(`.sb nav button[data-m="${id}"]`);
  $("#ttl").textContent = b.querySelector("span").textContent;
  scrollTo({ top: 0 });
  side(false);
  history.replaceState(null, "", "#" + id);
  $$("#" + id + " [data-n]").forEach(count);
};
$$(".sb nav button").forEach((b) => (b.onclick = () => show(b.dataset.m)));
$$("[data-go]").forEach((b) => (b.onclick = () => show(b.dataset.go)));
$$(".lo").forEach(
  (b) =>
    (b.onclick = () => {
      side(false);
      $("#dlg").classList.add("on");
    }),
);
$("#no").onclick = () => $("#dlg").classList.remove("on");
$("#yes").onclick = () => (location.href = "login.html");
const h = location.hash.slice(1);
show(
  h && $("#" + h) && $("#" + h).classList.contains("mod") ? h : $(".mod").id,
);
$$(".chips").forEach((c) =>
  $$("button", c).forEach((b) =>
    b.addEventListener("click", () => {
      $$("button", c).forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
    }),
  ),
);
$$("form").forEach((f) =>
  f.addEventListener("submit", (e) => e.preventDefault()),
);

const cart = {};
const money = (n) => "₹" + n.toLocaleString("en-IN");
let off = 0;
const draw = () => {
  const k = Object.keys(cart);
  let s = 0;
  $("#cl").innerHTML = k.length
    ? k
        .map((n) => {
          s += cart[n].p * cart[n].q;
          return `<li>${n} x${cart[n].q} — ${money(cart[n].p * cart[n].q)} <button class="b2 rm" data-n="${n}">✕</button></li>`;
        })
        .join("")
    : "<li>Cart is empty. Add a dish!</li>";
  const d = k.length && s < 299 ? 30 : 0,
    di = Math.min(Math.round(s * off), 100);
  $("#sub").textContent = money(s);
  $("#dl").textContent = money(d);
  $("#di").textContent = "-" + money(di);
  $("#tot").textContent = money(s + d - di);
  $$(".rm").forEach(
    (b) =>
      (b.onclick = () => {
        delete cart[b.dataset.n];
        draw();
      }),
  );
};
$$(".add").forEach(
  (b) =>
    (b.onclick = () => {
      const n = b.dataset.n;
      cart[n] = cart[n] || { p: +b.dataset.p, q: 0 };
      cart[n].q++;
      draw();
      toast(n + " added to cart");
    }),
);
$("#ap").onclick = () => {
  if ($("#cp").value.trim().toUpperCase() === "FOOD20") {
    off = 0.2;
    toast("Coupon applied: 20% off");
  } else {
    off = 0;
    toast("Invalid coupon");
  }
  draw();
};
$("#ck").onclick = () =>
  Object.keys(cart).length
    ? (toast("Order placed! 🎉"),
      Object.keys(cart).forEach((k) => delete cart[k]),
      draw())
    : toast("Add something first");
const flt = () => {
  const f = $("#cat .on").dataset.f,
    q = $("#q").value.toLowerCase();
  $$("#browse .rc[data-c]").forEach((c) =>
    c.classList.toggle(
      "hide",
      !((f === "all" || c.dataset.c === f) && c.dataset.name.includes(q)),
    ),
  );
};
$$("#cat button").forEach((b) => (b.onclick = flt));
$("#q").oninput = flt;
$$("#ot button").forEach((b) =>
  b.addEventListener("click", () => {
    const f = b.dataset.f;
    $$("#ot1 tbody tr").forEach(
      (r) =>
        (r.style.display =
          f === "all" ||
          (f === "active") === r.textContent.includes("On the way")
            ? ""
            : "none"),
    );
  }),
);
$$(".re").forEach(
  (b) =>
    (b.onclick = () => {
      toast("Items added to your cart");
    }),
);
let step = 1;
const st = $$("#steps li"),
  paint = () => {
    st.forEach((l, i) => {
      l.className = i < step ? "done" : i === step ? "cur" : "";
    });
    $("#pg").style.width = (step / 3) * 100 + "%";
    $("#eta").innerHTML =
      step >= 3
        ? "<strong>Delivered!</strong> Enjoy 🎉"
        : "<strong>ETA:</strong> " + (30 - step * 8) + " minutes";
  };
paint();
$("#sim").onclick = () => {
  step = Math.min(3, step + 1);
  paint();
  toast(step == 3 ? "Order delivered" : "Status updated");
};
setInterval(() => {
  if (step < 3) {
    step++;
    paint();
  }
}, 9000);
$$(".stars span").forEach(
  (s, i, a) =>
    (s.onclick = () => a.forEach((x, j) => x.classList.toggle("on", j <= i))),
);
$("#rv").onclick = () => toast("Thanks for your review ⭐");
$$(".heart").forEach((h) => (h.onclick = () => h.classList.toggle("on")));
let bal = 850;
$$("#am button").forEach(
  (b) =>
    (b.onclick = () => {
      bal += +b.dataset.a;
      $("#bal").textContent = money(bal);
      $("#tx tbody").insertAdjacentHTML(
        "afterbegin",
        `<tr><td>Today</td><td>Added to wallet</td><td>+${money(+b.dataset.a)}</td><td><span class="bd g">Credit</span></td></tr>`,
      );
      toast("Wallet updated");
    }),
);
$$(".cc").forEach(
  (b) =>
    (b.onclick = () => {
      navigator.clipboard && navigator.clipboard.writeText(b.dataset.c);
      toast(b.dataset.c + " copied");
    }),
);
$$(".ad").forEach(
  (a) =>
    (a.onclick = () => {
      $$(".ad").forEach((x) => x.classList.remove("on"));
      a.classList.add("on");
      toast("Default address changed");
    }),
);
$("#pf").onsubmit = () => toast("Profile saved ✓");
$("#pw").onsubmit = () => toast("Password updated 🔒");
