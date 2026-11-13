# PRATHU · site 2 (the casting-deck site)

Prathu wanted his site to read like a casting portfolio deck (his reference was an actor's 9-slide PDF). So this site is one clear, numbered section per "slide": easy to scan, no 3D, no generated images, no video. Site 1 is still in `../prathu/`.

## Live site
https://santhosh2875.github.io/actorprathu/ (GitHub Pages, from the `main` branch). Every push to `main` updates it in about a minute.

## Run it
```bash
python -I serve.py
```
Open http://localhost:5177.

## Sections
01 Profile: photo, name, then WhatsApp / Call / Instagram / Email buttons straight away, a short bio, the details list (age, height, weight, hair, location, languages, dance) and the portfolio PDF.
02 Highlights: six quick facts (Netflix, Gautham Menon, 147K Instagram, aha, 5 languages, 4 dance styles) and an Instagram follow card.
03 Projects: each film or series with poster, type, platform, year, Released/Upcoming, and his role once we have it.
04 Ad films: 6 brands; Malabar Gold & Diamonds (directed by Gautham Menon) comes first.
05 Television & stage: TV set, TV stage and live stage photos.
06 Looks: six labelled looks, and a "View all 18 photos" button that opens the photo viewer.
07 Contact: phone, WhatsApp, email, Instagram, location, Download PDF, Copy all details.

The bar at the top lists every section and highlights the one you are reading. WhatsApp and Instagram buttons float at the bottom right on every section (hidden while the Contact section is on screen).

## Style
Ivory & oxblood (chosen from 5 palettes), kept to three colours: paper `#f4efe6` (cards `#fffdf9`), ink `#1c1a17` (grey `#6c655c` for small text), and one oxblood accent `#8c2a22` for main buttons (WhatsApp included, with its icon), section tabs, numbers and bullets. The photo viewer stays dark. Fonts: Cinzel for headings, Manrope for text, Noto Sans for the Indian scripts.

## Edit
All words are in `src/data.js`. An empty field is not shown on the site, so you can fill `role`, `youtube` and the rest when he sends them (they are marked `TODO`).
Photos are in `img/` (copied from site 1). The link preview is `og.jpg`; remake it with `python -I tools/make_og.py`.
