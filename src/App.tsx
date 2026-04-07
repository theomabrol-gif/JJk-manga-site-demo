import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MangaProvider } from './context/MangaContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Library from './pages/Library';
import Reader from './pages/Reader';
import Characters from './pages/Characters';

export default function App() {
  return (
    <AuthProvider>
      <MangaProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/reader/:chapterId" element={<Reader />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MangaProvider>
    </AuthProvider>
  );
}
