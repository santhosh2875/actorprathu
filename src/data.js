// Every word on the site lives here. Edit this file; the page follows.
// Facts are from his portfolio PDF and Instagram (checked 2026-11-12). Fields marked TODO need his confirmation.
// An empty field ('') is simply not shown on the site.

export const ACTOR = {
  name: 'Prathosh',
  known: 'Prathu',
  tamil: 'பிரதோஷ்', // TODO: confirm the Tamil spelling
  title: 'Actor · Anchor',
  photo: 'p31', // the profile photo (img/<id>.webp); the same one as his PDF cover
  bio: 'Chennai-based actor and anchor, working across films, web series, music videos, ad films and television.',
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

// Films, series and music videos. role = his character / part (TODO for each). status: 'out' or 'soon'.
export const PROJECTS = [
  { title: 'Hey Bruce', kind: 'Music video', platform: '', year: '', role: '', status: 'out', poster: '', isNew: true }, // TODO: poster
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

// Television and stage.
export const TV = {
  text: 'Anchor on Jaya TV and Vijay TV. He has hosted many concerts, television shows and reality shows.',
  tags: ['Jaya TV', 'Vijay TV', 'Concerts', 'TV shows', 'Reality shows'],
  photos: [
    { id: 'p39', caption: 'On a TV set' },
    { id: 'p35', caption: 'TV stage' },
    { id: 'p43', caption: 'Hosting live' },
  ],
};

// The sliding photo rows, grouped by look. Phones show all three rows; desktop shows two (beach, then the rest).
export const PHOTO_ROWS = [
  ['p31', 'p34', 'p29', 'p26', 'p27', 'p28', 'p30', 'p37'], // beach, golden hour, suede jacket
  ['p36', 'p42', 'p41', 'p40', 'p33'], // casual looks
  ['p39', 'p35', 'p38', 'p32', 'p43'], // clean shave, younger look, stage
];

// "View all photos" opens these in the viewer, in the same order as the rows.
export const PHOTOS = PHOTO_ROWS.flat();

// Looks, like the last page of a casting deck.
export const LOOKS = [
  { id: 'p29', name: 'Suede jacket look' },
  { id: 'p36', name: 'Street look' },
  { id: 'p38', name: 'Printed shirt look' },
  { id: 'p39', name: 'Formal look' },
  { id: 'p40', name: 'Casual look' },
  { id: 'p42', name: 'Tartan look' },
];
