import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  Globe,
  Send,
  Smartphone,
  Zap,
  Bot
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold">Rork</div>
        
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white">Docs</a>
          <a href="#" className="text-gray-300 hover:text-white">Examples</a>
          <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
          <button className="bg-white text-black px-6 py-2 rounded-lg font-medium">
            Get Started
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
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>
          
          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gray-800 rounded-2xl p-6 flex items-center space-x-4">
              <Smartphone className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Describe the mobile app you want to build..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
              />
              <div className="flex items-center space-x-3">
                <button className="text-white hover:bg-gray-700 flex items-center space-x-2 px-4 py-2 rounded-lg">
                  <Globe className="w-4 h-4" />
                  <span>Public</span>
                </button>
                <button className="bg-white text-black p-3 rounded-lg">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why choose Rork?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Fast Development */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Development</h3>
              <p className="text-gray-300 text-lg">Build apps in minutes, not months</p>
            </div>
            
            {/* AI-Powered */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered</h3>
              <p className="text-gray-300 text-lg">Smart code generation and suggestions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}