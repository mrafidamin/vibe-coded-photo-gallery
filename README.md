# My photo gallery

A minimalist, standalone nature photo gallery built with pure HTML, CSS, and Vanilla JavaScript (zero external dependencies), with Nginx container configuration included.

## Features

- **Responsive Full-Width Grid:** CSS Grid layout scaling smoothly from 5 columns on ultrawide displays down to 1 column on mobile, with uniform spacing and modern `aspect-ratio` + `object-fit: cover` cropping.
- **20 Curated Nature Photos:** Organized across 4 themes — **Landscape**, **Water**, **Atmosphere**, and **Macro**.
- **Full-Screen Lightbox:** Clicking any photo opens a dimmed full-screen viewer with high-resolution display, photo counter, manual Left/Right arrow navigation, continuous infinite looping (`20 -> 1` and `1 -> 20`), keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), mobile swipe support, and click-outside or Close button exit.
- **Zero Dependencies:** No frameworks, icon packs, or external CDN links.

## Run Locally

Open `index.html` directly in any modern browser, or serve locally:

```bash
python -m http.server 8080
```

## Deploy to Google Cloud Run

The project includes a `Dockerfile` and `nginx.conf` configured to serve static files on port `80`:

```bash
gcloud run deploy photogallery \
  --source=. \
  --region=us-west1 \
  --port=80 \
  --allow-unauthenticated
```

## Image Credits

- Photos `01`–`03` were AI-generated.
- Photos `04`–`20` are locally stored nature photographs sourced from [Wikimedia Commons](https://commons.wikimedia.org/).
