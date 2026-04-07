import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useManga } from '../context/MangaContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, Settings, Maximize2, MessageSquare, Heart, Bookmark, Share2 } from 'lucide-react';
import { doc, updateDoc, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Comment } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Reader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { chapters } = useManga();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [showControls, setShowControls] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const chapter = chapters.find(c => c.id === chapterId);
  const prevChapter = chapters.find(c => c.number === (chapter?.number || 0) - 1);
  const nextChapter = chapters.find(c => c.number === (chapter?.number || 0) + 1);

  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chapterId && profile) {
      setIsBookmarked(profile.bookmarks.includes(chapterId));
      
      // Update last read
      const userRef = doc(db, 'users', profile.uid);
      updateDoc(userRef, { lastReadChapterId: chapterId }).catch(console.error);
    }
  }, [chapterId, profile]);

  useEffect(() => {
    if (!chapterId) return;
    
    const q = query(
      collection(db, 'comments'),
      where('chapterId', '==', chapterId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      setComments(data);
    });

    return () => unsubscribe();
  }, [chapterId]);

  const handleBookmark = async () => {
    if (!user || !profile || !chapterId) return;
    const userRef = doc(db, 'users', user.uid);
    const newBookmarks = isBookmarked 
      ? profile.bookmarks.filter(id => id !== chapterId)
      : [...profile.bookmarks, chapterId];
    
    await updateDoc(userRef, { bookmarks: newBookmarks });
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || !chapterId) return;

    await addDoc(collection(db, 'comments'), {
      chapterId,
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      text: newComment,
      createdAt: serverTimestamp()
    });
    setNewComment('');
  };

  if (!chapter) return <div className="bg-black min-h-screen flex items-center justify-center text-white">Chapter not found</div>;

  return (
    <div className="bg-black min-h-screen relative" ref={readerRef}>
      {/* Top Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-900/30 p-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/library" className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </Link>
                <div>
                  <h1 className="text-white font-bold text-lg leading-tight">Chapter {chapter.number}</h1>
                  <p className="text-gray-500 text-xs">{chapter.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBookmark}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isBookmarked ? "text-purple-500 bg-purple-500/10" : "text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manga Pages */}
      <div 
        className="max-w-3xl mx-auto pt-24 pb-12 px-2 space-y-2"
        onClick={() => setShowControls(!showControls)}
      >
        {chapter.pages.map((page, idx) => (
          <img
            key={idx}
            src={page}
            alt={`Page ${idx + 1}`}
            className="w-full h-auto rounded-lg shadow-2xl"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-3xl mx-auto px-4 py-12 border-t border-purple-900/30">
        <div className="flex items-center justify-between gap-4 mb-16">
          {prevChapter ? (
            <Link
              to={`/reader/${prevChapter.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-bold transition-all border border-purple-900/20"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Chapter
            </Link>
          ) : <div className="flex-1" />}
          
          {nextChapter ? (
            <Link
              to={`/reader/${nextChapter.id}`}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-purple-600/20"
            >
              Next Chapter
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Comments Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-purple-500" />
              Discussion ({comments.length})
            </h2>
          </div>

          {user ? (
            <form onSubmit={handleComment} className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this chapter..."
                className="w-full bg-gray-900 border border-purple-900/30 rounded-2xl p-4 text-white focus:outline-none focus:border-purple-500 transition-all min-h-[120px]"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-bold transition-all"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <div className="bg-gray-900/50 border border-dashed border-purple-900/30 rounded-2xl p-8 text-center">
              <p className="text-gray-400 mb-4">You must be logged in to join the discussion.</p>
              <button className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                Login with Google
              </button>
            </div>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 p-4 bg-gray-900/30 rounded-2xl border border-purple-900/10">
                <img
                  src={comment.userPhoto || 'https://picsum.photos/seed/user/40/40'}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full border border-purple-500/30"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-bold text-sm">{comment.userName}</h4>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest">
                      {comment.createdAt ? 'Just now' : 'Recently'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reader;
