"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Image,
  Type,
  Palette,
  Sparkles,
  RotateCcw,
  RotateCw,
  SkipBack,
  Play,
  Pause,
  Download,
  Share2,
  Save,
  Crown,
  Heart,
  Glasses,
  Star,
  Smile,
  Sun,
  Moon,
  Zap,
  Move,
  RotateCw as Rotate,
  Trash2,
  Copy,
  Eye,
  Settings,
} from "lucide-react";
import useUser from "@/utils/useUser";
import useUpload from "@/utils/useUpload";

// Emoji library
const EMOJI_LIBRARY = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "😍",
  "🤩",
  "😘",
  "😗",
  "😚",
  "😙",
  "😋",
  "😛",
  "😜",
  "🤪",
  "😝",
  "🤑",
  "🤗",
  "🤭",
  "🤫",
  "🤔",
  "🤐",
  "🤨",
  "😐",
  "😑",
  "😶",
  "😏",
  "😒",
  "🙄",
  "😬",
  "🤥",
  "😔",
  "😪",
  "🤤",
  "😴",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "🥵",
  "🥶",
  "🥴",
  "😵",
  "🤯",
  "🤠",
  "🥳",
  "😎",
  "🤓",
  "🧐",
];

// Stickers library
const STICKERS = [
  { id: "crown", icon: Crown, name: "Crown", color: "#FFD700" },
  { id: "heart", icon: Heart, name: "Heart", color: "#FF69B4" },
  { id: "glasses", icon: Glasses, name: "Glasses", color: "#000000" },
  { id: "star", icon: Star, name: "Star", color: "#FFD700" },
  { id: "smile", icon: Smile, name: "Smile", color: "#FFA500" },
  { id: "sun", icon: Sun, name: "Sun", color: "#FFD700" },
  { id: "moon", icon: Moon, name: "Moon", color: "#C0C0C0" },
  { id: "zap", icon: Zap, name: "Lightning", color: "#FFFF00" },
];

// Animation types
const ANIMATIONS = [
  { id: "bounce", name: "Bounce" },
  { id: "shake", name: "Shake" },
  { id: "spin", name: "Spin" },
  { id: "glow", name: "Glow" },
  { id: "zoom", name: "Zoom" },
  { id: "pulse", name: "Pulse" },
  { id: "wobble", name: "Wobble" },
  { id: "flip", name: "Flip" },
];

// Filters
const FILTERS = [
  { id: "none", name: "None" },
  { id: "neon", name: "Neon Glow" },
  { id: "rainbow", name: "Rainbow" },
  { id: "blur", name: "Blur" },
  { id: "sepia", name: "Sepia" },
  { id: "grayscale", name: "Grayscale" },
  { id: "invert", name: "Invert" },
  { id: "brightness", name: "Bright" },
];

