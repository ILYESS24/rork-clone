// INTERFACE ROCKET-STYLE - DESIGN SOMBRE PROFESSIONNEL
console.log('🚀 DÉMARRAGE RORK PLATFORM - STYLE ROCKET');

// Interface Rocket IMMÉDIATE
function creerInterfaceRocket() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rork - AI-Powered App Builder</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: white;
            min-height: 100vh;
          }
          
          /* Header */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            border-bottom: 1px solid #1a1a1a;
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: bold;
          }
          
          .logo-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          }
          
          .beta-badge {
            background: #1a1a1a;
            color: #888;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-left: 8px;
          }
          
          .nav-links {
            display: flex;
            gap: 30px;
            align-items: center;
          }
          
          .nav-links a {
            color: #888;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          .nav-links a:hover {
            color: white;
          }
          
          .get-started-btn {
            background: #3b82f6;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: background 0.2s;
          }
          
          .get-started-btn:hover {
            background: #2563eb;
          }
          
          /* Main Content */
          .main-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 20px;
            text-align: center;
          }
          
          .main-title {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 40px;
            line-height: 1.2;
          }
          
          .app-types {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
          }
          
          .app-type-btn {
            background: #1a1a1a;
            color: white;
            padding: 12px 20px;
            border-radius: 20px;
            border: 1px solid #333;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
          }
          
          .app-type-btn:hover {
            background: #2a2a2a;
            border-color: #555;
          }
          
          .app-type-btn.active {
            background: #3b82f6;
            border-color: #3b82f6;
          }
          
          /* Input Area */
          .input-container {
            position: relative;
            margin-bottom: 40px;
          }
          
          .main-input {
            width: 100%;
            background: #1a1a1a;
            border: 2px solid #333;
            border-radius: 12px;
            padding: 20px 80px 20px 20px;
            color: white;
            font-size: 16px;
            min-height: 60px;
            resize: none;
            transition: border-color 0.2s;
          }
          
          .main-input:focus {
            outline: none;
            border-color: #3b82f6;
          }
          
          .main-input::placeholder {
            color: #666;
          }
          
          .input-actions {
            position: absolute;
            bottom: 15px;
            left: 20px;
            display: flex;
            gap: 15px;
          }
          
          .input-action {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #666;
            font-size: 14px;
            cursor: pointer;
            transition: color 0.2s;
          }
          
          .input-action:hover {
            color: white;
          }
          
          .submit-btn {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: #3b82f6;
            border: none;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
          }
          
          .submit-btn:hover {
            background: #2563eb;
          }
          
          /* Progress Bar */
          .progress-bar {
            height: 2px;
            background: #1a1a1a;
            margin-bottom: 60px;
            position: relative;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            width: 0%;
            transition: width 0.3s ease;
          }
          
          /* Workflow Steps */
          .workflow {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 60px;
          }
          
          .workflow-step {
            text-align: left;
          }
          
          .step-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #3b82f6;
          }
          
          .step-description {
            color: #888;
            font-size: 14px;
            line-height: 1.5;
          }
          
          /* Technologies */
          .tech-section {
            border-top: 1px solid #1a1a1a;
            padding-top: 40px;
          }
          
          .tech-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            text-align: left;
          }
          
          .tech-grid {
            display: flex;
            gap: 20px;
            align-items: center;
            flex-wrap: wrap;
          }
          
          .tech-item {
            background: #1a1a1a;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #333;
            font-size: 12px;
            color: #888;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .header {
              padding: 15px 20px;
            }
            
            .nav-links {
              gap: 15px;
            }
            
            .nav-links a {
              font-size: 14px;
            }
            
            .main-title {
              font-size: 32px;
            }
            
            .app-types {
              gap: 8px;
            }
            
            .app-type-btn {
              padding: 10px 16px;
              font-size: 12px;
            }
            
            .workflow {
              grid-template-columns: 1fr;
              gap: 30px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="logo">
            <div class="logo-icon">🚀</div>
            rork
            <span class="beta-badge">BETA</span>
          </div>
          <div class="nav-links">
            <a href="/marketplace">Built with Rork</a>
            <a href="/compare">Compare</a>
            <a href="/templates">Templates</a>
            <a href="/auth">Sign in</a>
            <a href="/auth" class="get-started-btn">Get started</a>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <h1 class="main-title">What do you want to build today?</h1>
          
          <!-- App Types -->
          <div class="app-types">
            <button class="app-type-btn active">Web App</button>
            <button class="app-type-btn">Mobile App</button>
            <button class="app-type-btn">Internal Tool</button>
            <button class="app-type-btn">Website</button>
            <button class="app-type-btn">Dashboard</button>
            <button class="app-type-btn">Landing page</button>
          </div>
          
          <!-- Input Area -->
          <div class="input-container">
            <textarea 
              class="main-input" 
              placeholder="What can Rork build for you today?"
              rows="3"
            ></textarea>
            
            <div class="input-actions">
              <div class="input-action">
                📎 Attach
              </div>
              <div class="input-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Import Figma
              </div>
            </div>
            
            <button class="submit-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          
          <!-- Progress Bar -->
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
          </div>
          
          <!-- Workflow Steps -->
          <div class="workflow">
            <div class="workflow-step">
              <div class="step-title">Prompt</div>
              <div class="step-description">
                Ask Rork in your natural language or give requirements. Or import Figma URL/file to convert.
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-title">Develop</div>
              <div class="step-description">
                Rork will generate stunning and well researched website/app or convert your design into code.
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-title">Iterate</div>
              <div class="step-description">
                Customise your app- iterate in your natural language or make changes to code via console.
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-title">Deploy</div>
              <div class="step-description">
                Download your code, deploy on web, or push to GitHub as you wish and take it forward.
              </div>
            </div>
          </div>
          
          <!-- Technologies -->
          <div class="tech-section">
            <div class="tech-title">Frameworks we support:</div>
            <div class="tech-grid">
              <div class="tech-item">React</div>
              <div class="tech-item">Vue</div>
              <div class="tech-item">Angular</div>
              <div class="tech-item">Svelte</div>
              <div class="tech-item">Next.js</div>
              <div class="tech-item">Nuxt</div>
            </div>
          </div>
          
          <div class="tech-section">
            <div class="tech-title">Integrations we support:</div>
            <div class="tech-grid">
              <div class="tech-item">GitHub</div>
              <div class="tech-item">Vercel</div>
              <div class="tech-item">Netlify</div>
              <div class="tech-item">Firebase</div>
              <div class="tech-item">Supabase</div>
              <div class="tech-item">OpenAI</div>
              <div class="tech-item">Anthropic</div>
              <div class="tech-item">Stripe</div>
              <div class="tech-item">PostgreSQL</div>
            </div>
          </div>
        </div>

        <script>
          // App Type Selection
          document.querySelectorAll('.app-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              document.querySelectorAll('.app-type-btn').forEach(b => b.classList.remove('active'));
              this.classList.add('active');
            });
          });
          
          // Submit Button
          document.querySelector('.submit-btn').addEventListener('click', function() {
            const input = document.querySelector('.main-input');
            const progressFill = document.querySelector('.progress-fill');
            
            if (input.value.trim()) {
              // Animate progress bar
              let progress = 0;
              const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                  progress = 100;
                  clearInterval(interval);
                  
                  // Redirect to builder
                  setTimeout(() => {
                    window.location.href = '/builder';
                  }, 500);
                }
                progressFill.style.width = progress + '%';
              }, 100);
            }
          });
          
          // Enter key support
          document.querySelector('.main-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              document.querySelector('.submit-btn').click();
            }
          });
          
          // Navigation
          document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
              e.preventDefault();
              const route = e.target.getAttribute('href');
              window.location.href = route;
            }
          });
        </script>
      </body>
      </html>
    `;
    console.log('✅ INTERFACE ROCKET CHARGÉE - DESIGN SOMBRE PROFESSIONNEL');
  }
}

// Charger l'interface Rocket IMMÉDIATEMENT
creerInterfaceRocket();

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
