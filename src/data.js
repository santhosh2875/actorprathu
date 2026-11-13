// Every word on the site lives here. Edit this file; the page follows.
// Facts are from his portfolio PDF and Instagram (checked 2026-11-12). Fields marked TODO need his confirmation.
// An empty field ('') is simply not shown on the site.

export const ACTOR = {
  name: 'Prathosh',
  known: 'Prathu',
  tamil: 'பிரதோஷ்', // TODO: confirm the Tamil spelling
  title: 'Actor · Anchor',
  photo: 'p31', // the profile photo (img/<id>.webp); the same one as his PDF cover
  bio: 'Chennai-based actor and anchor working across films, web series, ad films and television. Speaks five languages and trained in four dance styles.',
  details: [
    ['Age', '27'],
    ['Height', '5.8 ft (175 cm)'],
    ['Weight', '68 kg'],
    ['Hair', 'Black, curly'],
    ['Location', 'Chennai · willing to travel'],
    ['Languages', 'Tamil, English, Telugu, Malayalam, Hindi'],
    ['Dance', 'Contemporary, Western, Indian Folk, Freestyle'],
  ],
  phone: '+917904047456', // TODO: confirm this number can be public
  phoneLabel: '79040 47456',
  email: 'vjprathuofficial@gmail.com',
  instagram: 'https://www.instagram.com/actorprathu',
  handle: '@actorprathu',
  followers: '147K',
  posts: '796',
  youtube: '', // TODO: his YouTube channel link
  pdf: 'media/prathosh-portfolio.pdf',
};

// Films and series. role = his character / part (TODO for each). status: 'out' or 'soon'.
export const PROJECTS = [
  { title: 'Hey Bruce', kind: 'Film', platform: '', year: '', role: '', status: 'out', poster: '' },
  { title: 'Nee Forever', kind: 'Film', platform: 'Netflix', year: '2025', role: '', status: 'out', poster: 'poster-neeforever' },
  { title: 'Trauma', kind: 'Film', platform: '', year: '2025', role: '', status: 'out', poster: 'poster-trauma' },
  { title: 'Baby & Baby', kind: 'Film', platform: '', year: '2025', role: '', status: 'out', poster: 'poster-babybaby' },
  { title: 'Madurai Payyanum Chennai Ponnum', kind: 'Web series', platform: 'aha', year: '2025', role: '', status: 'out', poster: 'poster-mpcp' },
  { title: 'Singanallur Signal', kind: 'Film', platform: '', year: '', role: '', status: 'soon', poster: 'poster-signal' },
  { title: 'Rage', kind: '', platform: '', year: '', role: '', status: 'soon', poster: '' }, // TODO: film, short or song?
];

export const ADS = [
  { brand: 'Malabar Gold & Diamonds', note: 'Directed by Gautham Menon' },
  { brand: 'Amul', note: '' },
  { brand: 'Sathya Mobiles', note: '' },
  { brand: 'Pasudh Veshthigal', note: '' },
  { brand: 'Dilo Silks', note: '' },
  { brand: 'Annamalai Silks', note: '' },
];

// Television and stage. TODO: show names and channels.
export const TV = {
  text: 'Anchor and performer on television and live stage. Comfortable with a mic, a crowd and a live camera.',
  photos: [
    { id: 'p39', caption: 'On a TV set' },
    { id: 'p35', caption: 'TV stage performance' },
    { id: 'p43', caption: 'Live stage, hosting' },
  ],
};

// Short highlights, all facts we can show today.
export const HIGHLIGHTS = [
  { big: 'Netflix', small: 'Nee Forever streams on Netflix' },
  { big: 'Gautham Menon', small: 'Directed his Malabar Gold & Diamonds ad film' },
  { big: '147K', small: 'Followers on Instagram' },
  { big: 'aha', small: 'Web series: Madurai Payyanum Chennai Ponnum' },
];

export const LANGUAGES = [
  { lang: 'Tamil', word: 'வணக்கம்', cls: 'ta' },
  { lang: 'English', word: 'Hello', cls: 'en' },
  { lang: 'Telugu', word: 'నమస్కారం', cls: 'te' },
  { lang: 'Malayalam', word: 'നമസ്കാരം', cls: 'ml' },
  { lang: 'Hindi', word: 'नमस्ते', cls: 'hi' },
];
export const DANCE = ['Contemporary', 'Western', 'Indian Folk', 'Freestyle'];

// The photo collage, in order. wide = spans 2 columns on desktop.
export const PHOTOS = ['p34', 'p29', 'p36', 'p26', 'p42', 'p38', 'p27', 'p40', 'p32', 'p37', 'p41', 'p30', 'p33', 'p28'];

// Looks, like the last page of a casting deck.
export const LOOKS = [
  { id: 'p29', name: 'Suede jacket look' },
  { id: 'p36', name: 'Street look' },
  { id: 'p38', name: 'Printed shirt look' },
  { id: 'p39', name: 'Formal look' },
  { id: 'p40', name: 'Casual look' },
  { id: 'p42', name: 'Tartan look' },
];
