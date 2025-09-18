// Script de test pour vérifier le déploiement

import fs from 'fs';
import path from 'path';

console.log('🚀 TEST DE DÉPLOIEMENT RORK PLATFORM');
console.log('=====================================');

// Vérifier les fichiers critiques
const criticalFiles = [
    'dist/index.html',
    'dist/assets/index-Bh2j27Gf.js',
    'dist/assets/index-ZfsZLzIl.css',
    'src/main.tsx',
    'src/router.ts',
    'src/routes/root.tsx',
    'vercel.json'
];

console.log('\n📁 VÉRIFICATION DES FICHIERS CRITIQUES:');
criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MANQUANT`);
    }
});

// Vérifier le contenu de index.html
if (fs.existsSync('dist/index.html')) {
    const indexContent = fs.readFileSync('dist/index.html', 'utf8');
    console.log('\n📄 CONTENU DE INDEX.HTML:');
    console.log(indexContent);
    
    // Vérifier que le div root existe
    if (indexContent.includes('<div id="root"></div>')) {
        console.log('✅ Div root trouvé dans index.html');
    } else {
        console.log('❌ Div root manquant dans index.html');
    }
    
    // Vérifier que les scripts sont référencés
    if (indexContent.includes('index-Bh2j27Gf.js')) {
        console.log('✅ Script principal référencé');
    } else {
        console.log('❌ Script principal non référencé');
    }
}

// Vérifier le contenu de main.tsx
if (fs.existsSync('src/main.tsx')) {
    const mainContent = fs.readFileSync('src/main.tsx', 'utf8');
    console.log('\n📄 CONTENU DE MAIN.TSX:');
    console.log(mainContent);
    
    if (mainContent.includes('document.getElementById(\'root\')')) {
        console.log('✅ main.tsx référence correctement l\'élément root');
    } else {
        console.log('❌ main.tsx ne référence pas l\'élément root');
    }
}

// Vérifier la taille du bundle
if (fs.existsSync('dist/assets/index-Bh2j27Gf.js')) {
    const stats = fs.statSync('dist/assets/index-Bh2j27Gf.js');
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`\n📦 TAILLE DU BUNDLE: ${fileSizeInKB} KB`);
    
    if (stats.size < 1000000) { // Moins de 1MB
        console.log('✅ Bundle de taille acceptable');
    } else {
        console.log('⚠️ Bundle assez volumineux');
    }
}

console.log('\n🎯 RECOMMANDATIONS:');
console.log('1. Vérifier que le serveur de développement fonctionne: npm run dev');
console.log('2. Tester l\'application sur: http://localhost:5173');
console.log('3. Vérifier la console du navigateur pour les erreurs');
console.log('4. Tester le build de production: npm run build');
console.log('5. Tester la prévisualisation: npm run preview');

console.log('\n🔧 EN CAS DE PAGE BLANCHE:');
console.log('1. Ouvrir la console du navigateur (F12)');
console.log('2. Vérifier les erreurs JavaScript');
console.log('3. Vérifier que les fichiers CSS/JS se chargent');
console.log('4. Vérifier que React se monte correctement');

console.log('\n✅ TEST TERMINÉ');
