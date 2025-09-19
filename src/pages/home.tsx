import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  Gift,
  Globe,
  Send,
  ImagePlus,
  User
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-xl font-semibold">Rork</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-white hover:text-gray-300">FAQ</a>
          <a href="#" className="text-white hover:text-gray-300">Blog</a>
          <a href="#" className="text-white hover:text-gray-300">X</a>
          <a href="#" className="text-white hover:text-gray-300">Pricing</a>
          
          {/* Get free credits button */}
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Get free credits</span>
          </button>
          
          {/* User profile */}
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="text-center max-w-4xl">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Build native mobile apps, fast.
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>
          
          {/* Input Field */}
          <div className="relative max-w-3xl mx-auto">
            <textarea
              placeholder="Describe the mobile app you want to build..."
              className="w-full h-32 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-xl p-6 text-lg resize-none focus:outline-none focus:border-gray-500"
            />
            
            {/* Bottom controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {/* Left side - Image upload */}
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white" title="Upload image">
                <ImagePlus className="w-5 h-5" />
              </button>
              
              {/* Right side - Public button and Send */}
              <div className="flex items-center space-x-3">
                <button className="text-white hover:bg-gray-600 flex items-center space-x-2 px-3 py-2 rounded-lg">
                  <Globe className="w-4 h-4" />
                  <span>Public</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg" title="Send">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}