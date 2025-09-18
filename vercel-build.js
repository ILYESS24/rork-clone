#!/usr/bin/env node

console.log('🚀 Rork Platform - Build pour Vercel');
console.log('=====================================');

const { execSync } = require('child_process');

try {
  console.log('📦 Installation des dépendances...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🔨 Build de l\'application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build terminé avec succès !');
  console.log('📁 Fichiers générés dans le dossier "dist"');
  
} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}
