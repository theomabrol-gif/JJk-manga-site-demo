import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-purple-900/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text text-transparent">
                JJK MANGA
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              The ultimate destination for Jujutsu Kaisen fans. Read the latest chapters, explore your favorite characters, and join the community of sorcerers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/library" className="text-gray-400 hover:text-white transition-colors">Manga Library</Link></li>
              <li><Link to="/characters" className="text-gray-400 hover:text-white transition-colors">Characters</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                Contact Us
              </a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 JJK Manga Platform. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs italic">
            Disclaimer: This is a fan-made project. All Jujutsu Kaisen content belongs to Gege Akutami and Shueisha.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
