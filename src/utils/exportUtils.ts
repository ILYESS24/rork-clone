import { ReactCodeGenerator, Component } from './codeGenerator';
import JSZip from 'jszip';

export interface ExportOptions {
  includeDependencies?: boolean;
  includeConfig?: boolean;
  format?: 'zip' | 'files';
}

export class ProjectExporter {
  private codeGenerator: ReactCodeGenerator;

  constructor() {
    this.codeGenerator = new ReactCodeGenerator();
  }

  // Exporter le projet complet en ZIP
  async exportProject(
    projectName: string, 
    components: Component[], 
    options: ExportOptions = {}
  ): Promise<Blob> {
    const zip = new JSZip();
    
    // Générer les fichiers principaux
    const reactCode = this.codeGenerator.generateReactCode(components);
    const cssCode = this.codeGenerator.generateCSS(components);
    
    // Structure de base du projet
    zip.file('src/App.tsx', reactCode);
    zip.file('src/App.css', cssCode);
    zip.file('src/main.tsx', this.generateMainTsx());
    zip.file('src/vite-env.d.ts', this.generateViteEnv());
    zip.file('index.html', this.generateIndexHtml());
    
    // Configuration si demandée
    if (options.includeConfig) {
      zip.file('vite.config.ts', this.codeGenerator.generateViteConfig());
      zip.file('tailwind.config.js', this.codeGenerator.generateTailwindConfig());
      zip.file('postcss.config.js', this.generatePostCSSConfig());
      zip.file('tsconfig.json', this.generateTSConfig());
    }
    
    // Dépendances si demandées
    if (options.includeDependencies) {
      zip.file('package.json', this.codeGenerator.generatePackageJson());
    }
    
    // README
    zip.file('README.md', this.generateReadme(projectName));
    
    // Générer le ZIP
    return await zip.generateAsync({ type: 'blob' });
  }

  // Télécharger le fichier ZIP
  async downloadProject(
    projectName: string, 
    components: Component[], 
    options: ExportOptions = {}
  ): Promise<void> {
    const zipBlob = await this.exportProject(projectName, components, options);
    
    // Créer le lien de téléchargement
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Nettoyer l'URL
    URL.revokeObjectURL(url);
  }

  // Exporter uniquement le code React
  exportReactCode(components: Component[]): string {
    return this.codeGenerator.generateReactCode(components);
  }

  // Exporter uniquement le CSS
  exportCSS(components: Component[]): string {
    return this.codeGenerator.generateCSS(components);
  }

  // Copier le code dans le presse-papiers
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      return false;
    }
  }

  // Générer les fichiers de configuration
  private generateMainTsx(): string {
    return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
  }

  private generateViteEnv(): string {
    return `/// <reference types="vite/client" />`;
  }

  private generateIndexHtml(): string {
    return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Application Générée</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }

  private generatePostCSSConfig(): string {
    return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  }

  private generateTSConfig(): string {
    return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;
  }

  private generateReadme(projectName: string): string {
    return `# ${projectName}

Application générée avec Rork Platform - Builder d'applications no-code.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
\`\`\`bash
npm install
\`\`\`

### Développement
\`\`\`bash
npm run dev
\`\`\`

### Build de production
\`\`\`bash
npm run build
\`\`\`

### Prévisualisation
\`\`\`bash
npm run preview
\`\`\`

## 📁 Structure du projet

\`\`\`
src/
├── App.tsx          # Composant principal
├── App.css          # Styles CSS
├── main.tsx         # Point d'entrée
└── vite-env.d.ts    # Types Vite
\`\`\`

## 🛠️ Technologies utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Icônes

## 📝 Personnalisation

Vous pouvez modifier les composants dans \`src/App.tsx\` et les styles dans \`src/App.css\`.

## 🎨 Ajout de nouveaux composants

Pour ajouter de nouveaux composants, vous pouvez :
1. Créer des composants React dans \`src/components/\`
2. Les importer dans \`App.tsx\`
3. Les utiliser dans votre application

## 📦 Déploiement

### Vercel
\`\`\`bash
npm run build
# Déployer le dossier dist/
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Déployer le dossier dist/
\`\`\`

## 🤝 Support

Pour toute question ou problème, consultez la documentation de Rork Platform.

---
*Généré avec ❤️ par Rork Platform*
`;
  }
}

// Instance singleton
export const projectExporter = new ProjectExporter();
