import { ACTOR, PROJECTS, ADS, TV, HIGHLIGHTS, PHOTOS, LOOKS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const img = (id) => `img/${id}.webp`;
const pad = (n) => String(n).padStart(2, '0');

// ---------- simple text ----------
document.querySelectorAll('[data-bind]').forEach((el) => (el.textContent = ACTOR[el.dataset.bind] ?? ''));
$('#profile-img').src = img(ACTOR.photo);

const wa = `https://wa.me/${ACTOR.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Prathu, this is a casting enquiry: ')}`;
$('#pdf-1').href = ACTOR.pdf;
$('#bar-wa').href = wa;

// simple line icons (drawn here, no icon files)
const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2a8.6 8.6 0 0 0-7.4 13l-1.2 4.4 4.5-1.2A8.6 8.6 0 1 0 12 3.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8.3c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .5-.1.6l-.6.7c-.1.2-.2.3 0 .6.5.9 1.4 1.8 2.4 2.3.3.2.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .5-.2 1.2-.7 1.6-.6.5-1.5.7-2.5.4-1.6-.5-3.1-1.5-4.3-2.9-1-1.2-1.6-2.4-1.7-3.4 0-.8.2-1.5.5-2.1Z" fill="currentColor"/></svg>',
  call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.1 2A16.6 16.6 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>',
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
const secs = [...document.querySelectorAll('.sec')];
secs.forEach((s, i) => { const n = s.querySelector('.sec__num'); if (n) n.textContent = pad(i + 1); });
$('#index').innerHTML = secs.map((s, i) => `<a href="#${s.id}"><b>${pad(i + 1)}</b>${esc(s.dataset.title)}</a>`).join('');
const links = [...document.querySelectorAll('#index a')];
let active = -1;
function setActive(i) {
  if (i === active) return;
  active = i;
  links.forEach((a, k) => a.classList.toggle('is-on', k === i));
  // keep the active chip in view by scrolling only the chip row, never the page
  const nav = $('#index'), a = links[i];
  if (a) nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
}
function onScroll() {
  const y = innerHeight * 0.35;
  let i = 0;
  secs.forEach((s, k) => { if (s.getBoundingClientRect().top <= y) i = k; });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = secs.length - 1;
  setActive(i);
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// ---------- 02 projects ----------
$('#projects-list').innerHTML = PROJECTS.map((p) => {
  const art = p.poster
    ? `<img class="project__poster" src="${img(p.poster)}" alt="${esc(p.title)} poster" loading="lazy" />`
    : `<div class="project__poster project__type"><b>${esc(p.title)}</b></div>`;
  const meta = [p.kind, p.platform, p.year].filter(Boolean).join(' · ');
  return `<li class="project fade">${art}<div class="project__body">
    <span class="project__status${p.status === 'soon' ? ' project__status--soon' : ''}">${p.status === 'soon' ? 'Upcoming' : 'Released'}</span>
    <h3>${esc(p.title)}</h3>
    ${meta ? `<p class="project__meta">${esc(meta)}</p>` : ''}
    ${p.role ? `<p class="project__role"><b>Role:</b> ${esc(p.role)}</p>` : ''}
  </div></li>`;
}).join('');

const nOut = PROJECTS.filter((p) => p.status !== 'soon').length;
$('#projects-sub').textContent = `${PROJECTS.length} films and web series · ${nOut} released, ${PROJECTS.length - nOut} upcoming`;

// ---------- 03 ads ----------
$('#ads-list').innerHTML = ADS.map((a, i) => `<li class="ad fade${i === 0 ? ' ad--feature' : ''}"><span class="ad__n">${pad(i + 1)}</span><h3>${esc(a.brand)}</h3>${a.note ? `<p>${esc(a.note)}</p>` : '<p>Ad film</p>'}</li>`).join('');

// ---------- 04 tv ----------
$('#tv-text').textContent = TV.text;
$('#tv-photos').innerHTML = TV.photos.map((p) => `<figure class="fade"><img src="${img(p.id)}" alt="${esc(p.caption)}" loading="lazy" /><figcaption>${esc(p.caption)}</figcaption></figure>`).join('');

// ---------- 05 recognition ----------
$('#highlights').innerHTML = HIGHLIGHTS.map((h) => `<li class="fade"><b>${esc(h.big)}</b><span>${esc(h.small)}</span></li>`).join('');
$('#insta').href = ACTOR.instagram;
$('#insta-stats').textContent = `${ACTOR.followers} followers · ${ACTOR.posts} posts`;

// ---------- 07 photos + 08 looks (one viewer for both) ----------
let list = [], at = 0;
$('#all-photos').textContent = `View all ${PHOTOS.length} photos`;
$('#looks-list').innerHTML = LOOKS.map((l, i) => `<figure class="look fade"><button type="button" data-set="looks" data-i="${i}" aria-label="Open ${esc(l.name)}"><img src="${img(l.id)}" alt="${esc(l.name)}" loading="lazy" /></button><p>${esc(l.name)}</p></figure>`).join('');

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

// ---------- 09 contact ----------
const contactRows = [
  ['Phone', `<a href="tel:${ACTOR.phone}">${ACTOR.phoneLabel}</a>`],
  ['WhatsApp', `<a href="${wa}" target="_blank" rel="noopener">${ACTOR.phoneLabel}</a>`],
  ['Email', `<a href="mailto:${ACTOR.email}">${ACTOR.email}</a>`],
  ['Instagram', `<a href="${ACTOR.instagram}" target="_blank" rel="noopener">${ACTOR.handle}</a>`],
  ['Location', 'Chennai · willing to travel'],
];
if (ACTOR.youtube) contactRows.splice(4, 0, ['YouTube', `<a href="${ACTOR.youtube}" target="_blank" rel="noopener">Channel</a>`]);
$('#contact-details').innerHTML = contactRows.map(row).join('');
$('#contact-btns').innerHTML = `
  <a class="btn btn--wa" href="${wa}" target="_blank" rel="noopener">WhatsApp for casting</a>
  <a class="btn btn--line" href="tel:${ACTOR.phone}">Call ${ACTOR.phoneLabel}</a>
  <a class="btn btn--line" href="mailto:${ACTOR.email}?subject=${encodeURIComponent('Casting enquiry for Prathu')}">Email</a>
  <a class="btn btn--line" href="${ACTOR.pdf}" download>Download portfolio PDF</a>
  <button class="btn btn--line" type="button" id="copy">Copy all details</button>`;

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
