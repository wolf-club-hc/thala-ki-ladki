'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Trophy, Heart, Eye, Star, Medal, Crown, Award, TrendingUp } from 'lucide-react';
import useUser from '@/utils/useUser';

function MainComponent() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('likes'); // 'likes', 'views', 'recent'
  const [darkMode, setDarkMode] = useState(false);
  const { data: user } = useUser();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/creations?public=true&limit=50');
      if (response.ok) {
        const data = await response.json();
        setCreations(data.creations || []);
      }
    } catch (error) {
      console.error('Error fetching creations:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedCreations = [...creations].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return (b.like_count || 0) - (a.like_count || 0);
      case 'views':
        return (b.view_count || 0) - (a.view_count || 0);
      case 'recent':
        return new Date(b.created_at) - new Date(a.created_at);
      default:
        return 0;
    }
  });

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };

  const likeCreation = async (creationId) => {
    if (!user) {
      alert('Please sign in to like creations');
      return;
    }

    try {
      const response = await fetch(`/api/creations/${creationId}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Refresh the data
        fetchCreations();
      }
    } catch (error) {
      console.error('Error liking creation:', error);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100'}`}>
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🏆</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">⭐</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🥇</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{animationDelay: '1s'}}>✨</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🎖️</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-pulse" style={{animationDelay: '2s'}}>💫</div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-gray-800 dark:text-white">Thala ki Ladki</span>
              </a>
              <span className="text-gray-500 dark:text-gray-400">Leaderboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {user.email}
                </span>
              ) : (
                <div className="flex gap-2">
                  <a
                    href="/account/signin"
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Sign In
                  </a>
                  <a
                    href="/account/signup"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
            }`}>
              🏆 Leaderboard
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Discover the most popular emoji GIFs created by our community
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <button
                onClick={() => setSortBy('likes')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'likes'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Heart className="w-4 h-4" />
                Most Liked
              </button>
              <button
                onClick={() => setSortBy('views')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'views'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Eye className="w-4 h-4" />
                Most Viewed
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'recent'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Most Recent
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : sortedCreations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              No creations yet
            </h3>
            <p className={`mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Be the first to create and share an amazing emoji GIF!
            </p>
            <a
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Sparkles className="w-6 h-6" />
              Start Creating
            </a>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {sortedCreations.length >= 3 && (
              <div className="mb-16">
                <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🥇 Top 3 Champions
                </h2>
                <div className="flex justify-center items-end gap-8 max-w-4xl mx-auto">
                  {/* Second Place */}
                  <div className="text-center">
                    <div className={`relative p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20 transform hover:scale-105 transition-all`}>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      {sortedCreations[1]?.thumbnail_url && (
                        <img
                          src={sortedCreations[1].thumbnail_url}
                          alt={sortedCreations[1].title}
                          className="w-24 h-24 object-cover rounded-lg mb-3 mx-auto"
                        />
                      )}
                      <h3 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {sortedCreations[1]?.title}
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {sortBy === 'likes' ? `${sortedCreations[1]?.like_count || 0} likes` : 
                         sortBy === 'views' ? `${sortedCreations[1]?.view_count || 0} views` : 
                         'Recent'}
                      </p>
                    </div>
                  </div>

                  {/* First Place */}
                  <div className="text-center">
                    <div className={`relative p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-xl backdrop-blur-lg border border-white/20 transform hover:scale-105 transition-all`}>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                      {sortedCreations[0]?.thumbnail_url && (
                        <img
                          src={sortedCreations[0].thumbnail_url}
                          alt={sortedCreations[0].title}
                          className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
                        />
                      )}
                      <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {sortedCreations[0]?.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {sortBy === 'likes' ? `${sortedCreations[0]?.like_count || 0} likes` : 
                         sortBy === 'views' ? `${sortedCreations[0]?.view_count || 0} views` : 
                         'Most Recent'}
                      </p>
                    </div>
                  </div>

                  {/* Third Place */}
                  <div className="text-center">
                    <div className={`relative p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20 transform hover:scale-105 transition-all`}>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      {sortedCreations[2]?.thumbnail_url && (
                        <img
                          src={sortedCreations[2].thumbnail_url}
                          alt={sortedCreations[2].title}
                          className="w-24 h-24 object-cover rounded-lg mb-3 mx-auto"
                        />
                      )}
                      <h3 className={`font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {sortedCreations[2]?.title}
                      </h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {sortBy === 'likes' ? `${sortedCreations[2]?.like_count || 0} likes` : 
                         sortBy === 'views' ? `${sortedCreations[2]?.view_count || 0} views` : 
                         'Recent'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className={`rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20 overflow-hidden`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Full Rankings
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedCreations.map((creation, index) => (
                  <div
                    key={creation.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadge(index)}`}>
                        {getRankIcon(index)}
                      </div>

                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        {creation.thumbnail_url ? (
                          <img
                            src={creation.thumbnail_url}
                            alt={creation.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {creation.title}
                        </h3>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {creation.description}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          by {creation.author_name || creation.author_email}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className={`w-4 h-4 ${creation.is_liked_by_user ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            {creation.like_count || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            {creation.view_count || 0}
                          </span>
                        </div>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={() => likeCreation(creation.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          creation.is_liked_by_user
                            ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${creation.is_liked_by_user ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20`}>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Ready to Join the Competition?
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create your own amazing emoji GIF and climb the leaderboard!
                </p>
                <a
                  href="/editor"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Sparkles className="w-6 h-6" />
                  Start Creating
                </a>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className={`relative z-10 mt-20 py-8 ${darkMode ? 'bg-gray-800' : 'bg-white/50'} backdrop-blur-lg`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 Thala ki Ladki. Made with ❤️ for emoji lovers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;