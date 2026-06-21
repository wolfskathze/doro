const menuButton = document.querySelector("[data-menu-toggle]");
const siteMenu = document.querySelector("[data-site-menu]");
const searchButton = document.querySelector("[data-search-toggle]");
const searchPanel = document.querySelector("[data-search-form]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const searchDataElement = document.getElementById("search-data");
const searchItems = searchDataElement ? JSON.parse(searchDataElement.textContent || "[]") : [];

searchButton?.addEventListener("click", () => {
  const isOpen = searchButton.getAttribute("aria-expanded") === "true";
  searchButton.setAttribute("aria-expanded", String(!isOpen));
  if (searchPanel) searchPanel.hidden = isOpen;
  if (!isOpen) searchInput?.focus();
});

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  if (siteMenu) siteMenu.hidden = isOpen;
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (!target.closest(".site-header") && siteMenu && menuButton) {
    siteMenu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (!target.closest(".search-shell") && searchPanel && searchButton) {
    searchPanel.hidden = true;
    searchButton.setAttribute("aria-expanded", "false");
    if (searchResults) searchResults.hidden = true;
  }
});

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query || !searchResults) {
    if (searchResults) searchResults.hidden = true;
    return;
  }

  const matches = searchItems
    .filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(query))
    .slice(0, 5);

  searchResults.innerHTML = matches.length
    ? matches
        .map(
          (item) => `
            <a href="${item.href}">
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </a>
          `,
        )
        .join("")
    : '<p class="empty-search">Keine Treffer</p>';
  searchResults.hidden = false;
});

document.querySelector("[data-search-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstResult = searchResults?.querySelector("a");
  if (firstResult instanceof HTMLAnchorElement) firstResult.click();
});
