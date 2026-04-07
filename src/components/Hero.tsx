import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Info } from 'lucide-react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/jjk-hero/1920/1080?blur=2"
          alt="JJK Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded">
              Trending Now
            </span>
            <span className="text-purple-400 text-sm font-medium">Arc: Shinjuku Showdown</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            JUJUTSU <br />
            <span className="bg-gradient-to-r from-purple-500 to-red-600 bg-clip-text text-transparent">
              KAISEN
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 line-clamp-3">
            In a world where Cursed Spirits feed on unsuspecting humans, fragments of the legendary and feared demon Ryomen Sukuna have been lost and scattered about. Should any demon consume Sukuna's body parts, the power they gain could destroy the world as we know it.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/reader/ch-236"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-600/25"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Reading
            </Link>
            <Link
              to="/library"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-md transition-all border border-white/10"
            >
              <BookOpen className="w-5 h-5" />
              Library
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default Hero;
