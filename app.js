(() => {
  "use strict";

  const PHOTOS = [
    // Landscape (Mountains, deserts, and forests)
    {
      src: "images/01-alpine-peaks.jpg",
      title: "Golden Hour Alpine Peaks",
      category: "Landscape",
      alt: "Snow-capped alpine mountain peaks bathed in golden hour sunlight with mist in the valley"
    },
    {
      src: "images/02-red-desert-dunes.jpg",
      title: "Wind-Sculpted Desert Dunes",
      category: "Landscape",
      alt: "Sweeping golden-red sand dunes with wind ripples and morning shadows"
    },
    {
      src: "images/03-misty-pine-forest.jpg",
      title: "Misty Pine Forest",
      category: "Landscape",
      alt: "Ancient pine forest shrouded in morning fog with warm sunbeams filtering through trees"
    },
    {
      src: "images/04-autumn-valley-ridge.jpg",
      title: "Autumn Mountain Valley",
      category: "Landscape",
      alt: "Mountain ridge overlooking a winding valley of autumn amber and evergreen trees"
    },
    {
      src: "images/05-canyon-mesas.jpg",
      title: "Red Sandstone Canyon",
      category: "Landscape",
      alt: "Sculpted red sandstone desert canyon and mesas glowing in late afternoon light"
    },

    // Water (Waterfalls, oceans, and lakes)
    {
      src: "images/06-emerald-waterfall.jpg",
      title: "Basalt Canyon Waterfall",
      category: "Water",
      alt: "Multi-tiered waterfall cascading down mossy basalt cliffs into a turquoise pool"
    },
    {
      src: "images/07-pacific-ocean-waves.jpg",
      title: "Coastal Ocean Swells",
      category: "Water",
      alt: "Deep indigo ocean waves breaking gently against volcanic sea stacks"
    },
    {
      src: "images/08-mirror-alpine-lake.jpg",
      title: "Mirror Alpine Lake",
      category: "Water",
      alt: "Still glacial alpine lake reflecting jagged snow-dusted mountain peaks at dawn"
    },
    {
      src: "images/09-turquoise-cove.jpg",
      title: "Turquoise Cliffside Cove",
      category: "Water",
      alt: "Crystal-clear turquoise ocean cove meeting smooth coastal rocks and pale sand"
    },
    {
      src: "images/10-forest-stream-cascade.jpg",
      title: "Woodland Stream Cascade",
      category: "Water",
      alt: "Silky forest stream flowing over mossy boulders beneath a green canopy"
    },

    // Atmosphere (Northern lights, sunsets, and starry skies)
    {
      src: "images/11-northern-lights-fjord.jpg",
      title: "Arctic Northern Lights",
      category: "Atmosphere",
      alt: "Vivid emerald and violet aurora borealis ribbons over a snow-dusted fjord"
    },
    {
      src: "images/12-golden-horizon-sunset.jpg",
      title: "Amber Horizon Sunset",
      category: "Atmosphere",
      alt: "Dramatic sunset with amber, coral, and indigo clouds reflecting on calm water"
    },
    {
      src: "images/13-milky-way-desert.jpg",
      title: "Milky Way Over the Desert",
      category: "Atmosphere",
      alt: "Starry night sky with the luminous Milky Way arching over desert rock silhouettes"
    },
    {
      src: "images/14-pastel-twilight-clouds.jpg",
      title: "Alpine Pastel Twilight",
      category: "Atmosphere",
      alt: "Soft rose, lavender, and gold twilight sky above misty layered mountain silhouettes"
    },
    {
      src: "images/15-star-trails-summit.jpg",
      title: "Starlit Mountain Lake",
      category: "Atmosphere",
      alt: "Clear midnight sky filled with sparkling stars and airglow reflecting on a mountain lake"
    },

    // Macro (Close-ups of flowers, leaves, and moss)
    {
      src: "images/16-dewdrops-wildflower.jpg",
      title: "Morning Dew on Wildflower",
      category: "Macro",
      alt: "Close-up of delicate pink and white wildflower petals glistening with morning dewdrops"
    },
    {
      src: "images/17-fern-leaf-veins.jpg",
      title: "Sunlit Fern Frond",
      category: "Macro",
      alt: "Macro close-up of a backlit emerald green fern frond showing intricate leaf veins"
    },
    {
      src: "images/18-velvet-forest-moss.jpg",
      title: "Velvet Woodland Moss",
      category: "Macro",
      alt: "Close-up of vibrant green woodland moss sparkling with fine morning mist droplets"
    },
    {
      src: "images/19-autumn-maple-leaf.jpg",
      title: "Frosted Maple Leaf",
      category: "Macro",
      alt: "Macro detail of a crimson autumn maple leaf dusted with delicate morning frost"
    },
    {
      src: "images/20-lotus-water-droplet.jpg",
      title: "Lotus Leaf Droplet",
      category: "Macro",
      alt: "Single crystal-clear water droplet resting on a velvety green lotus leaf"
    }
  ];

  const gridEl = document.getElementById("gallery-grid");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImageEl = document.getElementById("lightbox-image");
  const lightboxTitleEl = document.getElementById("lightbox-title");
  const lightboxCategoryEl = document.getElementById("lightbox-category");
  const lightboxCounterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = 0;
  let isOpen = false;
  let lastFocusedEl = null;

  function renderGallery() {
    const fragment = document.createDocumentFragment();

    PHOTOS.forEach((photo, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item";
      button.dataset.index = String(index);
      button.setAttribute("aria-label", `View ${photo.title} (${index + 1} of ${PHOTOS.length})`);

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = index < 8 ? "eager" : "lazy";
      img.decoding = "async";

      const overlay = document.createElement("span");
      overlay.className = "gallery-item-overlay";

      const label = document.createElement("span");
      label.className = "gallery-item-label";
      label.textContent = photo.title;

      overlay.appendChild(label);
      button.appendChild(img);
      button.appendChild(overlay);
      fragment.appendChild(button);
    });

    gridEl.appendChild(fragment);
  }

  function preloadAdjacent(index) {
    const total = PHOTOS.length;
    const nextIdx = (index + 1) % total;
    const prevIdx = (index - 1 + total) % total;
    [nextIdx, prevIdx].forEach((idx) => {
      const preloader = new Image();
      preloader.src = PHOTOS[idx].src;
    });
  }

  function showPhoto(index) {
    const total = PHOTOS.length;
    currentIndex = ((index % total) + total) % total;
    const photo = PHOTOS[currentIndex];

    lightboxImageEl.classList.remove("is-visible");
    lightboxImageEl.src = photo.src;
    lightboxImageEl.alt = photo.alt;
    lightboxTitleEl.textContent = photo.title;
    lightboxCategoryEl.textContent = photo.category;
    lightboxCounterEl.textContent = `${currentIndex + 1} / ${total}`;

    // Ensure crisp fade-in whether cached or newly loaded
    if (lightboxImageEl.complete && lightboxImageEl.naturalWidth > 0) {
      requestAnimationFrame(() => {
        lightboxImageEl.classList.add("is-visible");
      });
    } else {
      lightboxImageEl.onload = () => {
        lightboxImageEl.classList.add("is-visible");
      };
    }

    preloadAdjacent(currentIndex);
  }

  function openLightbox(index, triggerEl) {
    lastFocusedEl = triggerEl || document.activeElement;
    isOpen = true;
    showPhoto(index);

    lightboxEl.classList.add("is-open");
    lightboxEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeLightbox() {
    if (!isOpen) return;
    isOpen = false;
    lightboxEl.classList.remove("is-open");
    lightboxEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function showNext() {
    showPhoto(currentIndex + 1);
  }

  function showPrev() {
    showPhoto(currentIndex - 1);
  }

  // Event delegation on gallery grid
  gridEl.addEventListener("click", (event) => {
    const tile = event.target.closest(".gallery-item");
    if (!tile) return;
    const index = Number(tile.dataset.index);
    if (!Number.isNaN(index)) {
      openLightbox(index, tile);
    }
  });

  // Lightbox controls
  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showNext();
  });

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showPrev();
  });

  // Exit when tapping/clicking the dimmed area outside the image
  lightboxEl.addEventListener("click", (event) => {
    if (event.target === lightboxEl) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrev();
    }
  });

  // Basic touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxEl.addEventListener(
    "touchstart",
    (event) => {
      if (!isOpen || event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;
    },
    { passive: true }
  );

  lightboxEl.addEventListener(
    "touchmove",
    (event) => {
      if (!isOpen || event.touches.length !== 1) return;
      touchEndX = event.touches[0].clientX;
    },
    { passive: true }
  );

  lightboxEl.addEventListener("touchend", () => {
    if (!isOpen) return;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 48) {
      if (deltaX < 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  });

  renderGallery();
})();
