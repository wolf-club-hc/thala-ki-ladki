'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Users, Heart, Zap, Target, Award, Code, Palette } from 'lucide-react';

function MainComponent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100'}`}>
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">👥</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">💡</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{animationDelay: '1s'}}>✨</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🎯</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-pulse" style={{animationDelay: '2s'}}>🏆</div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">Thala ki Ladki</span>
            </a>
            <span className="text-gray-500 dark:text-gray-400">About Us</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>
            About Thala ki Ladki
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            We're passionate about bringing joy and creativity to digital communication through emoji GIFs
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className={`p-8 md:p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20`}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-lg leading-relaxed text-center max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              At Thala ki Ladki, we believe that every emoji has a story to tell. Our mission is to empower users 
              to create personalized, animated emoji GIFs that express their unique personality and emotions. 
              We're democratizing digital art creation by making professional-quality GIF editing accessible to everyone, 
              regardless of their technical background.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            What Makes Us Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Intuitive Design
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Our user-friendly interface makes it easy for anyone to create stunning emoji GIFs without any design experience.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Powerful Tools
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Advanced editing features including animations, filters, stickers, and text tools to bring your ideas to life.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Community Driven
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your creations with our vibrant community and discover amazing GIFs made by other users.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quality Templates
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Start with our professionally designed templates or create your masterpiece from scratch.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Made with Love
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Every feature is crafted with care to ensure the best possible user experience and creative freedom.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border border-white/20`}>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Modern Technology
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Built with cutting-edge web technologies to ensure fast, reliable, and responsive performance.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className={`p-8 md:p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20`}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Story
              </h2>
              <p className={`text-lg leading-relaxed max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Thala ki Ladki was born from a simple idea: making emoji communication more expressive and fun. 
                Our team of passionate developers and designers came together to create a platform that combines 
                the universal language of emojis with the power of animation and personalization.
              </p>
              <br />
              <p className={`text-lg leading-relaxed max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                We believe that creativity should be accessible to everyone, and that's why we've built tools 
                that are both powerful and easy to use. Whether you're a social media enthusiast, a content creator, 
                or just someone who loves to express themselves through digital art, Thala ki Ladki is here to 
                help you bring your ideas to life.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className={`p-8 md:p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg backdrop-blur-lg border border-white/20`}>
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Ready to Start Creating?
            </h2>
            <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Join thousands of users who are already creating amazing emoji GIFs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/editor"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Sparkles className="w-6 h-6" />
                Start Creating
              </a>
              <a
                href="/templates"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Palette className="w-6 h-6" />
                Browse Templates
              </a>
            </div>
          </div>
        </section>
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