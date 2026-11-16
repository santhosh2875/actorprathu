import { ACTOR, PROJECTS, ADS, TV, PHOTO_ROWS, PHOTOS, LOOKS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const img = (id) => `img/${id}.webp`;

// ---------- simple text ----------
document.querySelectorAll('[data-bind]').forEach((el) => (el.textContent = ACTOR[el.dataset.bind] ?? ''));
$('#profile-img').src = img(ACTOR.photo);

const wa = `https://wa.me/${ACTOR.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Prathu, this is a casting enquiry: ')}`;

// simple line icons (drawn here, no icon files)
const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.6 8.6 0 0 0-7.4 13l-1.2 4.4 4.5-1.2A8.6 8.6 0 1 0 12 3.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8.3c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .5-.1.6l-.6.7c-.1.2-.2.3 0 .6.5.9 1.4 1.8 2.4 2.3.3.2.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .5-.2 1.2-.7 1.6-.6.5-1.5.7-2.5.4-1.6-.5-3.1-1.5-4.3-2.9-1-1.2-1.6-2.4-1.7-3.4 0-.8.2-1.5.5-2.1Z" fill="currentColor"/></svg>',
  call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.1 2A16.6 16.6 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>',
  yt: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m10 9.3 5 2.7-5 2.7Z" fill="currentColor"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
};

// right under his name: every way to reach him
$('#reach').innerHTML = `
  <a class="reach__btn reach__btn--main" href="${wa}" target="_blank" rel="noopener">${ICON.wa}<span>WhatsApp</span></a>
  <a class="reach__btn" href="tel:${ACTOR.phone}">${ICON.call}<span>Call</span></a>
  <a class="reach__btn" href="${ACTOR.instagram}" target="_blank" rel="noopener">${ICON.ig}<span>Instagram</span></a>
  <a class="reach__btn" href="mailto:${ACTOR.email}?subject=${encodeURIComponent('Casting enquiry for Prathu')}">${ICON.mail}<span>Email</span></a>`;

// always on the side: WhatsApp + Instagram
$('#fab').innerHTML = `
  <a class="fab__btn fab__btn--ig" href="${ACTOR.instagram}" target="_blank" rel="noopener" aria-label="Prathu on Instagram">${ICON.ig}</a>
  <a class="fab__btn fab__btn--wa" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp Prathu">${ICON.wa}<span>WhatsApp</span></a>`;

