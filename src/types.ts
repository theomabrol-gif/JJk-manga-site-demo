export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bookmarks: string[]; // Array of chapter IDs
  readingProgress: { [chapterId: string]: number }; // chapterId -> scroll position or page index
  lastReadChapterId?: string;
  role: 'user' | 'admin';
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[]; // URLs to images
  releaseDate: string;
  arc: string;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface Character {
  id: string;
  name: string;
  alias?: string;
  ability: string;
  domainExpansion?: string;
  bio: string;
  imageUrl: string;
  isFanFavorite: boolean;
  role: 'Protagonist' | 'Antagonist' | 'Supporting';
}

export interface Comment {
  id: string;
  chapterId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: string;
}