function MainComponent() {
  const [canvasElements, setCanvasElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [backgroundType, setBackgroundType] = useState("color"); // 'color', 'gradient', 'image'
  const [gradientColors, setGradientColors] = useState(["#FF6B6B", "#4ECDC4"]);
  const [currentTool, setCurrentTool] = useState("select");
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { data: user } = useUser();
  const [upload, { loading: uploadLoading }] = useUpload();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save state to history
  const saveToHistory = useCallback(() => {
    const newState = {
      elements: [...canvasElements],
      backgroundColor,
      backgroundType,
      gradientColors: [...gradientColors],
    };

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [
    canvasElements,
    backgroundColor,
    backgroundType,
    gradientColors,
    history,
    historyIndex,
  ]);

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setCanvasElements(prevState.elements);
      setBackgroundColor(prevState.backgroundColor);
      setBackgroundType(prevState.backgroundType);
      setGradientColors(prevState.gradientColors);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setCanvasElements(nextState.elements);
      setBackgroundColor(nextState.backgroundColor);
      setBackgroundType(nextState.backgroundType);
      setGradientColors(nextState.gradientColors);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Reset canvas
  const resetCanvas = () => {
    setCanvasElements([]);
    setSelectedElement(null);
    setBackgroundColor("#FFFFFF");
    setBackgroundType("color");
    setGradientColors(["#FF6B6B", "#4ECDC4"]);
    saveToHistory();
  };

  // Add emoji to canvas
  const addEmoji = (emoji) => {
    const newElement = {
      id: Date.now(),
      type: "emoji",
      content: emoji,
      x: 200,
      y: 200,
      scale: 1,
      rotation: 0,
      animation: "none",
      filter: "none",
    };
    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
    saveToHistory();
  };

  // Add sticker to canvas
  const addSticker = (sticker) => {
    const newElement = {
      id: Date.now(),
      type: "sticker",
      content: sticker,
      x: 200,
      y: 200,
      scale: 1,
      rotation: 0,
      animation: "none",
      filter: "none",
    };
    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
    saveToHistory();
  };

  // Add text to canvas
  const addText = () => {
    if (!textInput.trim()) return;

    const newElement = {
      id: Date.now(),
      type: "text",
      content: textInput,
      x: 200,
      y: 200,
      scale: 1,
      rotation: 0,
      fontSize,
      fontFamily,
      color: textColor,
      animation: "none",
      filter: "none",
    };
    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
    setTextInput("");
    saveToHistory();
  };

  // Upload image/GIF
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await upload({ file });
      if (result.url) {
        const newElement = {
          id: Date.now(),
          type: "image",
          content: result.url,
          x: 200,
          y: 200,
          scale: 1,
          rotation: 0,
          animation: "none",
          filter: "none",
        };
        setCanvasElements([...canvasElements, newElement]);
        setSelectedElement(newElement.id);
        saveToHistory();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Update selected element
  const updateElement = (updates) => {
    if (!selectedElement) return;

    setCanvasElements((elements) =>
      elements.map((el) =>
        el.id === selectedElement ? { ...el, ...updates } : el,
      ),
    );
  };

  // Delete selected element
  const deleteElement = () => {
    if (!selectedElement) return;

    setCanvasElements((elements) =>
      elements.filter((el) => el.id !== selectedElement),
    );
    setSelectedElement(null);
    saveToHistory();
  };

  // Duplicate selected element
  const duplicateElement = () => {
    if (!selectedElement) return;

    const element = canvasElements.find((el) => el.id === selectedElement);
    if (element) {
      const newElement = {
        ...element,
        id: Date.now(),
        x: element.x + 20,
        y: element.y + 20,
      };
      setCanvasElements([...canvasElements, newElement]);
      setSelectedElement(newElement.id);
      saveToHistory();
    }
  };

  // Generate background style
  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case "gradient":
        return {
          background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        };
      case "image":
        return {
          backgroundImage: `url(${backgroundColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      default:
        return { backgroundColor };
    }
  };

  // Get animation class
  const getAnimationClass = (animation) => {
    switch (animation) {
      case "bounce":
        return "animate-bounce";
      case "shake":
        return "animate-pulse";
      case "spin":
        return "animate-spin";
      case "glow":
        return "animate-pulse";
      case "zoom":
        return "animate-ping";
      case "pulse":
        return "animate-pulse";
      default:
        return "";
    }
  };

  // Get filter style
  const getFilterStyle = (filter) => {
    switch (filter) {
      case "neon":
        return { filter: "drop-shadow(0 0 10px currentColor)" };
      case "rainbow":
        return {
          filter: "hue-rotate(0deg)",
          animation: "rainbow 2s linear infinite",
        };
      case "blur":
        return { filter: "blur(2px)" };
      case "sepia":
        return { filter: "sepia(100%)" };
      case "grayscale":
        return { filter: "grayscale(100%)" };
      case "invert":
        return { filter: "invert(100%)" };
      case "brightness":
        return { filter: "brightness(150%)" };
      default:
        return {};
    }
  };

  // Save creation
  const saveCreation = async () => {
    if (!user) {
      alert("Please sign in to save your creation");
      return;
    }

    const title = prompt("Enter a title for your creation:");
    if (!title) return;

    const description = prompt("Enter a description (optional):") || "";

    try {
      // Here you would capture the canvas as an image/GIF
      // For now, we'll use a placeholder
      const creationData = {
        elements: canvasElements,
        backgroundColor,
        backgroundType,
        gradientColors,
      };

      const response = await fetch("/api/creations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          data_url: "placeholder-url", // Would be actual GIF URL
          design_data: creationData,
          is_public: true,
        }),
      });

      if (response.ok) {
        alert("Creation saved successfully!");
      } else {
        alert("Failed to save creation");
      }
    } catch (error) {
      console.error("Error saving creation:", error);
      alert("Failed to save creation");
    }
  };

  const selectedElementData = selectedElement
    ? canvasElements.find((el) => el.id === selectedElement)
    : null;

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100"}`}
    >
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Thala ki Ladki
              </span>
            </a>
            <span className="text-gray-500 dark:text-gray-400">Editor</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={resetCanvas}
              className="p-2 rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={saveCreation}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Tools Panel */}
        {!isPreviewMode && (
          <div className="w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Upload Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  Upload
                </h3>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Emoji/GIF
                </button>
              </div>

              {/* Emoji Library */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  Emoji Library
                </h3>
                <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                  {EMOJI_LIBRARY.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stickers */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  Stickers
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {STICKERS.map((sticker) => (
                    <button
                      key={sticker.id}
                      onClick={() => addSticker(sticker)}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
                      title={sticker.name}
                    >
                      <sticker.icon
                        className="w-6 h-6"
                        style={{ color: sticker.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Tool */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  Add Text
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      placeholder="Size"
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  </div>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                  </select>
                  <button
                    onClick={addText}
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                  >
                    <Type className="w-5 h-5" />
                    Add Text
                  </button>
                </div>
              </div>

              {/* Background */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  Background
                </h3>
                <div className="space-y-3">
                  <select
                    value={backgroundType}
                    onChange={(e) => setBackgroundType(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="color">Solid Color</option>
                    <option value="gradient">Gradient</option>
                  </select>

                  {backgroundType === "color" && (
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    />
                  )}

                  {backgroundType === "gradient" && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="color"
                        value={gradientColors[0]}
                        onChange={(e) =>
                          setGradientColors([e.target.value, gradientColors[1]])
                        }
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      />
                      <input
                        type="color"
                        value={gradientColors[1]}
                        onChange={(e) =>
                          setGradientColors([gradientColors[0], e.target.value])
                        }
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Element Properties */}
              {selectedElementData && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                    Element Properties
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button
                        onClick={duplicateElement}
                        className="flex-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                      <button
                        onClick={deleteElement}
                        className="flex-1 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Scale
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={selectedElementData.scale}
                        onChange={(e) =>
                          updateElement({ scale: parseFloat(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Rotation
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedElementData.rotation}
                        onChange={(e) =>
                          updateElement({ rotation: parseInt(e.target.value) })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Animation
                      </label>
                      <select
                        value={selectedElementData.animation}
                        onChange={(e) =>
                          updateElement({ animation: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="none">None</option>
                        {ANIMATIONS.map((anim) => (
                          <option key={anim.id} value={anim.id}>
                            {anim.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Filter
                      </label>
                      <select
                        value={selectedElementData.filter}
                        onChange={(e) =>
                          updateElement({ filter: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        {FILTERS.map((filter) => (
                          <option key={filter.id} value={filter.id}>
                            {filter.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative">
            <div
              ref={canvasRef}
              className="w-[600px] h-[600px] border-2 border-gray-300 dark:border-gray-600 rounded-lg relative overflow-hidden cursor-crosshair"
              style={getBackgroundStyle()}
            >
              {canvasElements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move select-none ${
                    selectedElement === element.id ? "ring-2 ring-blue-500" : ""
                  } ${getAnimationClass(element.animation)}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    transform: `scale(${element.scale}) rotate(${element.rotation}deg)`,
                    transformOrigin: "center",
                    ...getFilterStyle(element.filter),
                  }}
                  onClick={() => setSelectedElement(element.id)}
                  onMouseDown={(e) => {
                    // Simple drag implementation
                    const startX = e.clientX - element.x;
                    const startY = e.clientY - element.y;

                    const handleMouseMove = (e) => {
                      updateElement({
                        x: e.clientX - startX,
                        y: e.clientY - startY,
                      });
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener(
                        "mousemove",
                        handleMouseMove,
                      );
                      document.removeEventListener("mouseup", handleMouseUp);
                      saveToHistory();
                    };

                    document.addEventListener("mousemove", handleMouseMove);
                    document.addEventListener("mouseup", handleMouseUp);
                  }}
                >
                  {element.type === "emoji" && (
                    <span className="text-6xl">{element.content}</span>
                  )}
                  {element.type === "sticker" && (
                    <element.content.icon
                      className="w-12 h-12"
                      style={{ color: element.content.color }}
                    />
                  )}
                  {element.type === "text" && (
                    <span
                      style={{
                        fontSize: element.fontSize,
                        fontFamily: element.fontFamily,
                        color: element.color,
                      }}
                    >
                      {element.content}
                    </span>
                  )}
                  {element.type === "image" && (
                    <img
                      src={element.content}
                      alt="Uploaded"
                      className="max-w-[200px] max-h-[200px] object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
