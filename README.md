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
01 Profile: photo, name, details list (age, height, weight, hair, location, languages, dance), WhatsApp and Download portfolio.
02 Projects: each film or series with poster, type, platform, year, Released/Upcoming, and his role once we have it.
03 Ad films: 6 brands; Malabar Gold & Diamonds (directed by Gautham Menon) comes first.
04 Television & stage: TV set, TV stage and live stage photos.
05 Recognition: Netflix, Gautham Menon, 147K Instagram, aha, plus an Instagram follow card.
06 Skills: 5 languages (with "hello" in each script), 4 dance styles.
07 Photos: a collage; tap for full size (swipe or arrow keys).
08 Looks: suede jacket, street, printed shirt, formal, casual, tartan.
09 Contact: phone, WhatsApp, email, Instagram, location, Download PDF, Copy all details.

The bar at the top lists every section and highlights the one you are reading.

## Style
Ivory & oxblood (chosen from 5 palettes): paper `#f4efe6`, cards `#fffdf9`, ink `#1c1a17`, muted `#6c655c`, brown `#8a5a3c` for bullets and numbers, one oxblood accent `#8c2a22` (the tab on every section, as on his reference deck). The photo viewer stays dark. Fonts: Cinzel for headings, Manrope for text, Noto Sans for the Indian scripts.

## Edit
All words are in `src/data.js`. An empty field is not shown on the site, so you can fill `role`, `youtube` and the rest when he sends them (they are marked `TODO`).
Photos are in `img/` (copied from site 1). The link preview is `og.jpg`; remake it with `python -I tools/make_og.py`.
