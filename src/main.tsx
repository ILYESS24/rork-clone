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
            background: #000;
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
          }
          
          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            position: relative;
            z-index: 100;
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            font-weight: 600;
            color: white;
          }
          
          .logo-dot {
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
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
            color: white;
            text-decoration: none;
            font-size: 14px;
            font-weight: 400;
            transition: opacity 0.2s;
          }
          
          .nav-links a:hover {
            opacity: 0.7;
          }
          
          .credits-btn {
            background: #d97706;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: background 0.2s;
          }
          
          .credits-btn:hover {
            background: #b45309;
          }
          
          .profile-btn {
            width: 40px;
            height: 40px;
            background: #8b5cf6;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .profile-btn:hover {
            background: #7c3aed;
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
          }
          
          .main-title {
            font-size: 64px;
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.1;
            max-width: 800px;
          }
          
          .subtitle {
            font-size: 20px;
            color: #a1a1aa;
            margin-bottom: 60px;
            max-width: 600px;
            line-height: 1.4;
          }
          
          /* Input Container */
          .input-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-bottom: 40px;
          }
          
          .main-input {
            width: 100%;
            background: #1a1a1a;
            border: 1px solid #404040;
            border-radius: 12px;
            padding: 20px 60px 20px 50px;
            color: white;
            font-size: 16px;
            min-height: 60px;
            resize: none;
            transition: all 0.2s;
            font-family: inherit;
          }
          
          .main-input:focus {
            outline: none;
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          
          .main-input::placeholder {
            color: #71717a;
          }
          
          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #71717a;
            font-size: 18px;
          }
          
          .input-controls {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .public-btn {
            background: #262626;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            border: none;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .public-btn:hover {
            background: #404040;
          }
          
          .submit-btn {
            background: none;
            border: none;
            color: #71717a;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .submit-btn:hover {
            color: white;
            background: #262626;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .header {
              padding: 15px 20px;
            }
            
            .nav-links {
              display: none;
            }
            
            .main-title {
              font-size: 42px;
            }
            
            .subtitle {
              font-size: 18px;
              margin-bottom: 40px;
            }
            
            .input-container {
              max-width: 100%;
            }
            
            .main-input {
              padding: 16px 50px 16px 45px;
              font-size: 14px;
            }
          }
          
          @media (max-width: 480px) {
            .header {
              padding: 12px 16px;
            }
            
            .main-title {
              font-size: 32px;
            }
            
            .subtitle {
              font-size: 16px;
            }
            
            .main-content {
              padding: 20px 16px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="logo">
            <div class="logo-dot"></div>
            Rork
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
            <div class="input-icon">🖼️</div>
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
