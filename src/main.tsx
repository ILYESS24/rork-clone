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
          
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
            padding: 12px 24px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .logo {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            font-family: 'Inter', sans-serif;
          }
          
          .nav-right {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .nav-links {
            display: flex;
            gap: 20px;
            align-items: center;
          }
          
          .nav-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 13px;
            font-weight: 400;
            transition: color 0.3s ease;
            padding: 4px 0;
            font-family: 'Inter', sans-serif;
          }
          
          .nav-links a:hover {
            color: #fff;
          }
          
          .credits-btn {
            background: #fff;
            color: #000;
            padding: 6px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
          }
          
          .credits-btn:hover {
            background: rgba(255, 255, 255, 0.9);
          }
          
          .profile-btn {
            width: 32px;
            height: 32px;
            background: #fff;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
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
            min-height: calc(100vh - 80px);
            padding: 20px;
            text-align: center;
          }
          
          .main-title {
            font-size: clamp(32px, 6vw, 56px);
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.1;
            max-width: 600px;
            color: #fff;
            font-family: 'Inter', sans-serif;
          }
          
          .subtitle {
            font-size: clamp(14px, 2.5vw, 18px);
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 40px;
            max-width: 500px;
            line-height: 1.5;
            font-weight: 400;
            font-family: 'Inter', sans-serif;
          }
          
          /* Input Container */
          .input-container {
            position: relative;
            width: 100%;
            max-width: 500px;
            margin-bottom: 40px;
          }
          
          .main-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 16px 50px 16px 45px;
            color: #fff;
            font-size: 14px;
            min-height: 50px;
            resize: none;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
          }
          
          .main-input:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.08);
          }
          
          .main-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-weight: 400;
            font-family: 'Inter', sans-serif;
          }
          
          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.5);
            font-size: 16px;
          }
          
          .input-controls {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .public-btn {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.7);
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 11px;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Inter', sans-serif;
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
            padding: 8px;
            border-radius: 4px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          }
          
          .submit-btn:hover {
            background: rgba(255, 255, 255, 0.9);
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .header {
              padding: 10px 16px;
            }
            
            .nav-links {
              display: none;
            }
            
            .main-content {
              padding: 16px;
            }
            
            .main-input {
              padding: 14px 45px 14px 40px;
              font-size: 13px;
            }
          }
          
          @media (max-width: 480px) {
            .header {
              padding: 8px 12px;
            }
            
            .main-content {
              padding: 12px;
            }
            
            .input-container {
              max-width: 100%;
            }
            
            .logo {
              font-size: 16px;
            }
            
            .credits-btn {
              padding: 4px 8px;
              font-size: 11px;
            }
            
            .profile-btn {
              width: 28px;
              height: 28px;
              font-size: 12px;
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
