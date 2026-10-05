document.querySelectorAll(".tabs button").forEach(
  (b) =>
    (b.onclick = () => {
      document
        .querySelectorAll(".tabs button")
        .forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      document
        .querySelectorAll("[data-c]")
        .forEach((c) =>
          c.classList.toggle(
            "hide",
            b.dataset.f !== "all" && c.dataset.c !== b.dataset.f,
          ),
        );
    }),
);
