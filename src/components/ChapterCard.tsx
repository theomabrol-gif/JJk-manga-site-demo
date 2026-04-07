import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, MessageSquare, Calendar } from 'lucide-react';
import { Chapter } from '../types';
import { formatDate } from '../lib/utils';
import { motion } from 'motion/react';

interface ChapterCardProps {
  chapter: Chapter;
  index?: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-900 rounded-xl overflow-hidden border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300"
    >
      <Link to={`/reader/${chapter.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={chapter.pages[0]}
            alt={chapter.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Chapter Number Badge */}
          <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
            CH. {chapter.number}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
            {chapter.title}
          </h3>
          <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(chapter.releaseDate)}
          </p>

          <div className="flex items-center justify-between text-gray-500 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {(chapter.views / 1000).toFixed(1)}k
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {(chapter.likes / 1000).toFixed(1)}k
              </span>
            </div>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {chapter.commentsCount}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChapterCard;
