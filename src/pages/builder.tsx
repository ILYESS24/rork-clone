import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Play, 
  Download, 
  Save, 
  Eye, 
  Code, 
  Palette, 
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Folder,
  FileText,
  Copy,
  Settings,
  Brain,
  Sparkles,
  Zap
} from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { projectExporter } from '@/utils/exportUtils';
import { ReactCodeGenerator } from '@/utils/codeGenerator';
import { ProjectManager } from '@/components/ProjectManager';
import { LivePreview } from '@/components/LivePreview';

// Types pour les composants
interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  style?: Record<string, any>;
}

interface AppBuilderProps {
  initialComponents?: Component[];
}

export default function AppBuilder({ initialComponents = [] }: AppBuilderProps) {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [code, setCode] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  // Gestion de projets
  const { currentProject, saveProjectComponents, createProject } = useProjects();
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Code generator
  const codeGenerator = new ReactCodeGenerator();

  // Fonctions de gestion de projet
  const handleSaveProject = async () => {
    if (currentProject) {
      await saveProjectComponents(currentProject.id, components);
      alert('Projet sauvegardé !');
    } else {
      alert('Veuillez d\'abord créer ou charger un projet.');
    }
  };

  const handleExportProject = async () => {
    if (components.length === 0) {
      alert('Ajoutez des composants avant d\'exporter.');
      return;
    }

    setIsExporting(true);
    try {
      const projectName = currentProject?.name || 'Mon Application';
      await projectExporter.downloadProject(projectName, components, {
        includeDependencies: true,
        includeConfig: true
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export du projet.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCode = async () => {
    const reactCode = codeGenerator.generateReactCode(components);
    const success = await projectExporter.copyToClipboard(reactCode);
    if (success) {
      alert('Code copié dans le presse-papiers !');
    } else {
      alert('Erreur lors de la copie.');
    }
  };

  // Générer le code React
  useEffect(() => {
    if (components.length > 0) {
      const reactCode = codeGenerator.generateReactCode(components);
      setCode(reactCode);
    }
  }, [components]);

  // Composants disponibles
  const availableComponents = [
    // Layout
    { type: 'Container', icon: Layout, description: 'Conteneur flexible', category: 'Layout' },
    { type: 'Grid', icon: Layout, description: 'Grille responsive', category: 'Layout' },
    { type: 'Flexbox', icon: Layout, description: 'Conteneur flexbox', category: 'Layout' },
    { type: 'Section', icon: Layout, description: 'Section de page', category: 'Layout' },
    { type: 'Sidebar', icon: Layout, description: 'Barre latérale', category: 'Layout' },
    
    // Interactive
    { type: 'Button', icon: Plus, description: 'Bouton cliquable', category: 'Interactive' },
    { type: 'Toggle', icon: Plus, description: 'Interrupteur', category: 'Interactive' },
    { type: 'Slider', icon: Plus, description: 'Curseur', category: 'Interactive' },
    { type: 'Accordion', icon: Plus, description: 'Accordéon', category: 'Interactive' },
    { type: 'Tabs', icon: Plus, description: 'Onglets', category: 'Interactive' },
    
    // Content
    { type: 'Text', icon: Code, description: 'Texte simple', category: 'Content' },
    { type: 'Heading', icon: Code, description: 'Titre', category: 'Content' },
    { type: 'List', icon: Plus, description: 'Liste', category: 'Content' },
    { type: 'Quote', icon: Code, description: 'Citation', category: 'Content' },
    { type: 'Badge', icon: Code, description: 'Badge', category: 'Content' },
    
    // Media
    { type: 'Image', icon: Eye, description: 'Image', category: 'Media' },
    { type: 'Video', icon: Eye, description: 'Vidéo', category: 'Media' },
    { type: 'Gallery', icon: Eye, description: 'Galerie', category: 'Media' },
    { type: 'Avatar', icon: Eye, description: 'Avatar', category: 'Media' },
    
    // Form
    { type: 'Input', icon: Palette, description: 'Champ de saisie', category: 'Form' },
    { type: 'Textarea', icon: Palette, description: 'Zone de texte', category: 'Form' },
    { type: 'Select', icon: Palette, description: 'Sélection', category: 'Form' },
    { type: 'Checkbox', icon: Palette, description: 'Case à cocher', category: 'Form' },
    { type: 'Radio', icon: Palette, description: 'Bouton radio', category: 'Form' },
    { type: 'Form', icon: Code, description: 'Formulaire', category: 'Form' },
    
    // Cards & Layout
    { type: 'Card', icon: Card, description: 'Carte avec contenu', category: 'Cards' },
    { type: 'ProductCard', icon: Card, description: 'Carte produit', category: 'Cards' },
    { type: 'UserCard', icon: Card, description: 'Carte utilisateur', category: 'Cards' },
    { type: 'StatsCard', icon: Card, description: 'Carte statistiques', category: 'Cards' },
    
    // Overlay
    { type: 'Modal', icon: Eye, description: 'Modal', category: 'Overlay' },
    { type: 'Tooltip', icon: Eye, description: 'Info-bulle', category: 'Overlay' },
    { type: 'Dropdown', icon: Eye, description: 'Menu déroulant', category: 'Overlay' },
    { type: 'Popup', icon: Eye, description: 'Pop-up', category: 'Overlay' },
    
    // Navigation
    { type: 'Navbar', icon: Layout, description: 'Navigation', category: 'Navigation' },
    { type: 'Breadcrumb', icon: Layout, description: 'Fil d\'Ariane', category: 'Navigation' },
    { type: 'Pagination', icon: Layout, description: 'Pagination', category: 'Navigation' },
    { type: 'Footer', icon: Layout, description: 'Pied de page', category: 'Navigation' },
    
    // Advanced
    { type: 'DataTable', icon: Code, description: 'Tableau de données', category: 'Advanced' },
    { type: 'Chart', icon: Code, description: 'Graphique', category: 'Advanced' },
    { type: 'Calendar', icon: Code, description: 'Calendrier', category: 'Advanced' },
    { type: 'Timeline', icon: Code, description: 'Chronologie', category: 'Advanced' },
    { type: 'ProgressBar', icon: Code, description: 'Barre de progression', category: 'Advanced' },
  ];

  // Ajouter un composant
  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: `component-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      children: [],
      style: getDefaultStyle(type)
    };
    setComponents([...components, newComponent]);
  };

  // Générer un composant avec l'IA
  const generateComponentWithAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simuler l'appel à l'IA (en attendant l'intégration réelle)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analyser le prompt pour déterminer le type de composant
      const lowerPrompt = aiPrompt.toLowerCase();
      let componentType = 'Container';
      
      if (lowerPrompt.includes('bouton') || lowerPrompt.includes('button') || lowerPrompt.includes('cliquer')) {
        componentType = 'Button';
      } else if (lowerPrompt.includes('texte') || lowerPrompt.includes('text') || lowerPrompt.includes('titre')) {
        componentType = 'Text';
      } else if (lowerPrompt.includes('image') || lowerPrompt.includes('photo') || lowerPrompt.includes('picture')) {
        componentType = 'Image';
      } else if (lowerPrompt.includes('carte') || lowerPrompt.includes('card') || lowerPrompt.includes('bloc')) {
        componentType = 'Card';
      } else if (lowerPrompt.includes('formulaire') || lowerPrompt.includes('form') || lowerPrompt.includes('input')) {
        componentType = 'Form';
      } else if (lowerPrompt.includes('liste') || lowerPrompt.includes('list') || lowerPrompt.includes('éléments')) {
        componentType = 'List';
      }
      
      // Créer le composant avec des props intelligentes
      const newComponent: Component = {
        id: `ai-component-${Date.now()}`,
        type: componentType,
        props: getAIEnhancedProps(componentType, aiPrompt),
        children: [],
        style: getAIEnhancedStyle(componentType, aiPrompt)
      };
      
      setComponents([...components, newComponent]);
      setAiPrompt('');
      
      // Ajouter des suggestions IA
      setAiSuggestions(generateAISuggestions(componentType));
      
    } catch (error) {
      console.error('Erreur lors de la génération IA:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Props améliorées par l'IA
  const getAIEnhancedProps = (type: string, prompt: string) => {
    const baseProps = getDefaultProps(type);
    const lowerPrompt = prompt.toLowerCase();
    
    switch (type) {
      case 'Button':
        return {
          ...baseProps,
          text: lowerPrompt.includes('sauvegarder') ? '💾 Sauvegarder' :
                lowerPrompt.includes('envoyer') ? '📤 Envoyer' :
                lowerPrompt.includes('annuler') ? '❌ Annuler' :
                lowerPrompt.includes('confirmer') ? '✅ Confirmer' :
                '✨ ' + prompt.substring(0, 20) + '...',
          onClick: 'alert("Action IA exécutée!")'
        };
      case 'Text':
        return {
          ...baseProps,
          content: prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt,
          size: lowerPrompt.includes('grand') ? 'large' : 
                lowerPrompt.includes('petit') ? 'small' : 'medium'
        };
      case 'Card':
        return {
          ...baseProps,
          title: prompt.split(' ').slice(0, 3).join(' '),
          description: prompt.length > 100 ? prompt.substring(0, 100) + '...' : prompt
        };
      default:
        return baseProps;
    }
  };

  // Styles améliorés par l'IA
  const getAIEnhancedStyle = (type: string, prompt: string) => {
    const baseStyle = getDefaultStyle(type);
    const lowerPrompt = prompt.toLowerCase();
    
    // Styles basés sur le contexte du prompt
    if (lowerPrompt.includes('moderne') || lowerPrompt.includes('futuriste')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      };
    }
    
    if (lowerPrompt.includes('minimaliste') || lowerPrompt.includes('simple')) {
      return {
        ...baseStyle,
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '4px',
        boxShadow: 'none'
      };
    }
    
    if (lowerPrompt.includes('coloré') || lowerPrompt.includes('vif')) {
      return {
        ...baseStyle,
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 3s ease infinite',
        color: 'white'
      };
    }
    
    return baseStyle;
  };

  // Générer des suggestions IA
  const generateAISuggestions = (componentType: string): string[] => {
    const suggestions: Record<string, string[]> = {
      'Button': [
        'Ajouter un bouton de navigation',
        'Créer un bouton de soumission de formulaire',
        'Générer un bouton d\'action principale',
        'Ajouter un bouton de retour'
      ],
      'Text': [
        'Ajouter un titre principal',
        'Créer un paragraphe descriptif',
        'Générer une citation inspirante',
        'Ajouter un sous-titre'
      ],
      'Card': [
        'Créer une carte de produit',
        'Ajouter une carte de profil utilisateur',
        'Générer une carte d\'article de blog',
        'Créer une carte de statistiques'
      ],
      'Form': [
        'Créer un formulaire de contact',
        'Ajouter un formulaire de connexion',
        'Générer un formulaire d\'inscription',
        'Créer un formulaire de feedback'
      ]
    };
    
    return suggestions[componentType] || [
      'Ajouter un composant similaire',
      'Créer une variante colorée',
      'Générer un composant moderne',
      'Ajouter un composant minimaliste'
    ];
  };

  // Props par défaut
  const getDefaultProps = (type: string) => {
    switch (type) {
      // Layout
      case 'Container':
        return { padding: '20px', maxWidth: '1200px' };
      case 'Grid':
        return { columns: 3, gap: '1rem', items: [] };
      case 'Flexbox':
        return { direction: 'row', justify: 'flex-start', align: 'stretch', wrap: false };
      case 'Section':
        return { title: 'Section', background: '#f8f9fa', padding: '40px' };
      case 'Sidebar':
        return { width: '250px', position: 'left', items: ['Menu 1', 'Menu 2', 'Menu 3'] };
      
      // Interactive
      case 'Button':
        return { text: 'Mon Bouton', variant: 'primary', onClick: 'alert("Clicked!")' };
      case 'Toggle':
        return { label: 'Activer', checked: false, size: 'medium' };
      case 'Slider':
        return { min: 0, max: 100, value: 50, step: 1, label: 'Valeur' };
      case 'Accordion':
        return { items: [{ title: 'Section 1', content: 'Contenu 1' }, { title: 'Section 2', content: 'Contenu 2' }] };
      case 'Tabs':
        return { items: [{ label: 'Onglet 1', content: 'Contenu 1' }, { label: 'Onglet 2', content: 'Contenu 2' }], activeTab: 0 };
      
      // Content
      case 'Text':
        return { content: 'Texte par défaut', size: 'medium', color: '#333' };
      case 'Heading':
        return { text: 'Titre', level: 1, color: '#000', align: 'left' };
      case 'List':
        return { items: ['Élément 1', 'Élément 2', 'Élément 3'], ordered: false, style: 'disc' };
      case 'Quote':
        return { text: 'Citation inspirante', author: 'Auteur', style: 'modern' };
      case 'Badge':
        return { text: 'Badge', color: 'blue', size: 'medium', variant: 'solid' };
      
      // Media
      case 'Image':
        return { src: 'https://via.placeholder.com/300x200', alt: 'Image', width: '300', height: '200' };
      case 'Video':
        return { src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', poster: '', controls: true };
      case 'Gallery':
        return { images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'], columns: 2 };
      case 'Avatar':
        return { src: 'https://via.placeholder.com/100x100', name: 'Utilisateur', size: 'medium' };
      
      // Form
      case 'Input':
        return { placeholder: 'Saisissez du texte...', type: 'text', required: false };
      case 'Textarea':
        return { placeholder: 'Votre message...', rows: 4, required: false };
      case 'Select':
        return { options: ['Option 1', 'Option 2', 'Option 3'], placeholder: 'Sélectionnez...', multiple: false };
      case 'Checkbox':
        return { label: 'Case à cocher', checked: false, required: false };
      case 'Radio':
        return { label: 'Bouton radio', name: 'radio-group', value: 'option1', checked: false };
      case 'Form':
        return { action: '#', method: 'post', title: 'Formulaire' };
      
      // Cards
      case 'Card':
        return { title: 'Titre', description: 'Description', image: '' };
      case 'ProductCard':
        return { title: 'Produit', price: '€29.99', image: 'https://via.placeholder.com/200x150', rating: 4.5 };
      case 'UserCard':
        return { name: 'John Doe', role: 'Développeur', avatar: 'https://via.placeholder.com/80x80', bio: 'Passionné de tech' };
      case 'StatsCard':
        return { title: 'Statistique', value: '1,234', change: '+12%', trend: 'up' };
      
      // Overlay
      case 'Modal':
        return { title: 'Modal', content: 'Contenu du modal', visible: false };
      case 'Tooltip':
        return { text: 'Info-bulle', content: 'Contenu de l\'info-bulle', position: 'top' };
      case 'Dropdown':
        return { items: ['Action 1', 'Action 2', 'Action 3'], trigger: 'Menu' };
      case 'Popup':
        return { title: 'Pop-up', content: 'Contenu du pop-up', position: 'center' };
      
      // Navigation
      case 'Navbar':
        return { brand: 'Mon App', items: ['Accueil', 'À propos', 'Contact'] };
      case 'Breadcrumb':
        return { items: ['Accueil', 'Section', 'Page actuelle'] };
      case 'Pagination':
        return { current: 1, total: 10, showPrevNext: true };
      case 'Footer':
        return { copyright: '© 2024 Mon App', links: [] };
      
      // Advanced
      case 'DataTable':
        return { columns: ['Nom', 'Âge', 'Ville'], data: [['John', '25', 'Paris'], ['Jane', '30', 'Lyon']] };
      case 'Chart':
        return { type: 'bar', data: [10, 20, 30, 40], labels: ['Q1', 'Q2', 'Q3', 'Q4'] };
      case 'Calendar':
        return { month: new Date().getMonth(), year: new Date().getFullYear(), events: [] };
      case 'Timeline':
        return { items: [{ date: '2024-01-01', title: 'Événement 1', description: 'Description' }] };
      case 'ProgressBar':
        return { value: 75, max: 100, label: 'Progression', showPercentage: true };
      
      default:
        return {};
    }
  };

  // Style par défaut
  const getDefaultStyle = (type: string) => {
    switch (type) {
      case 'Container':
        return { padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' };
      case 'Button':
        return { padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
      case 'Text':
        return { fontSize: '16px', color: '#333', margin: '8px 0' };
      case 'Image':
        return { borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
      case 'Card':
        return { padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' };
      case 'Input':
        return { padding: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', width: '100%' };
      case 'Form':
        return { padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0' };
      case 'List':
        return { padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0' };
      case 'Grid':
        return { display: 'grid', gap: '16px', padding: '16px' };
      case 'Modal':
        return { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' };
      case 'Navbar':
        return { backgroundColor: '#333', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
      case 'Footer':
        return { backgroundColor: '#f8f9fa', padding: '24px', textAlign: 'center', borderTop: '1px solid #e0e0e0' };
      default:
        return {};
    }
  };

  // Générer le code React
  const generateCode = () => {
    const generateComponentCode = (comp: Component): string => {
      const props = Object.entries(comp.props).map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}="${value}"`;
      }).join(' ');
      
      const style = comp.style ? ` style={${JSON.stringify(comp.style)}}` : '';
      const children = comp.children?.map(generateComponentCode).join('') || '';
      
      return `<${comp.type}${props ? ` ${props}` : ''}${style}>
        ${children}
      </${comp.type}>`;
    };

    const imports = `import React from 'react';
import './App.css';`;
    
    const componentCode = `export default function App() {
  return (
    <div className="app">
      ${components.map(generateComponentCode).join('')}
    </div>
  );
}`;

    return `${imports}\n\n${componentCode}`;
  };

  // Mettre à jour le code
  useEffect(() => {
    setCode(generateCode());
  }, [components]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">🚀 App Builder</h1>
          <div className="flex space-x-2">
            <Button onClick={() => setPreviewMode('desktop')} variant={previewMode === 'desktop' ? 'default' : 'outline'}>
              <Monitor className="w-4 h-4" />
            </Button>
            <Button onClick={() => setPreviewMode('tablet')} variant={previewMode === 'tablet' ? 'default' : 'outline'}>
              <Tablet className="w-4 h-4" />
            </Button>
            <Button onClick={() => setPreviewMode('mobile')} variant={previewMode === 'mobile' ? 'default' : 'outline'}>
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowProjectManager(true)}
            variant="outline"
          >
            <Folder className="w-4 h-4 mr-2" />
            Projets
          </Button>
          <Button onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button onClick={handleSaveProject}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button onClick={handleCopyCode}>
            <Copy className="w-4 h-4 mr-2" />
            Code
          </Button>
          <Button 
            onClick={handleExportProject}
            disabled={isExporting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Export...' : 'Exporter'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Composants */}
        <div className="w-80 bg-white border-r p-4 overflow-y-auto">
          {/* Assistant IA */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg text-white">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">Assistant IA</h3>
            </div>
            <div className="space-y-3">
              <Textarea
                placeholder="Décrivez le composant que vous voulez créer..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder-white/70 resize-none"
                rows={2}
              />
              <Button
                onClick={generateComponentWithAI}
                disabled={!aiPrompt.trim() || isGenerating}
                className="w-full bg-white text-purple-600 hover:bg-white/90"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                    Génération...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Générer avec l'IA
                  </>
                )}
              </Button>
            </div>
            
            {/* Suggestions IA */}
            {aiSuggestions.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-white/80 mb-2">Suggestions :</p>
                <div className="space-y-1">
                  {aiSuggestions.slice(0, 2).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setAiPrompt(suggestion)}
                      className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-4">Composants</h2>
          
          {/* Organiser par catégories */}
          {['Layout', 'Interactive', 'Content', 'Media', 'Form', 'Cards', 'Overlay', 'Navigation', 'Advanced'].map((category) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-1 gap-2">
                {availableComponents
                  .filter(comp => comp.category === category)
                  .map((comp) => (
                    <Card 
                      key={comp.type}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => addComponent(comp.type)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <comp.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{comp.type}</div>
                            <div className="text-xs text-gray-500 truncate">{comp.description}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Zone de construction */}
        <div className="flex-1 p-4">
          <Tabs defaultValue="builder" className="h-full">
            <TabsList className="mb-4">
              <TabsTrigger value="builder">
                <Layout className="w-4 h-4 mr-2" />
                Builder
              </TabsTrigger>
              <TabsTrigger value="code">
                <Code className="w-4 h-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="h-full">
              <div className={`mx-auto transition-all duration-300 ${
                previewMode === 'mobile' ? 'max-w-sm' : 
                previewMode === 'tablet' ? 'max-w-2xl' : 
                'max-w-4xl'
              }`}>
                <div className="bg-white rounded-lg shadow-lg min-h-96 p-6">
                  <div className="text-center text-gray-500 mb-4">
                    Zone de construction - Glissez vos composants ici
                  </div>
                  
                  {components.length === 0 ? (
                    <div className="text-center py-12">
                      <Layout className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Commencez par ajouter un composant</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {components.map((comp) => (
                        <div
                          key={comp.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedComponent === comp.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedComponent(comp.id)}
                        >
                          <div className="text-sm text-gray-600 mb-2">{comp.type}</div>
                          <div className="text-gray-800">
                            {comp.type === 'Button' && (
                              <button 
                                style={comp.style}
                                className="px-4 py-2 rounded"
                                onClick={() => {
                                  // Safe click handler - no eval needed
                                  console.log('Button clicked:', comp.props.text);
                                  // You can add custom logic here
                                }}
                              >
                                {comp.props.text}
                              </button>
                            )}
                            {comp.type === 'Text' && (
                              <p style={comp.style}>
                                {comp.props.content}
                              </p>
                            )}
                            {comp.type === 'Image' && (
                              <img 
                                src={comp.props.src} 
                                alt={comp.props.alt}
                                style={comp.style}
                                className="max-w-full h-auto"
                              />
                            )}
                            {comp.type === 'Card' && (
                              <div style={comp.style}>
                                <h3 className="font-semibold text-lg mb-2">{comp.props.title}</h3>
                                <p className="text-gray-600">{comp.props.description}</p>
                                {comp.props.image && (
                                  <img src={comp.props.image} alt="" className="mt-2 rounded" />
                                )}
                              </div>
                            )}
                            {comp.type === 'Input' && (
                              <input 
                                type={comp.props.type}
                                placeholder={comp.props.placeholder}
                                required={comp.props.required}
                                style={comp.style}
                              />
                            )}
                            {comp.type === 'Form' && (
                              <form style={comp.style} action={comp.props.action} method={comp.props.method}>
                                <h3 className="font-semibold mb-4">{comp.props.title}</h3>
                                <div className="space-y-3">
                                  <input type="text" placeholder="Nom" className="w-full p-2 border rounded" />
                                  <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Envoyer</button>
                                </div>
                              </form>
                            )}
                            {comp.type === 'List' && (
                              <div style={comp.style}>
                                {comp.props.ordered ? (
                                  <ol>
                                    {comp.props.items.map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ol>
                                ) : (
                                  <ul>
                                    {comp.props.items.map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                            {comp.type === 'Grid' && (
                              <div style={{...comp.style, gridTemplateColumns: `repeat(${comp.props.columns}, 1fr)`}}>
                                {comp.props.items.map((item: any, idx: number) => (
                                  <div key={idx} className="p-4 border rounded">Élément {idx + 1}</div>
                                ))}
                              </div>
                            )}
                            {comp.type === 'Navbar' && (
                              <nav style={comp.style}>
                                <div className="flex items-center justify-between">
                                  <div className="font-bold">{comp.props.brand}</div>
                                  <ul className="flex space-x-4">
                                    {comp.props.items.map((item: string, idx: number) => (
                                      <li key={idx}>
                                        <a href="#" className="hover:underline">{item}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </nav>
                            )}
                            {comp.type === 'Footer' && (
                              <footer style={comp.style}>
                                <p>{comp.props.copyright}</p>
                              </footer>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="h-full">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto h-full">
                <pre>{code}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panneau de propriétés */}
        <div className="w-80 bg-white border-l p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Propriétés</h2>
          {selectedComponent ? (
            <div className="space-y-4">
              {(() => {
                const comp = components.find(c => c.id === selectedComponent);
                if (!comp) return null;
                
                return (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <div className="p-2 bg-gray-100 rounded">{comp.type}</div>
                    </div>
                    
                    {/* Propriétés dynamiques selon le type */}
                    {comp.type === 'Button' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Texte</label>
                          <Input 
                            value={comp.props.text}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, text: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Action</label>
                          <Input 
                            value={comp.props.onClick}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, onClick: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                      </>
                    )}
                    
                    {comp.type === 'Text' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Contenu</label>
                        <Textarea 
                          value={comp.props.content}
                          onChange={(e) => {
                            const newComponents = components.map(c => 
                              c.id === selectedComponent 
                                ? { ...c, props: { ...c.props, content: e.target.value }}
                                : c
                            );
                            setComponents(newComponents);
                          }}
                        />
                      </div>
                    )}
                    
                    {comp.type === 'Image' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">URL de l'image</label>
                          <Input 
                            value={comp.props.src}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, src: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Texte alternatif</label>
                          <Input 
                            value={comp.props.alt}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, alt: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                      </>
                    )}
                    
                    {comp.type === 'Card' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Titre</label>
                          <Input 
                            value={comp.props.title}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, title: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <Textarea 
                            value={comp.props.description}
                            onChange={(e) => {
                              const newComponents = components.map(c => 
                                c.id === selectedComponent 
                                  ? { ...c, props: { ...c.props, description: e.target.value }}
                                  : c
                              );
                              setComponents(newComponents);
                            }}
                          />
                        </div>
                      </>
                    )}
                    
                    {/* Bouton pour supprimer le composant */}
                    <div className="pt-4 border-t">
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => {
                          setComponents(components.filter(c => c.id !== selectedComponent));
                          setSelectedComponent(null);
                        }}
                      >
                        Supprimer ce composant
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-4">🎯</div>
              <p>Sélectionnez un composant pour modifier ses propriétés</p>
            </div>
          )}
        </div>
      </div>

      {/* Prévisualisation en direct */}
      <LivePreview 
        components={components}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Modal du gestionnaire de projets */}
      {showProjectManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Gestion des Projets</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowProjectManager(false)}
              >
                Fermer
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <ProjectManager 
                onProjectSelect={(project) => {
                  setComponents(project.components);
                  setShowProjectManager(false);
                }}
                onNewProject={() => {
                  setComponents([]);
                  setShowProjectManager(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
