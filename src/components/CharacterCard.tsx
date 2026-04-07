import React from 'react';
import { Star, Shield, Zap } from 'lucide-react';
import { Character } from '../types';
import { motion } from 'motion/react';

interface CharacterCardProps {
  character: Character;
  index?: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-purple-900/20 hover:border-red-500/50 transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {character.isFanFavorite && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black p-1.5 rounded-full shadow-lg">
            <Star className="w-4 h-4 fill-current" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-2 py-0.5 bg-red-600/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">
            {character.role}
          </span>
          <h3 className="text-2xl font-black text-white leading-tight group-hover:text-red-400 transition-colors">
            {character.name}
          </h3>
          <p className="text-gray-400 text-sm italic">{character.alias}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-400">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Ability</span>
          </div>
          <p className="text-sm text-gray-300 font-medium">{character.ability}</p>
        </div>

        {character.domainExpansion && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Domain Expansion</span>
            </div>
            <p className="text-sm text-gray-300 font-medium">{character.domainExpansion}</p>
          </div>
        )}

        <p className="text-xs text-gray-500 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {character.bio}
        </p>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
