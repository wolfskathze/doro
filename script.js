const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === target);
    });
  });
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});
