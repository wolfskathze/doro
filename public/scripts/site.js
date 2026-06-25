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

(() => {
  const overlay = document.querySelector(".egg-overlay");
  const cursor = document.querySelector("[data-egg-cursor]");
  const eggFrame = document.querySelector("[data-egg-frame]");
  const artist = document.querySelector("[data-egg-artist]");

  if (!(overlay instanceof HTMLElement) || !(cursor instanceof HTMLElement) || !(eggFrame instanceof HTMLImageElement) || !(artist instanceof HTMLElement)) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) {
    return;
  }

  document.body.classList.add("has-egg-cursor");

  const state = {
    pointerX: window.innerWidth * 0.5,
    pointerY: window.innerHeight * 0.5,
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    vx: 0,
    vy: 0,
    clickCount: 0,
    eggLocked: false,
    nextTrailAt: 0,
  };

  const footprints = [];
  const artists = [];
  const finalEggFrame = 10;
  const artistStartScale = 0.5;
  const artistEndScale = 1;
  const artistLifetime = 30000;
  let frame = 0;

  const getEggFrameSrc = (frameIndex) => {
    const padded = String(frameIndex).padStart(2, "0");
    return eggFrame.src.replace(/egg(?:-baked)?-frame-\d+\.png|egg-cursor\.png/, `egg-baked-frame-${padded}.png`);
  };

  const setEggFrame = (frameIndex) => {
    cursor.dataset.eggStep = String(frameIndex);
    eggFrame.src = getEggFrameSrc(frameIndex);
  };

  const resetEgg = () => {
    state.clickCount = 0;
    state.eggLocked = false;
    setEggFrame(0);
    cursor.style.opacity = "1";
    updateCursor();
  };

  const paintPalette = ["#d41618", "#b90910", "#1b1716", "#050505"];
  const splatShapes = [
    "M25.2 4.4c4.4 2.2 2.6 8.3 6.6 10.2 4.5 2.2 10.2-2 12.4 2.8 2.1 4.7-5 6.3-5.4 10.7-.4 4.2 5.4 7.7 2.2 11.5-3.3 4-8.4-2.1-12.8-.2-4.5 2-4.7 9.3-9.7 8.2-4.6-1-2.6-8.1-6.4-10.8-3.6-2.5-10.4.2-11.8-4.8-1.3-4.9 6.2-5.4 7.4-9.8 1.2-4.3-3.5-9.6.6-12.8 4.1-3.2 8.2 2.6 12.2 1.1 3.6-1.3 1.2-7.8 4.7-6.1Z",
    "M20.7 2.8c5.3-1.4 6.5 7.8 11.6 7.7 4.5-.1 8-5.6 11.2-2.2 3.5 3.6-2.8 8.1-1.2 12.7 1.6 4.7 8.1 5.6 7.1 10.3-1.1 5.1-8.2 2.1-11.4 5.2-3.2 3.2-1.5 10.3-6.7 11.2-4.7.8-5.4-6.4-9.9-7.2-4.4-.8-9.2 4.4-12.6.8-3.7-4 3.2-8.4 2.1-12.8-1.1-4.3-8.8-4.9-8.2-9.9.6-5.2 8.5-3 11.6-6.4 3-3.3 1.7-8.2 6.4-9.4Z",
    "M24.6 5.1c3.7 0 5.8 5.4 9.4 5.8 3.7.5 8.7-3.5 10.8.1 2.3 3.8-4.1 7.4-3.2 11.2 1 4 7.2 6 5.3 10.4-1.9 4.3-8.4.7-11.8 3.1-3.3 2.4-3.1 9.7-8.1 9.8-4.8.1-4.3-7.3-8.1-8.8-3.8-1.5-9 3.5-12.1-.1-3-3.5 2.6-7.7 2-11.7-.6-4.1-6.6-7-4.4-11.1 2.3-4.3 8.4-.2 12-2.3 3.4-2 3.8-6.4 8.2-6.4Z",
    "M17.7 6.1c4.1-2.9 7.9 2.4 12 1.6 3.7-.7 6.9-5.4 10.2-2.8 3.5 2.8-.7 7.8 1.4 11.3 2.4 4 9 3.8 9.2 8.7.2 4.6-6.5 5.1-8.1 9.1-1.6 4 2.1 9.6-2.4 12.1-4.4 2.5-8-3.4-12.4-3.2-4.3.2-7.7 6-12 3.4-4-2.5-.3-8.3-2.2-12-1.9-3.7-8.9-3.6-9-8.4-.1-5.1 7.2-4.9 8.8-9.1 1.5-3.9.5-7.9 4.5-10.7Z",
  ];
  const toPaintColor = () => paintPalette[Math.floor(Math.random() * paintPalette.length)];

  const createFootprint = (x, y, angle, color) => {
    const foot = document.createElement("div");
    const shape = splatShapes[Math.floor(Math.random() * splatShapes.length)];
    foot.className = "footprint";
    foot.style.left = `${x}px`;
    foot.style.top = `${y}px`;
    foot.style.setProperty("--foot-rotate", `${angle}deg`);
    foot.style.setProperty("--splat-scale", String(0.72 + Math.random() * 0.72));
    foot.style.setProperty("--splat-stretch", String(0.72 + Math.random() * 0.58));
    foot.style.color = color;
    foot.innerHTML = `
      <svg viewBox="0 0 52 52" aria-hidden="true" focusable="false">
        <path d="${shape}" />
        <circle cx="${8 + Math.random() * 36}" cy="${8 + Math.random() * 36}" r="${1.4 + Math.random() * 3.2}" opacity="0.58" />
      </svg>
    `;
    overlay.appendChild(foot);
    footprints.push({ element: foot, bornAt: performance.now() });
  };

  const spawnArtist = () => {
    const artistElement = artist.cloneNode(true);
    if (!(artistElement instanceof HTMLElement)) {
      return;
    }

    const now = performance.now();
    const x = Math.min(Math.max(state.pointerX, 44), window.innerWidth - 44);
    const y = Math.min(Math.max(state.pointerY + 18, 56), window.innerHeight - 56);
    const artistState = {
      element: artistElement,
      x,
      y,
      targetX: x,
      targetY: y,
      vx: 0,
      vy: 0,
      bornAt: now,
      exitAt: now + artistLifetime,
      isExiting: false,
      lastTrailAt: now,
      lastTrailX: x,
      lastTrailY: y,
      nextRetargetAt: now + 300,
      rotation: Math.random() * 10 - 5,
    };

    artistElement.removeAttribute("data-egg-artist");
    artistElement.hidden = false;
    artistElement.style.opacity = "1";
    overlay.appendChild(artistElement);
    artists.push(artistState);
    cursor.style.opacity = "0";
    window.setTimeout(resetEgg, 260);
    chooseNewTarget(artistState, true);
  };

  const chooseExitTarget = (artistState) => {
    const side = Math.floor(Math.random() * 4);
    const margin = 220;
    if (side === 0) {
      artistState.targetX = -margin;
      artistState.targetY = Math.random() * window.innerHeight;
    } else if (side === 1) {
      artistState.targetX = window.innerWidth + margin;
      artistState.targetY = Math.random() * window.innerHeight;
    } else if (side === 2) {
      artistState.targetX = Math.random() * window.innerWidth;
      artistState.targetY = -margin;
    } else {
      artistState.targetX = Math.random() * window.innerWidth;
      artistState.targetY = window.innerHeight + margin;
    }
    artistState.nextRetargetAt = Number.POSITIVE_INFINITY;
  };

  const chooseNewTarget = (artistState, immediate = false) => {
    const marginX = 56;
    const marginY = 92;
    const minX = marginX;
    const maxX = Math.max(minX + 40, window.innerWidth - marginX);
    const minY = marginY;
    const maxY = Math.max(minY + 40, window.innerHeight - marginY);
    artistState.targetX = Math.random() * (maxX - minX) + minX;
    artistState.targetY = Math.random() * (maxY - minY) + minY;
    artistState.rotation = Math.random() * 10 - 5;
    artistState.nextRetargetAt = performance.now() + (immediate ? 500 : 1400 + Math.random() * 2600);
  };

  const updateCursor = () => {
    cursor.style.transform = `translate3d(${state.pointerX}px, ${state.pointerY}px, 0)`;
    if (!state.eggLocked) cursor.style.opacity = "1";
  };

  const onPointerMove = (event) => {
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    updateCursor();
  };

  const onPointerDown = (event) => {
    if (!(event.target instanceof Element) || event.target.closest(".egg-overlay")) {
      return;
    }

    if (state.eggLocked) {
      return;
    }

    state.clickCount += 1;

    const nextFrame = Math.min(state.clickCount, finalEggFrame);
    setEggFrame(nextFrame);

    if (nextFrame >= finalEggFrame) {
      state.eggLocked = true;
      window.setTimeout(spawnArtist, 520);
    }
  };

  const pruneFootprints = (now) => {
    for (let index = footprints.length - 1; index >= 0; index -= 1) {
      const item = footprints[index];
      const age = now - item.bornAt;
      if (age >= 10000) {
        item.element.remove();
        footprints.splice(index, 1);
      } else if (age >= 8500) {
        item.element.classList.add("is-fading");
      }
    }
  };

  const animateArtist = (artistState, now, delta) => {
    const artistElement = artistState.element;

    if (!artistState.isExiting && now >= artistState.exitAt) {
      artistState.isExiting = true;
      chooseExitTarget(artistState);
    }

    if (artistState.isExiting) {
      const away = artistState.x < -80 || artistState.x > window.innerWidth + 80 || artistState.y < -80 || artistState.y > window.innerHeight + 80;
      if (away) {
        artistElement.remove();
        return false;
      }
    }

    if (now >= artistState.nextRetargetAt) {
      if (artistState.isExiting) {
        chooseExitTarget(artistState);
      } else {
        chooseNewTarget(artistState);
      }
    }

    const dx = artistState.targetX - artistState.x;
    const dy = artistState.targetY - artistState.y;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = artistState.isExiting ? 132 : 84 + Math.random() * 28;
    const step = Math.min(distance, (speed * delta) / 1000);
    const moveX = (dx / distance) * step;
    const moveY = (dy / distance) * step;

    artistState.vx = moveX;
    artistState.vy = moveY;
    artistState.x += moveX;
    artistState.y += moveY;

    if (distance < 12) {
      if (artistState.isExiting) {
        artistElement.remove();
        return false;
      }
      chooseNewTarget(artistState);
    }

    const angle = Math.atan2(artistState.vy, artistState.vx) * (180 / Math.PI);
    const flip = artistState.vx < 0 ? -1 : 1;
    const growthProgress = Math.min(1, Math.max(0, (now - artistState.bornAt) / artistLifetime));
    const currentScale = artistStartScale + (artistEndScale - artistStartScale) * growthProgress;
    artistElement.classList.toggle("is-exiting", artistState.isExiting);
    artistElement.dataset.facing = artistState.vx < 0 ? "left" : "right";
    artistElement.style.transform = `translate3d(${artistState.x}px, ${artistState.y}px, 0) translate(-50%, -50%) scale(${currentScale}) scaleX(${flip}) rotate(${artistState.rotation}deg)`;

    if (now - artistState.lastTrailAt >= 480 && Math.hypot(artistState.x - artistState.lastTrailX, artistState.y - artistState.lastTrailY) >= 24) {
      createFootprint(artistState.x - 2, artistState.y + 12, angle + (Math.random() * 18 - 9), toPaintColor());
      artistState.lastTrailAt = now;
      artistState.lastTrailX = artistState.x;
      artistState.lastTrailY = artistState.y;
    }

    return true;
  };

  const tick = (now) => {
    const delta = now - frame;
    frame = now;
    for (let index = artists.length - 1; index >= 0; index -= 1) {
      const artistState = artists[index];
      artistState.element.style.opacity = "1";
      if (!animateArtist(artistState, now, delta || 16)) {
        artists.splice(index, 1);
      }
    }
    pruneFootprints(now);
    requestAnimationFrame(tick);
  };

  const initCursor = () => {
    updateCursor();
    setEggFrame(0);
    cursor.style.opacity = "1";
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("resize", () => {
    state.pointerX = Math.min(state.pointerX, window.innerWidth - 8);
    state.pointerY = Math.min(state.pointerY, window.innerHeight - 8);
    for (const artistState of artists) {
      if (artistState.isExiting) {
        chooseExitTarget(artistState);
      }
    }
  });

  initCursor();
  requestAnimationFrame(tick);
})();
