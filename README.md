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
**Phones (under 760 px):** full-width photo hero (`img/hero-mobile.webp`) → three sliding photo rows with no heading (beach looks, casual looks, clean-shave / younger looks; left, right, left; swipe or drag them) → About → Work → Commercials → TV & stage → Looks → Contact. The top bar and floating buttons appear after the hero.
**Desktop:** About (with photo) → Gallery (two rows) → Work → Commercials → TV & stage → Looks → Contact.

- About: name, WhatsApp / Call / Instagram / Email, a short bio, the details list.
- Work: a poster row of films, series and music videos (Hey Bruce is a music video, marked New; upcoming ones say Coming soon).
- Commercials: brand tiles; Malabar Gold & Diamonds (directed by Gautham Menon) first.
- TV & stage: anchor on Jaya TV and Vijay TV; concerts, TV shows and reality shows; stills.
- Looks: six labelled looks (tap for full size).
- Contact: one tap-to-contact list (WhatsApp, Call, Email, Instagram), Download portfolio PDF (with an "open it instead" link for in-app browsers), Copy all details.

## Style
A dark streaming-app look: background `#141414`, cards `#1f1f1f`, white text, grey `#b3b3b3`, one red `#e50914` (logo, badges, floating WhatsApp). Main buttons are white with black text, secondary buttons are grey. Fonts: Bebas Neue (big name and poster titles), Manrope (everything else). No logos or branding of any streaming service are used, only the general look.

The photo rows are set in `PHOTO_ROWS` in `src/data.js`: move a photo id between rows to rearrange them.

## Edit
All words are in `src/data.js`. An empty field is not shown on the site, so you can fill `role`, `youtube` and the rest when he sends them (they are marked `TODO`).
Photos are in `img/` (copied from site 1); the gallery uses 600px-tall copies in `img/thumb/` (remake them if you replace a photo). The link preview is `og.jpg`; remake it with `python -I tools/make_og.py`.
