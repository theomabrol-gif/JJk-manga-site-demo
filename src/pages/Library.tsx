import React, { useState, useMemo } from 'react';
import { useManga } from '../context/MangaContext';
import ChapterCard from '../components/ChapterCard';
import { Search, Filter, Grid, List } from 'lucide-react';
import { cn } from '../lib/utils';

const Library: React.FC = () => {
  const { chapters, loading } = useManga();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArc, setSelectedArc] = useState('All');

  const arcs = useMemo(() => {
    const uniqueArcs = Array.from(new Set(chapters.map(c => c.arc)));
    return ['All', ...uniqueArcs];
  }, [chapters]);

  const filteredChapters = useMemo(() => {
    return chapters.filter(chapter => {
      const matchesSearch = chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           chapter.number.toString().includes(searchQuery);
      const matchesArc = selectedArc === 'All' || chapter.arc === selectedArc;
      return matchesSearch && matchesArc;
    });
  }, [chapters, searchQuery, selectedArc]);

  return (
    <div className="bg-black min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">Manga Library</h1>
          <p className="text-gray-400 max-w-2xl">
            Explore the complete collection of Jujutsu Kaisen chapters. From the very first curse to the latest battles in Shinjuku.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by chapter title or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-purple-900/30 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-purple-500 transition-all shadow-lg"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-gray-400 mr-2 whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Arcs:</span>
            </div>
            {arcs.map(arc => (
              <button
                key={arc}
                onClick={() => setSelectedArc(arc)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border",
                  selectedArc === arc
                    ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20"
                    : "bg-gray-900 text-gray-400 border-purple-900/20 hover:border-purple-500/50"
                )}
              >
                {arc}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredChapters.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredChapters.map((chapter, idx) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-purple-900/30">
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No chapters found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
