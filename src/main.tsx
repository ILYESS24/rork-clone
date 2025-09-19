// INTERFACE MOBILE-FOCUSED - DESIGN MINIMALISTE ÉPURÉ
console.log('📱 DÉMARRAGE RORK - FOCUS MOBILE APPS');

// Interface Mobile-Focused IMMÉDIATE
function creerInterfaceMobile() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rork - Build Native Mobile Apps</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
            background-attachment: fixed;
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
          }
          
          /* Animated Background */
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
            z-index: -1;
          }
          
          @keyframes backgroundShift {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          /* Floating Particles */
          .particle {
            position: fixed;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 15s infinite linear;
            z-index: -1;
          }
          
          .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
          .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 2s; }
          .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 4s; }
          .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 6s; }
          .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 8s; }
          .particle:nth-child(6) { width: 7px; height: 7px; left: 60%; animation-delay: 10s; }
          .particle:nth-child(7) { width: 3px; height: 3px; left: 70%; animation-delay: 12s; }
          .particle:nth-child(8) { width: 5px; height: 5px; left: 80%; animation-delay: 14s; }
          .particle:nth-child(9) { width: 4px; height: 4px; left: 90%; animation-delay: 16s; }
          
          @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          
          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            position: relative;
            z-index: 100;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .logo {
            font-size: 24px;
            font-weight: 600;
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            background: linear-gradient(45deg, #ffffff, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .nav-right {
            display: flex;
            align-items: center;
            gap: 30px;
          }
          
          .nav-links {
            display: flex;
            gap: 30px;
            align-items: center;
          }
          
          .nav-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 14px;
            font-weight: 400;
            transition: all 0.3s ease;
            padding: 8px 16px;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .nav-links a::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s;
          }
          
          .nav-links a:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .nav-links a:hover::before {
            left: 100%;
          }
          
          .credits-btn {
            background: linear-gradient(135deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .credits-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
            background: linear-gradient(135deg, #ff5252, #ff7043);
          }
          
          .profile-btn {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .profile-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
          }
          
          /* Main Content */
          .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 120px);
            padding: 40px 20px;
            text-align: center;
            position: relative;
          }
          
          .main-title {
            font-size: clamp(48px, 8vw, 80px);
            font-weight: 800;
            margin-bottom: 24px;
            line-height: 1.1;
            max-width: 900px;
            background: linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 0 40px rgba(168, 85, 247, 0.3);
            animation: titleGlow 3s ease-in-out infinite alternate;
          }
          
          @keyframes titleGlow {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.2); }
          }
          
          .subtitle {
            font-size: clamp(18px, 3vw, 24px);
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 80px;
            max-width: 700px;
            line-height: 1.6;
            font-weight: 300;
            letter-spacing: 0.5px;
          }
          
          /* Input Container */
          .input-container {
            position: relative;
            width: 100%;
            max-width: 700px;
            margin-bottom: 60px;
          }
          
          .main-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 24px 70px 24px 60px;
            color: white;
            font-size: 16px;
            min-height: 70px;
            resize: none;
            transition: all 0.4s ease;
            font-family: inherit;
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .main-input:focus {
            outline: none;
            border-color: rgba(168, 85, 247, 0.5);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.1),
              0 0 0 4px rgba(168, 85, 247, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-2px);
          }
          
          .main-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
            font-weight: 300;
          }
          
          .input-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.6);
            font-size: 20px;
            transition: all 0.3s ease;
          }
          
          .input-container:hover .input-icon {
            color: rgba(168, 85, 247, 0.8);
            transform: translateY(-50%) scale(1.1);
          }
          
          .input-controls {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .public-btn {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.8);
            padding: 8px 16px;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
          
          .public-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          
          .submit-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 12px;
            border-radius: 15px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .submit-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
            background: linear-gradient(135deg, #5a67d8, #6b46c1);
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .header {
              padding: 15px 20px;
            }
            
            .nav-links {
              display: none;
            }
            
            .main-content {
              padding: 20px 16px;
            }
            
            .main-input {
              padding: 20px 60px 20px 50px;
              font-size: 14px;
            }
          }
          
          @media (max-width: 480px) {
            .header {
              padding: 12px 16px;
            }
            
            .main-content {
              padding: 20px 16px;
            }
            
            .input-container {
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <!-- Floating Particles -->
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        
        <!-- Header -->
        <div class="header">
          <div class="logo">
            • Rork
          </div>
          <div class="nav-right">
            <div class="nav-links">
              <a href="/faq">FAQ</a>
              <a href="/blog">Blog</a>
              <a href="https://twitter.com/rork" target="_blank">X</a>
              <a href="/pricing">Pricing</a>
            </div>
            <a href="/credits" class="credits-btn">
              🎁 Get free credits
            </a>
            <button class="profile-btn">
              G
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <h1 class="main-title">Build native mobile apps, fast.</h1>
          <p class="subtitle">Rork builds complete, cross-platform mobile apps using AI and React Native.</p>
          
          <!-- Input Area -->
          <div class="input-container">
            <div class="input-icon">📎</div>
            <textarea 
              class="main-input" 
              placeholder="Describe the mobile app you want to build..."
              rows="1"
            ></textarea>
            <div class="input-controls">
              <button class="public-btn">
                🌐 Public
              </button>
              <button class="submit-btn">
                ✈️
              </button>
            </div>
          </div>
        </div>

        <script>
          // Auto-resize textarea
          const textarea = document.querySelector('.main-input');
          textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
          });
          
          // Submit functionality
          document.querySelector('.submit-btn').addEventListener('click', function() {
            const input = document.querySelector('.main-input');
            
            if (input.value.trim()) {
              // Show loading state
              this.innerHTML = '⏳';
              this.style.color = '#8b5cf6';
              
              // Simulate processing
              setTimeout(() => {
                window.location.href = '/builder?prompt=' + encodeURIComponent(input.value);
              }, 1500);
            }
          });
          
          // Enter key support
          textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              document.querySelector('.submit-btn').click();
            }
          });
          
          // Public/Private toggle
          document.querySelector('.public-btn').addEventListener('click', function() {
            const isPublic = this.innerHTML.includes('Public');
            this.innerHTML = isPublic ? '🔒 Private' : '🌐 Public';
          });
          
          // Navigation
          document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              const route = e.target.getAttribute('href');
              if (route !== '#') {
                window.location.href = route;
              }
            }
          });
          
          // Focus input on load
          setTimeout(() => {
            textarea.focus();
          }, 500);
        </script>
      </body>
      </html>
    `;
    console.log('✅ INTERFACE MOBILE CHARGÉE - DESIGN MINIMALISTE ÉPURÉ');
  }
}

// Charger l'interface Mobile IMMÉDIATEMENT
creerInterfaceMobile();

// Tentative de chargement React en arrière-plan (optionnel)
setTimeout(() => {
  try {
    import('react').then(() => {
      console.log('✅ React disponible - Tentative de montage...');
      import('./router').then(({ router }) => {
        import('react-dom/client').then(({ createRoot }) => {
          import('@tanstack/react-router').then(({ RouterProvider }) => {
            import('react').then(({ StrictMode }) => {
              const rootElement = document.getElementById('root');
              if (rootElement && rootElement.children.length === 0) {
                rootElement.innerHTML = '';
                createRoot(rootElement).render(
                  StrictMode({ children: RouterProvider({ router }) })
                );
                console.log('✅ REACT MONTÉ AVEC SUCCÈS');
              }
            });
          });
        });
      });
    });
  } catch (error) {
    console.log('ℹ️ Mode de secours maintenu - Application stable');
  }
}, 1000);
