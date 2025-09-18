import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Tablet
} from 'lucide-react';

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

  // Composants disponibles
  const availableComponents = [
    { type: 'Container', icon: Layout, description: 'Conteneur flexible' },
    { type: 'Button', icon: Plus, description: 'Bouton cliquable' },
    { type: 'Text', icon: Code, description: 'Texte simple' },
    { type: 'Image', icon: Eye, description: 'Image' },
    { type: 'Card', icon: Card, description: 'Carte avec contenu' },
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

  // Props par défaut
  const getDefaultProps = (type: string) => {
    switch (type) {
      case 'Button':
        return { text: 'Mon Bouton', variant: 'primary' };
      case 'Text':
        return { content: 'Texte par défaut', size: 'medium' };
      case 'Image':
        return { src: 'https://via.placeholder.com/300x200', alt: 'Image' };
      case 'Card':
        return { title: 'Titre', description: 'Description' };
      default:
        return {};
    }
  };

  // Style par défaut
  const getDefaultStyle = (type: string) => {
    switch (type) {
      case 'Container':
        return { padding: '20px', backgroundColor: '#f5f5f5' };
      case 'Button':
        return { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' };
      case 'Text':
        return { fontSize: '16px', color: '#333' };
      default:
        return {};
    }
  };

  // Générer le code React
  const generateCode = () => {
    const generateComponentCode = (comp: Component): string => {
      const props = Object.entries(comp.props).map(([key, value]) => 
        `${key}="${value}"`
      ).join(' ');
      
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
          <Button onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Composants */}
        <div className="w-80 bg-white border-r p-4">
          <h2 className="text-lg font-semibold mb-4">Composants</h2>
          <div className="grid grid-cols-2 gap-2">
            {availableComponents.map((comp) => (
              <Card 
                key={comp.type}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addComponent(comp.type)}
              >
                <CardContent className="p-3 text-center">
                  <comp.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-medium">{comp.type}</div>
                  <div className="text-xs text-gray-500">{comp.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                                className="max-w-full h-auto rounded"
                              />
                            )}
                            {comp.type === 'Card' && (
                              <div className="border rounded-lg p-4">
                                <h3 className="font-semibold">{comp.props.title}</h3>
                                <p className="text-gray-600">{comp.props.description}</p>
                              </div>
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
        <div className="w-80 bg-white border-l p-4">
          <h2 className="text-lg font-semibold mb-4">Propriétés</h2>
          {selectedComponent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="p-2 bg-gray-100 rounded">{selectedComponent}</div>
              </div>
              {/* Ajouter plus de propriétés ici */}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Sélectionnez un composant pour modifier ses propriétés
            </div>
          )}
        </div>
      </div>

      {/* Modal de prévisualisation */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-96 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Aperçu en direct</h2>
              <Button onClick={() => setIsPreviewOpen(false)}>Fermer</Button>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              {/* Aperçu du code généré */}
              <pre className="text-sm">{code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
