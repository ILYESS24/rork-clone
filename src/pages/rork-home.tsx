import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useStreamChat } from '../hooks/useStreamChat';
import { showSuccess, showError } from '../utils/notifications';
import { RorkNavigation } from '@/components/rork-platform/RorkNavigation';

export default function RorkHomePage() {
  const [prompt, setPrompt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();
  const { streamMessage, isStreaming } = useStreamChat({ hasChatId: false });

  const handleSubmit = async () => {
    if (!prompt.trim() || isStreaming) return;

    try {
      // Créer une nouvelle app avec le prompt initial
      const result = await streamMessage({
        prompt: prompt.trim(),
        chatId: undefined // Pas de chatId = création d'app
      });

      if (result) {
        showSuccess('Application créée avec succès ! Redirection vers l\'éditeur...');
        
        // Rediriger vers l'interface Dyad complète
        setTimeout(() => {
          navigate({
            to: '/chat',
            search: { id: result.chatId, appId: result.app.id }
          });
        }, 1500);
      }
    } catch (error) {
      showError('Erreur lors de la création de l\'application: ' + error.message);
      console.error('Error creating app:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RorkNavigation />
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="rork-header">
        <div className="container">
          <div className="flex justify-between items-center">
            <a href="/" className="rork-logo">
              Rork
            </a>
            
            <nav className="rork-nav">
              <div className="rork-nav-links">
                <a href="#faq">FAQ</a>
                <a href="#blog">Blog</a>
                <a href="#x">X</a>
                <a href="#pricing">Pricing</a>
              </div>
              
              <button className="rork-get-credits-btn">
                Get free credits
              </button>
              
              <button className="rork-profile-btn">
                G
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="rork-main">
        <div className="container">
          <h1 className="rork-hero-title">Build native mobile apps, fast.</h1>
          <p className="rork-hero-subtitle">Rork builds complete, cross-platform mobile apps using AI and React Native.</p>
          
          {/* Input Section */}
          <div className="rork-input-section">
            <div className="rork-input-container">
              <div className="rork-input-row">
                <div className="rork-input-icon">+</div>
                <input 
                  type="text" 
                  className="rork-main-input" 
                  placeholder="Describe the mobile app you want to build..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isStreaming}
                />
                <button 
                  className="rork-public-btn"
                  onClick={() => setIsPublic(!isPublic)}
                >
                  {isPublic ? 'Public' : 'Private'}
                </button>
                <button 
                  className="rork-send-btn"
                  onClick={handleSubmit}
                  disabled={isStreaming || !prompt.trim()}
                  style={{ 
                    opacity: isStreaming || !prompt.trim() ? 0.5 : 1,
                    cursor: isStreaming || !prompt.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="rork-footer">
        <div className="container">
          <div className="rork-footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#affiliates">Affiliates</a>
          </div>
          <p>© 2024 Rork. All rights reserved.</p>
        </div>
      </footer>
      </div>
      </div>

      <style>{`
        .rork-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          min-height: 120px;
        }

        .rork-logo {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rork-logo::before {
          content: "●";
          color: #fff;
          font-size: 12px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
        }

        .rork-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .rork-nav-links {
          display: flex;
          gap: 20px;
        }

        .rork-nav-links a {
          font-family: 'Inter', sans-serif;
          color: #999;
          text-decoration: none;
          font-weight: 400;
          font-size: 14px;
          transition: color 0.2s;
        }

        .rork-nav-links a:hover {
          color: #fff;
        }

        .rork-get-credits-btn {
          background: #d97706;
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }

        .rork-get-credits-btn:hover {
          background: #b45309;
        }

        .rork-profile-btn {
          background: #8b5cf6;
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .rork-profile-btn:hover {
          background: #7c3aed;
        }

        .rork-main {
          text-align: center;
          padding: 80px 0;
        }

        .rork-hero-title {
          font-family: 'Inter', sans-serif;
          font-size: 56px;
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.1;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .rork-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: #b3b3b3;
          margin-bottom: 48px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.4;
          font-weight: 400;
        }

        .rork-input-section {
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .rork-input-container {
          background: #1a1a1a;
          border: none;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 16px;
          position: relative;
        }

        .rork-input-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rork-input-icon {
          background: #3a3a3a;
          color: #fff;
          font-size: 16px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .rork-main-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 16px;
          color: #fff;
          font-family: inherit;
        }

        .rork-main-input::placeholder {
          color: #666;
        }

        .rork-public-btn {
          background: #2a2a2a;
          border: none;
          color: #fff;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          font-family: 'Inter', sans-serif;
        }

        .rork-public-btn:hover {
          background: #3a3a3a;
        }

        .rork-send-btn {
          background: #1a1a1a;
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          width: 44px;
          height: 44px;
        }

        .rork-send-btn:hover {
          background: #2a2a2a;
        }

        .rork-footer {
          text-align: center;
          padding: 40px 0;
        }

        .rork-footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 16px;
        }

        .rork-footer-links a {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .rork-footer-links a:hover {
          color: #999;
        }

        .rork-footer p {
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}