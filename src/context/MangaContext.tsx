import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Chapter, Character } from '../types';
import { JJK_CHAPTERS, JJK_CHARACTERS } from '../constants';

interface MangaContextType {
  chapters: Chapter[];
  characters: Character[];
  loading: boolean;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chapters, setChapters] = useState<Chapter[]>(JJK_CHAPTERS); // Fallback to constants
  const [characters, setCharacters] = useState<Character[]>(JJK_CHARACTERS); // Fallback to constants
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time chapters
    const chaptersQuery = query(collection(db, 'chapters'), orderBy('number', 'desc'));
    const unsubscribeChapters = onSnapshot(chaptersQuery, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
        setChapters(data);
      }
      setLoading(false);
    }, (error) => {
      console.warn('Firestore chapters error (using fallback):', error);
      setLoading(false);
    });

    // Real-time characters
    const charactersQuery = query(collection(db, 'characters'));
    const unsubscribeCharacters = onSnapshot(charactersQuery, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Character));
        setCharacters(data);
      }
    }, (error) => {
      console.warn('Firestore characters error (using fallback):', error);
    });

    return () => {
      unsubscribeChapters();
      unsubscribeCharacters();
    };
  }, []);

  return (
    <MangaContext.Provider value={{ chapters, characters, loading }}>
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (context === undefined) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
};
