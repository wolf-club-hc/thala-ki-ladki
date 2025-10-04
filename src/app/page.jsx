"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Palette,
  Users,
  Mail,
  Moon,
  Sun,
  Play,
  Star,
  Heart,
} from "lucide-react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [featuredCreations, setFeaturedCreations] = useState([]);
  const { data: user } = useUser();

  useEffect(() => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }

    // Fetch featured creations
    fetchFeaturedCreations();
  }, []);

  const fetchFeaturedCreations = async () => {
    try {
      const response = await fetch("/api/creations?public=true&limit=6");
      if (response.ok) {
        const data = await response.json();
        setFeaturedCreations(data.creations || []);
      }
    } catch (error) {
      console.error("Error fetching featured creations:", error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navigateToEditor = () => {
    window.location.href = "/editor";
  };

  const navigateToTemplates = () => {
    window.location.href = "/templates";
  };

  const navigateToAbout = () => {
    window.location.href = "/about";
  };

  const navigateToContact = () => {
    window.location.href = "/contact";
  };

  const navigateToLeaderboard = () => {
    window.location.href = "/leaderboard";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100"}`}
    >
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">
          😊
        </div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">
          🎉
        </div>
        <div
          className="absolute bottom-20 left-20 text-5xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-10 right-10 text-4xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🚀
        </div>
        <div
          className="absolute top-1/2 left-5 text-3xl animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          🎨
        </div>
        <div
          className="absolute top-1/3 right-5 text-4xl animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          🌟
        </div>
        <div
          className="absolute top-2/3 left-1/4 text-3xl animate-bounce"
          style={{ animationDelay: "2.5s" }}
        >
          💫
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 text-4xl animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          🎭
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Thala ki Ladki
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Welcome, {user.email}
                </span>
                <a
                  href="/account/logout"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white/70 text-gray-700 hover:bg-white"
                  }`}
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="flex gap-2">
                <a
                  href="/account/signin"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white/70 text-gray-700 hover:bg-white"
                  }`}
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Sign Up
                </a>
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${
              darkMode
                ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}
          >
            Thala ki Ladki
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Design your own Emoji GIFs
          </p>
          <p
            className={`text-lg mb-12 max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Create amazing animated emoji GIFs with our powerful editor. Add
            stickers, text, animations, and effects to make your emojis come
            alive!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={navigateToEditor}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-6 h-6" />
              Start Designing
            </button>

            <button
              onClick={navigateToTemplates}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
            >
              <Palette className="w-6 h-6" />
              Browse Templates
            </button>

            <button
              onClick={navigateToAbout}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
            >
              <Users className="w-6 h-6" />
              About Us
            </button>

            <button
              onClick={navigateToContact}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
            >
              <Mail className="w-6 h-6" />
              Contact
            </button>
          </div>
        </div>

        {/* Featured Creations */}
        {featuredCreations.length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2
                className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Featured Creations
              </h2>
              <button
                onClick={navigateToLeaderboard}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
              >
                <Star className="w-5 h-5" />
                View Leaderboard
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCreations.map((creation) => (
                <div
                  key={creation.id}
                  className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white/80 hover:bg-white"
                  } shadow-lg hover:shadow-xl`}
                >
                  {creation.thumbnail_url && (
                    <img
                      src={creation.thumbnail_url}
                      alt={creation.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3
                    className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
                  >
                    {creation.title}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {creation.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                    >
                      by {creation.author_name || creation.author_email}
                    </span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {creation.like_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white/80"} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Powerful Editor
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Full-featured canvas editor with drag-and-drop stickers, text
              tools, animations, and effects.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white/80"} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Amazing Effects
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Apply stunning animations like bounce, shake, spin, glow, and
              filters like neon and rainbow.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-white/80"} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3
              className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Share & Discover
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Share your creations with the community and discover amazing GIFs
              made by other users.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`relative z-10 mt-20 py-8 ${darkMode ? "bg-gray-800" : "bg-white/50"} backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2024 Thala ki Ladki. Made with ❤️ for emoji lovers everywhere.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