const row = ([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`;

$('#details').innerHTML = ACTOR.details.map(([k, v]) => row([k, esc(v)])).join('');

// ---------- section numbers + the index bar ----------
const phone = matchMedia('(max-width: 759px)');
let secs = [], links = [];
// Number the sections and build the chip menu in the order they appear on screen
// (on phones the gallery comes before the profile).
function layoutSecs() {
  secs = [...document.querySelectorAll('.sec')].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  $('#index').innerHTML = secs.map((s) => `<a href="#${s.id}">${s.dataset.title}</a>`).join('');
  links = [...document.querySelectorAll('#index a')];
  active = -1;
}
let active = -1;
layoutSecs();
function setActive(i) {
  if (i === active) return;
  active = i;
  links.forEach((a, k) => a.classList.toggle('is-on', k === i));
  // keep the active chip in view by scrolling only the chip row, never the page
  const nav = $('#index'), a = links[i];
  if (a) nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
}
function onScroll() {
  const vh = document.documentElement.clientHeight;
  const y = vh * 0.35;
  let i = 0;
  secs.forEach((s, k) => { if (s.getBoundingClientRect().top <= y) i = k; });
  if (vh + scrollY >= document.documentElement.scrollHeight - 4) i = secs.length - 1;
  setActive(i);
  // phones: the hero stays a clean photo, so the top bar and floating buttons wait until you scroll past it
  const heroLeft = phone.matches && $('#mhero').getBoundingClientRect().bottom > 72;
  $('#bar').classList.toggle('is-hidden', heroLeft);
  $('#fab').classList.toggle('over-hero', heroLeft);
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// ---------- work: poster row ----------
$('#projects-list').innerHTML = PROJECTS.map((p) => {
  const art = p.poster
    ? `<img src="${img(p.poster)}" alt="${esc(p.title)} poster" loading="lazy" />`
    : `<span class="poster__type"><small>${esc(p.kind || 'Coming soon')}</small><b>${esc(p.title)}</b></span>`;
  const badge = p.status === 'soon' ? '<span class="poster__badge">Coming soon</span>' : p.isNew ? '<span class="poster__badge">New</span>' : '';
  const meta = [p.kind, p.platform, p.year].filter(Boolean).join(' · ');
  return `<article class="poster fade"><div class="poster__art">${art}${badge}</div>
    <h3>${esc(p.title)}</h3>${meta ? `<p>${esc(meta)}</p>` : ''}${p.role ? `<p class="poster__role">as ${esc(p.role)}</p>` : ''}</article>`;
}).join('');
const nOut = PROJECTS.filter((p) => p.status !== 'soon').length;
$('#projects-sub').textContent = `${nOut} out now · ${PROJECTS.length - nOut} coming soon`;

// ---------- commercials: brand tiles ----------
$('#ads-list').innerHTML = ADS.map((a, i) => `<article class="adtile fade${i === 0 ? ' adtile--feature' : ''}"><div class="adtile__art"><b>${esc(a.brand)}</b></div><p>${esc(a.note || 'Ad film')}</p></article>`).join('');

// ---------- television & stage ----------
$('#tv-text').textContent = TV.text;
$('#tv-tags').innerHTML = TV.tags.map((t) => `<li>${esc(t)}</li>`).join('');
$('#tv-photos').innerHTML = TV.photos.map((p) => `<figure class="still fade"><img src="${img(p.id)}" alt="${esc(p.caption)}" loading="lazy" /><figcaption>${esc(p.caption)}</figcaption></figure>`).join('');


// ---------- gallery: two rows sliding in opposite directions ----------
// Each row holds its photos twice, so the loop is seamless. The rows move by themselves, and can be
// swiped (phone), dragged or scrolled sideways (computer). Auto-play comes back ~2 s after you let go.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DIRS = [1, -1, 1]; // 1 = moves left, -1 = moves right
const rows = [...document.querySelectorAll('.marquee__row')].map((row, r) => ({ row, track: null, dir: DIRS[r], x: 0, v: 0, setW: 1, drag: null, moved: false, hover: false, last: -1e9, visible: true }));
function buildRows() {
  // phones: three themed rows; desktop: beach row, then everything else
  const groups = phone.matches ? PHOTO_ROWS : [PHOTO_ROWS[0], PHOTO_ROWS.slice(1).flat()];
  let offset = 0;
  rows.forEach((o, r) => {
    const ids = groups[r] || [];
    const start = offset;
    offset += ids.length;
    const set = (hidden) => `<div class="marquee__set"${hidden ? ' aria-hidden="true"' : ''}>${ids.map((id, i) =>
      `<button type="button" data-set="photos" data-i="${start + i}"${hidden ? ' tabindex="-1"' : ''} aria-label="Open photo ${start + i + 1}"><img src="img/thumb/${id}.webp" alt="" draggable="false" /></button>`).join('')}</div>`;
    o.row.innerHTML = ids.length ? `<div class="marquee__track">${set(false)}${set(true)}</div>` : '';
    o.track = o.row.firstElementChild;
    o.x = 0;
    o.v = 0;
    o.row.querySelectorAll('img').forEach((im) => im.complete || im.addEventListener('load', measure, { once: true }));
  });
  measure();
}
function measure() {
  rows.forEach((o) => { o.setW = o.track ? Math.max(1, o.track.firstElementChild.getBoundingClientRect().width) : 1; });
}
buildRows();
addEventListener('resize', measure);
// switching between phone and desktop layouts rebuilds the rows and the section menu
phone.addEventListener('change', () => { buildRows(); layoutSecs(); onScroll(); });

const autoSpeed = () => (reducedMotion ? 0 : document.documentElement.clientWidth < 760 ? 26 : 38); // px per second

rows.forEach((o) => {
  const el = o.row;
  new IntersectionObserver(([e]) => (o.visible = e.isIntersecting)).observe(el);
  el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') o.hover = true; });
  el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') o.hover = false; });

  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    o.drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, start: o.x, lastX: e.clientX, lastT: performance.now(), on: false };
    o.moved = false;
    o.v = 0;
  });
  el.addEventListener('pointermove', (e) => {
    const d = o.drag;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0, dy = e.clientY - d.y0;
    if (!d.on) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { o.drag = null; return; } // a vertical swipe: leave it to the page
      d.on = true;
      o.moved = true;
      try { el.setPointerCapture(e.pointerId); } catch {}
      el.classList.add('is-dragging');
    }
    const now = performance.now(), dt = Math.max(1, now - d.lastT);
    o.v = (-(e.clientX - d.lastX) / dt) * 1000; // px/s, for the glide after release
    d.lastX = e.clientX;
    d.lastT = now;
    o.x = d.start - dx;
    o.last = now;
  });
  const end = (e) => {
    if (!o.drag || o.drag.id !== e.pointerId) return;
    o.drag = null;
    o.last = performance.now();
    el.classList.remove('is-dragging');
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  // a drag is not a tap: stop it from opening the photo
  el.addEventListener('click', (e) => { if (o.moved) { e.stopPropagation(); e.preventDefault(); o.moved = false; } }, true);

  // trackpad / shift + mouse wheel sideways
  el.addEventListener('wheel', (e) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!dx) return;
    e.preventDefault();
    o.x += dx;
    o.v = 0;
    o.last = performance.now();
  }, { passive: false });

  // keyboard: bring a focused photo into view
  el.addEventListener('focusin', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    el.scrollLeft = 0;
    o.x = b.offsetLeft - 16;
    o.v = 0;
    o.last = performance.now();
  });
});

let galleryT = performance.now();
function galleryTick(now) {
  const dt = Math.min(0.05, (now - galleryT) / 1000);
  galleryT = now;
  const paused = document.body.classList.contains('is-locked');
  rows.forEach((o) => {
    if (!o.drag?.on && !paused) {
      const idle = now - o.last > 2000;
      const target = idle && !o.hover ? autoSpeed() * o.dir : 0;
      if (now - o.last < 2000 && Math.abs(o.v) > 1) o.v *= Math.pow(0.04, dt); // glide after a swipe
      else o.v += (target - o.v) * Math.min(1, dt * 2.5); // ease back into auto-play
      o.x += o.v * dt;
    }
    o.x = ((o.x % o.setW) + o.setW) % o.setW;
    if (o.visible && o.track) o.track.style.transform = `translate3d(${-o.x}px, 0, 0)`;
  });
  requestAnimationFrame(galleryTick);
}
requestAnimationFrame(galleryTick);

// ---------- 07 photos + 08 looks (one viewer for both) ----------
let list = [], at = 0;
$('#looks-list').innerHTML = LOOKS.map((l, i) => `<figure class="look fade"><button type="button" data-set="looks" data-i="${i}" aria-label="Open ${esc(l.name)}"><img src="img/thumb/${l.id}.webp" alt="${esc(l.name)}" loading="lazy" /></button><figcaption>${esc(l.name)}</figcaption></figure>`).join('');

const viewer = $('#viewer'), vImg = $('#v-img'), vCount = $('#v-count');
let lastFocus = null;
function show(k) {
  at = (k + list.length) % list.length;
  vImg.src = img(list[at]);
  vCount.textContent = `${at + 1} / ${list.length}`;
}
function open(set, i) {
  list = set === 'looks' ? LOOKS.map((l) => l.id) : PHOTOS;
  lastFocus = document.activeElement;
  viewer.hidden = false;
  document.body.classList.add('is-locked');
  show(i);
  $('#v-close').focus();
}
function close() {
  viewer.hidden = true;
  document.body.classList.remove('is-locked');
  lastFocus?.focus();
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-set]');
  if (b) open(b.dataset.set, +b.dataset.i);
});
$('#v-close').addEventListener('click', close);
$('#v-prev').addEventListener('click', () => show(at - 1));
$('#v-next').addEventListener('click', () => show(at + 1));
viewer.addEventListener('click', (e) => { if (e.target === viewer) close(); });
addEventListener('keydown', (e) => {
  if (viewer.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(at - 1);
  if (e.key === 'ArrowRight') show(at + 1);
});
let sx = null;
viewer.addEventListener('pointerdown', (e) => (sx = e.clientX));
viewer.addEventListener('pointerup', (e) => {
  if (sx == null) return;
  const dx = e.clientX - sx;
  sx = null;
  if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
});

// ---------- contact: one list, every row is tappable ----------
const ways = [
  { icon: ICON.wa, label: 'WhatsApp', value: ACTOR.phoneLabel, href: wa, ext: true, main: true },
  { icon: ICON.call, label: 'Call', value: ACTOR.phoneLabel, href: `tel:${ACTOR.phone}` },
  { icon: ICON.mail, label: 'Email', value: ACTOR.email, href: `mailto:${ACTOR.email}?subject=${encodeURIComponent('Casting enquiry for Prathu')}` },
  { icon: ICON.ig, label: 'Instagram', value: `${ACTOR.handle} · ${ACTOR.followers} followers`, href: ACTOR.instagram, ext: true },
];
if (ACTOR.youtube) ways.push({ icon: ICON.yt, label: 'YouTube', value: 'Channel', href: ACTOR.youtube, ext: true });
$('#ways').innerHTML = ways.map((w) => `<li><a class="way${w.main ? ' way--main' : ''}" href="${w.href}"${w.ext ? ' target="_blank" rel="noopener"' : ''}>${w.icon}<span><b>${esc(w.label)}</b><small>${esc(w.value)}</small></span><i aria-hidden="true">›</i></a></li>`).join('')
  + `<li class="ways__note">Based in Chennai · willing to travel</li>`;
$('#pdf').href = $('#pdf-open').href = ACTOR.pdf;

// iPhone / iPad: Safari often ignores "download" for PDFs, so the button opens the iPhone Share menu
// with the PDF in it ("Save to Files" is one tap). The PDF is fetched quietly as the Contact section comes near,
// so the menu opens straight away. If anything fails, the link simply opens the PDF in Safari.
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (isIOS) {
  const btn = $('#pdf');
  let pdfFile = null;
  btn.removeAttribute('download');
  $('#pdf-tip').hidden = false;
  const prepare = async () => {
    if (pdfFile) return;
    try {
      const blob = await (await fetch(ACTOR.pdf)).blob();
      pdfFile = new File([blob], 'Prathosh-portfolio.pdf', { type: 'application/pdf' });
    } catch { /* the plain link still works */ }
  };
  new IntersectionObserver(([e], obs) => { if (e.isIntersecting) { prepare(); obs.disconnect(); } }, { rootMargin: '800px 0px' }).observe($('#contact'));
  btn.addEventListener('click', (e) => {
    if (pdfFile && navigator.canShare?.({ files: [pdfFile] })) {
      e.preventDefault();
      navigator.share({ files: [pdfFile] }).catch(() => {});
    }
  });
}

const details = [
  `${ACTOR.name} (${ACTOR.known}): ${ACTOR.title}`,
  ...ACTOR.details.map(([k, v]) => `${k}: ${v}`),
  `Phone/WhatsApp: ${ACTOR.phoneLabel}`,
  `Email: ${ACTOR.email}`,
  `Instagram: ${ACTOR.instagram}`,
].join('\n');
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-on');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('is-on'), 2200);
}
$('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(details);
    toast('Details copied');
  } catch {
    toast('Could not copy on this browser');
  }
});

const fab = $('#fab');
new IntersectionObserver(([e]) => fab.classList.toggle('is-hidden', e.isIntersecting), { threshold: 0.25 }).observe($('#contact'));

// ---------- fade-in ----------
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.fade').forEach((el) => io.observe(el));
