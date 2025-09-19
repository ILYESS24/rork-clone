import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useStreamChat } from '../hooks/useStreamChat';
import { showSuccess, showError } from '../utils/notifications';

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="flex justify-between items-center">
            <a href="/" className="logo">
              Rork
            </a>
            
            <nav className="nav">
              <div className="nav-links">
                <a href="#faq">FAQ</a>
                <a href="#blog">Blog</a>
                <a href="#x">X</a>
                <a href="#pricing">Pricing</a>
              </div>
              
              <button className="get-credits-btn">
                Get free credits
              </button>
              
              <button className="profile-btn">
                G
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          <h1 className="hero-title">Build native mobile apps, fast.</h1>
          <p className="hero-subtitle">Rork builds complete, cross-platform mobile apps using AI and React Native.</p>
          
          {/* Input Section */}
          <div className="input-section">
            <div className="input-container">
              <div className="input-row">
                <div className="input-icon">+</div>
                <input 
                  type="text" 
                  className="main-input" 
                  placeholder="Describe the mobile app you want to build..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isStreaming}
                />
                <button 
                  className="public-btn"
                  onClick={() => setIsPublic(!isPublic)}
                >
                  {isPublic ? 'Public' : 'Private'}
                </button>
                <button 
                  className="send-btn"
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
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#affiliates">Affiliates</a>
          </div>
          <p>© 2024 Rork. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          min-height: 120px;
        }

        .logo {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo::before {
          content: "●";
          color: #fff;
          font-size: 12px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          font-family: 'Inter', sans-serif;
          color: #999;
          text-decoration: none;
          font-weight: 400;
          font-size: 14px;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #fff;
        }

        .get-credits-btn {
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

        .get-credits-btn:hover {
          background: #b45309;
        }

        .profile-btn {
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

        .profile-btn:hover {
          background: #7c3aed;
        }

        .main {
          text-align: center;
          padding: 80px 0;
        }

        .hero-title {
          font-family: 'Inter', sans-serif;
          font-size: 56px;
          font-weight: 600;
          margin-bottom: 20px;
          line-height: 1.1;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
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

        .input-section {
          max-width: 600px;
          margin: 0 auto 48px;
        }

        .input-container {
          background: #1a1a1a;
          border: none;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 16px;
          position: relative;
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .input-icon {
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

        .main-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 16px;
          color: #fff;
          font-family: inherit;
        }

        .main-input::placeholder {
          color: #666;
        }

        .public-btn {
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

        .public-btn:hover {
          background: #3a3a3a;
        }

        .send-btn {
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

        .send-btn:hover {
          background: #2a2a2a;
        }

        .footer {
          text-align: center;
          padding: 40px 0;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 16px;
        }

        .footer-links a {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #999;
        }

        .footer p {
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}