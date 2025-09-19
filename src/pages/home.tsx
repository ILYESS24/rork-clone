import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  Globe,
  Send,
  Upload,
  Gift
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold">Rork</div>
        
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-black">FAQ</a>
          <a href="#" className="text-gray-600 hover:text-black">Blog</a>
          <a href="#" className="text-gray-600 hover:text-black">X</a>
          <a href="#" className="text-gray-600 hover:text-black">Pricing</a>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-lg flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Get free credits</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-8">
        <div className="text-center max-w-5xl">
          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            Build native mobile apps, fast.
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>
          
          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe the mobile app you want to build..."
                  className="flex-1 bg-transparent text-black placeholder-gray-500 text-lg focus:outline-none"
                />
                <div className="flex items-center space-x-3">
                  <button className="text-black hover:bg-gray-200 flex items-center space-x-2 px-4 py-2 rounded-lg">
                    <Globe className="w-4 h-4" />
                    <span>Public</span>
                  </button>
                  <button className="bg-black text-white p-3 rounded-lg">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Drop images here to upload them to the conversation</p>
                <p className="text-sm text-gray-500">PNG JPG Max 5MB</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 text-gray-500 mb-4">
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Affiliates</a>
          </div>
          <p className="text-gray-500 text-sm">
            Try out projects built on Rork in App Store
          </p>
        </div>
      </footer>
    </div>
  );
}