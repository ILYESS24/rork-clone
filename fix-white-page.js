// Script pour diagnostiquer et corriger le problème de page blanche

console.log('🔍 DIAGNOSTIC DE LA PAGE BLANCHE');
console.log('================================');

// Vérifier si l'élément root existe
const rootElement = document.getElementById('root');
console.log('📍 Élément root:', rootElement);

if (!rootElement) {
    console.error('❌ PROBLÈME: Élément #root non trouvé');
    console.log('🔧 SOLUTION: Vérifier que index.html contient <div id="root"></div>');
} else {
    console.log('✅ Élément root trouvé');
}

// Vérifier si React est chargé
if (typeof React === 'undefined') {
    console.error('❌ PROBLÈME: React non chargé');
    console.log('🔧 SOLUTION: Vérifier les imports dans main.tsx');
} else {
    console.log('✅ React chargé');
}

// Vérifier si le router est chargé
if (typeof window !== 'undefined') {
    console.log('✅ Window object disponible');
    
    // Vérifier les erreurs JavaScript
    window.addEventListener('error', function(e) {
        console.error('❌ ERREUR JAVASCRIPT:', e.error);
        console.error('📍 Fichier:', e.filename);
        console.error('📍 Ligne:', e.lineno);
    });
    
    // Vérifier les erreurs de promesses non capturées
    window.addEventListener('unhandledrejection', function(e) {
        console.error('❌ PROMESSE REJETÉE:', e.reason);
    });
}

// Vérifier le contenu de l'élément root
if (rootElement) {
    console.log('📊 Contenu de root:', rootElement.innerHTML);
    console.log('📊 Classes de root:', rootElement.className);
    console.log('📊 Styles de root:', window.getComputedStyle(rootElement));
}

// Vérifier les scripts chargés
const scripts = document.querySelectorAll('script');
console.log('📜 Scripts chargés:', scripts.length);
scripts.forEach((script, index) => {
    console.log(`  ${index + 1}. ${script.src || 'inline'}`);
});

// Vérifier les feuilles de style
const styles = document.querySelectorAll('link[rel="stylesheet"]');
console.log('🎨 Styles chargés:', styles.length);
styles.forEach((style, index) => {
    console.log(`  ${index + 1}. ${style.href}`);
});

console.log('🔍 DIAGNOSTIC TERMINÉ');
console.log('====================');

// Si rien n'est affiché, créer un contenu de test
if (rootElement && rootElement.innerHTML.trim() === '') {
    console.log('🔧 CRÉATION DE CONTENU DE TEST...');
    rootElement.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        ">
            <div>
                <h1>🚀 Rork Platform</h1>
                <p>Application en cours de chargement...</p>
                <p>Si vous voyez ce message, l'application se charge correctement.</p>
                <div style="margin-top: 20px;">
                    <a href="/builder" style="
                        display: inline-block;
                        padding: 10px 20px;
                        background: white;
                        color: #667eea;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 5px;
                    ">🔧 Builder</a>
                    <a href="/marketplace" style="
                        display: inline-block;
                        padding: 10px 20px;
                        background: white;
                        color: #667eea;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 5px;
                    ">🏪 Marketplace</a>
                </div>
            </div>
        </div>
    `;
    console.log('✅ Contenu de test créé');
}
