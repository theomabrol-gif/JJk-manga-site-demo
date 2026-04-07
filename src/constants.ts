import { Chapter, Character } from './types';

export const JJK_CHAPTERS: Chapter[] = [
  {
    id: 'ch-236',
    number: 236,
    title: 'Gojo Satoru vs Ryomen Sukuna',
    arc: 'Shinjuku Showdown',
    releaseDate: '2023-09-24T00:00:00Z',
    pages: [
      'https://picsum.photos/seed/jjk1/800/1200',
      'https://picsum.photos/seed/jjk2/800/1200',
      'https://picsum.photos/seed/jjk3/800/1200',
      'https://picsum.photos/seed/jjk4/800/1200',
      'https://picsum.photos/seed/jjk5/800/1200'
    ],
    views: 1250000,
    likes: 45000,
    commentsCount: 1200
  },
  {
    id: 'ch-237',
    number: 237,
    title: 'Inhuman Makyo Shinjuku Showdown, Part 14',
    arc: 'Shinjuku Showdown',
    releaseDate: '2023-10-01T00:00:00Z',
    pages: [
      'https://picsum.photos/seed/jjk6/800/1200',
      'https://picsum.photos/seed/jjk7/800/1200',
      'https://picsum.photos/seed/jjk8/800/1200'
    ],
    views: 980000,
    likes: 32000,
    commentsCount: 850
  },
  {
    id: 'ch-1',
    number: 1,
    title: 'Ryomen Sukuna',
    arc: 'Introduction',
    releaseDate: '2018-03-05T00:00:00Z',
    pages: [
      'https://picsum.photos/seed/jjk9/800/1200',
      'https://picsum.photos/seed/jjk10/800/1200'
    ],
    views: 5000000,
    likes: 150000,
    commentsCount: 5000
  }
];

export const JJK_CHARACTERS: Character[] = [
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    alias: 'The Strongest Sorcerer',
    ability: 'Limitless & Six Eyes',
    domainExpansion: 'Unlimited Void',
    bio: 'The strongest jujutsu sorcerer in the world. He is a teacher at Tokyo Jujutsu High and the head of the Gojo Clan.',
    imageUrl: 'https://picsum.photos/seed/gojo/400/600',
    isFanFavorite: true,
    role: 'Supporting'
  },
  {
    id: 'yuji',
    name: 'Itadori Yuji',
    alias: 'Sukuna\'s Vessel',
    ability: 'Divergent Fist & Black Flash',
    domainExpansion: 'None (Yet)',
    bio: 'A high school student who swallowed a finger of Ryomen Sukuna, becoming his vessel. He joined Tokyo Jujutsu High to find and consume all of Sukuna\'s fingers.',
    imageUrl: 'https://picsum.photos/seed/yuji/400/600',
    isFanFavorite: true,
    role: 'Protagonist'
  },
  {
    id: 'sukuna',
    name: 'Ryomen Sukuna',
    alias: 'King of Curses',
    ability: 'Dismantle & Cleave',
    domainExpansion: 'Malevolent Shrine',
    bio: 'The undisputed King of Curses. A powerful sorcerer from the Heian era who became a cursed spirit after his death.',
    imageUrl: 'https://picsum.photos/seed/sukuna/400/600',
    isFanFavorite: true,
    role: 'Antagonist'
  }
];
