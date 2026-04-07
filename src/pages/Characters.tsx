import React, { useState } from 'react';
import { useManga } from '../context/MangaContext';
import CharacterCard from '../components/CharacterCard';
import { Search, Users, Shield, Zap, Sword } from 'lucide-react';
import { cn } from '../lib/utils';

const Characters: React.FC = () => {
  const { characters } = useManga();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const roles = ['All', 'Protagonist', 'Antagonist', 'Supporting'];

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         char.alias?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || char.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-black min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">
            SORCERERS & <span className="text-red-600">CURSES</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The world of Jujutsu Kaisen is filled with powerful individuals and terrifying entities. Explore the profiles of the strongest sorcerers and the most dangerous cursed spirits.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-center">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Search characters by name or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-red-900/30 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-red-500 transition-all shadow-lg"
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-900/50 p-1.5 rounded-2xl border border-red-900/20">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  selectedRole === role
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-gray-500 hover:text-white"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Total Characters', value: characters.length, icon: Users, color: 'text-blue-400' },
            { label: 'Special Grade', value: '4', icon: Zap, color: 'text-yellow-400' },
            { label: 'Domain Users', value: '12', icon: Shield, color: 'text-purple-400' },
            { label: 'Active Battles', value: '3', icon: Sword, color: 'text-red-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center">
              <stat.icon className={cn("w-6 h-6 mb-2", stat.color)} />
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharacters.map((character, idx) => (
            <CharacterCard key={character.id} character={character} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
