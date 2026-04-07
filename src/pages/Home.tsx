import React from 'react';
import Hero from '../components/Hero';
import ChapterCard from '../components/ChapterCard';
import CharacterCard from '../components/CharacterCard';
import { useManga } from '../context/MangaContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const { chapters, characters, loading } = useManga();
  const { profile } = useAuth();

  const latestChapters = chapters.slice(0, 4);
  const featuredCharacters = characters.slice(0, 3);

  return (
    <div className="bg-black min-h-screen">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Continue Reading (If logged in and has progress) */}
        {profile && profile.lastReadChapterId && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Continue Reading</h2>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-purple-900/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8">
              <img 
                src={chapters.find(c => c.id === profile.lastReadChapterId)?.pages[0] || 'https://picsum.photos/seed/jjk/200/300'} 
                alt="Last Read"
                className="w-32 h-48 object-cover rounded-xl shadow-2xl"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Chapter {chapters.find(c => c.id === profile.lastReadChapterId)?.number}: {chapters.find(c => c.id === profile.lastReadChapterId)?.title}
                </h3>
                <p className="text-gray-400 mb-6">Pick up right where you left off. The battle continues!</p>
                <Link 
                  to={`/reader/${profile.lastReadChapterId}`}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
                >
                  Resume Reading
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Chapters */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Latest Chapters</h2>
            </div>
            <Link to="/library" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {latestChapters.map((chapter, idx) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={idx} />
            ))}
          </div>
        </section>

        {/* Characters Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Popular Characters</h2>
            </div>
            <Link to="/characters" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors">
              All Characters <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCharacters.map((character, idx) => (
              <CharacterCard key={character.id} character={character} index={idx} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        {!profile && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-black to-red-900 p-12 text-center border border-purple-500/20">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                JOIN THE <span className="text-purple-400">SORCERERS</span> COMMUNITY
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Create an account to bookmark your favorite chapters, track your reading progress, and join the discussion with thousands of fans.
              </p>
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-lg hover:bg-purple-400 transition-all transform hover:scale-105 shadow-xl shadow-purple-500/20">
                SIGN UP NOW
              </button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] translate-x-1/2 translate-y-1/2" />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
