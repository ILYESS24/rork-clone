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
            color: #fff;
            min-height: 100vh;
            overflow-x: hidden;
          }
          
          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .logo {
            font-size: 24px;
            font-weight: 600;
            color: #fff;
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
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 14px;
            font-weight: 400;
            transition: color 0.3s ease;
            padding: 8px 0;
          }
          
          .nav-links a:hover {
            color: #fff;
          }
          
          .credits-btn {
            background: #fff;
            color: #000;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
          }
          
          .credits-btn:hover {
            background: rgba(255, 255, 255, 0.9);
          }
          
          .profile-btn {
            width: 40px;
            height: 40px;
            background: #fff;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .profile-btn:hover {
            background: rgba(255, 255, 255, 0.9);
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
            font-size: clamp(48px, 8vw, 80px);
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 1.1;
            max-width: 900px;
            color: #fff;
          }
          
          .subtitle {
            font-size: clamp(18px, 3vw, 24px);
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 80px;
            max-width: 700px;
            line-height: 1.6;
            font-weight: 300;
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
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 24px 70px 24px 60px;
            color: #fff;
            font-size: 16px;
            min-height: 70px;
            resize: none;
            transition: all 0.3s ease;
            font-family: inherit;
          }
          
          .main-input:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.08);
          }
          
          .main-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-weight: 300;
          }
          
          .input-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.5);
            font-size: 20px;
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
            color: rgba(255, 255, 255, 0.7);
            padding: 8px 16px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .public-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #fff;
          }
          
          .submit-btn {
            background: #fff;
            border: none;
            color: #000;
            cursor: pointer;
            padding: 12px;
            border-radius: 6px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
          }
          
          .submit-btn:hover {
            background: rgba(255, 255, 255, 0.9);
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
