import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, LogIn, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const { user, profile, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Manga', path: '/library' },
    { name: 'Characters', path: '/characters' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text text-transparent">
                JJK MANGA
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.path
                      ? "text-purple-400 bg-purple-900/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">{profile?.displayName}</span>
                  <button onClick={logout} className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                    Logout
                  </button>
                </div>
                <img
                  src={profile?.photoURL || 'https://picsum.photos/seed/user/40/40'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-purple-500/50"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-b border-purple-900/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === link.path
                      ? "text-purple-400 bg-purple-900/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={logout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-800"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={login}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:bg-gray-800"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
