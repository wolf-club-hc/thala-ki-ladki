'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Search, Filter, Play, Heart, Eye } from 'lucide-react';
import useUser from '@/utils/useUser';

function MainComponent() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const { data: user } = useUser();

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'fun', name: 'Fun' },
    { id: 'animals', name: 'Animals' },
    { id: 'love', name: 'Love' },
    { id: 'general', name: 'General' }
  ];

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? '/api/templates' 
        : `/api/templates?category=${selectedCategory}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    fetchTemplates();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [selectedCategory]);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const useTemplate = (template) => {
    // Store template data in localStorage and navigate to editor
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    window.location.href = '/editor';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100'}`}>
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🎨</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🖼️</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{animationDelay: '1s'}}>🎭</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
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
              <span className="text-gray-500 dark:text-gray-400">Templates</span>
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
              Template Gallery
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Choose from our collection of pre-made emoji GIF templates
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:outline-none bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:outline-none bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-800 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Templates Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              No templates found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white/80 hover:bg-white'
                } shadow-lg hover:shadow-2xl backdrop-blur-lg border border-white/20`}
              >
                {/* Template Preview */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={template.thumbnail_url}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={() => useTemplate(template)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100"
                    >
                      <Play className="w-5 h-5" />
                      Use Template
                    </button>
                  </div>

                  {/* Featured Badge */}
                  {template.is_featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {template.name}
                  </h3>
                  
                  {template.description && (
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {template.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {template.category}
                    </span>
                    
                    <button
                      onClick={() => useTemplate(template)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                    >
                      <Play className="w-4 h-4" />
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Can't find what you're looking for?
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start from scratch and create your own unique emoji GIF design
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