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

// ====================================================================================

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

const mv = (card, from, to) => {
  const t = $("#k" + to);
  const b = card.querySelector(".nx");
  if (to === 2) b.textContent = "Mark ready";
  else b.textContent = "Hand to rider";
  t.appendChild(card);
  cnt();
};
const cnt = () =>
  [1, 2, 3].forEach(
    (i) => ($("#c" + i).textContent = $("#k" + i).children.length),
  );
const wire = (card) => {
  const nx = card.querySelector(".nx"),
    rj = card.querySelector(".rj");
  nx.onclick = () => {
    const k = +card.parentElement.id.slice(1);
    if (k === 3) {
      card.remove();
      cnt();
      toast("Order handed to rider 🛵");
    } else {
      mv(card, k, k + 1);
      toast(k === 1 ? "Order accepted" : "Order is ready");
    }
  };
  rj.onclick = () => {
    card.remove();
    cnt();
    toast("Order rejected");
  };
};
$$(".oc").forEach(wire);
$("#op").onchange = (e) => {
  $("#os").textContent = e.target.checked
    ? "Open for orders"
    : "Closed (not taking orders)";
  $(".open").classList.toggle("off", !e.target.checked);
  toast(e.target.checked ? "Restaurant is open" : "Restaurant is closed");
};
$("#af").onsubmit = () => {
  const n = $("#dn").value,
    p = $("#dp").value,
    c = $("#dc").value;
  $("#mt tbody").insertAdjacentHTML(
    "beforeend",
    `<tr><td>${n}</td><td>${c}</td><td>₹${p}</td><td><label class="sw"><input type="checkbox" checked><i></i></label></td></tr>`,
  );
  $("#af").reset();
  toast(n + " added to menu ✓");
};
$("#mt").addEventListener("change", (e) => {
  const r = e.target.closest("tr");
  toast(
    r.cells[0].textContent +
      (e.target.checked ? " is available" : " marked sold out"),
  );
});
$$(".rp").forEach(
  (b) => (b.onclick = () => b.nextElementSibling.classList.toggle("on")),
);
$$(".sd").forEach(
  (b) =>
    (b.onclick = () => {
      b.parentElement.classList.remove("on");
      b.previousElementSibling.value = "";
      toast("Reply sent ✓");
    }),
);
$("#sf").onsubmit = () => toast("Profile saved ✓");
$("#cf").onsubmit = () => {
  $("#cl").insertAdjacentHTML(
    "beforeend",
    `<li>${$("#cc").value.toUpperCase()} — ${$("#cd").value}% off</li>`,
  );
  $("#cf").reset();
  toast("Coupon created 🎟️");
};
