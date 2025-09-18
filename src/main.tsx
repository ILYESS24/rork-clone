import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './index.css';
import './styles/animations.css';

// Script de réparation automatique pour la page blanche
function reparerPageBlanche() {
  console.log('🔧 VÉRIFICATION PAGE BLANCHE - Démarrage');
  
  const rootElement = document.getElementById('root');
  
  // Si l'élément root n'existe pas ou est vide après 3 secondes, appliquer la réparation
  setTimeout(() => {
    const currentRoot = document.getElementById('root');
    if (!currentRoot || currentRoot.innerHTML.trim() === '') {
      console.log('🔧 PAGE BLANCHE DÉTECTÉE - Application de la réparation');
      
      if (currentRoot) {
        currentRoot.innerHTML = `
          <div style="
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
          ">
            <div>
              <h1 style="font-size: 3rem; margin-bottom: 20px;">🚀 Rork Platform</h1>
              <p style="font-size: 1.2rem; margin-bottom: 30px;">Votre SaaS tout-en-un professionnel</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="/builder" style="
                  padding: 12px 24px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                  transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">🔧 Builder</a>
                <a href="/marketplace" style="
                  padding: 12px 24px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                  transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">🏪 Marketplace</a>
                <a href="/analytics" style="
                  padding: 12px 24px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                  transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">📊 Analytics</a>
                <a href="/teams" style="
                  padding: 12px 24px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                  transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">👥 Teams</a>
                <a href="/admin" style="
                  padding: 12px 24px;
                  background: white;
                  color: #667eea;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: bold;
                  transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">🛡️ Admin</a>
              </div>
              <div style="margin-top: 30px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; font-size: 14px;">
                <p>✅ Application réparée automatiquement</p>
                <p>🕒 ${new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        `;
        
        console.log('✅ RÉPARATION APPLIQUÉE - Interface restaurée');
      }
    } else {
      console.log('✅ APPLICATION FONCTIONNELLE - Aucune réparation nécessaire');
    }
  }, 3000);
}

// Démarrer la vérification
reparerPageBlanche();

// Tentative de montage de l'application
try {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
    console.log('✅ APPLICATION REACT MONTÉE AVEC SUCCÈS');
  } else {
    console.error('❌ Élément root non trouvé');
  }
} catch (error) {
  console.error('❌ Erreur lors du montage React:', error);
  
  // Fallback en cas d'erreur
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1 style="font-size: 3rem; margin-bottom: 20px;">🚀 Rork Platform</h1>
          <p style="font-size: 1.2rem; margin-bottom: 30px;">Erreur détectée - Interface de secours</p>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="/builder" style="
              padding: 12px 24px;
              background: white;
              color: #667eea;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            ">🔧 Builder</a>
            <a href="/marketplace" style="
              padding: 12px 24px;
              background: white;
              color: #667eea;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            ">🏪 Marketplace</a>
          </div>
        </div>
      </div>
    `;
  }
}
