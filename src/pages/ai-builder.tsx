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
  Zap,
  Brain,
  Sparkles,
  Rocket,
  Copy,
  Share2,
  Settings,
  Users,
  BarChart3,
  Globe,
  Database,
  Shield,
  Zap
} from 'lucide-react';

// Types avancés pour l'écosystème
interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: Component[];
  style?: Record<string, any>;
  aiGenerated?: boolean;
  category?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  components: Component[];
  template: string;
  createdAt: Date;
  updatedAt: Date;
  deployed?: boolean;
  analytics?: {
    views: number;
    users: number;
    conversions: number;
  };
}

interface AIPrompt {
  type: 'generate' | 'improve' | 'fix' | 'optimize';
  prompt: string;
  context?: string;
}

export default function AIBuilder() {
  const [project, setProject] = useState<Project>({
    id: '1',
    name: 'Mon App Révolutionnaire',
    description: 'Application créée avec IA',
    components: [],
    template: 'blank',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [code, setCode] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');

  // Templates avancés inspirés des meilleures startups
  const advancedTemplates = [
    {
      id: 'saas-dashboard',
      name: 'SaaS Dashboard',
      description: 'Tableau de bord complet avec analytics',
      preview: '📊',
      category: 'SaaS',
      components: [
        {
          id: 'header',
          type: 'Header',
          props: { title: 'Dashboard', user: 'John Doe', notifications: 5 },
          style: { backgroundColor: '#1f2937', color: 'white', padding: '1rem' }
        },
        {
          id: 'sidebar',
          type: 'Sidebar',
          props: { 
            items: [
              { label: 'Overview', icon: 'BarChart3', active: true },
              { label: 'Users', icon: 'Users' },
              { label: 'Analytics', icon: 'BarChart3' },
              { label: 'Settings', icon: 'Settings' }
            ]
          },
          style: { width: '250px', backgroundColor: '#f9fafb' }
        },
        {
          id: 'metrics',
          type: 'MetricsGrid',
          props: {
            metrics: [
              { label: 'Total Users', value: '12,345', change: '+12%', trend: 'up' },
              { label: 'Revenue', value: '$45,678', change: '+8%', trend: 'up' },
              { label: 'Conversion', value: '3.2%', change: '-2%', trend: 'down' },
              { label: 'Active Users', value: '8,901', change: '+15%', trend: 'up' }
            ]
          },
          style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }
        }
      ]
    },
    {
      id: 'ecommerce-store',
      name: 'E-commerce Store',
      description: 'Boutique en ligne moderne',
      preview: '🛒',
      category: 'E-commerce',
      components: [
        {
          id: 'hero',
          type: 'Hero',
          props: {
            title: 'Découvrez nos Produits',
            subtitle: 'Qualité premium à prix imbattables',
            cta: 'Voir la collection',
            background: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
          },
          style: { height: '400px', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }
        },
        {
          id: 'products',
          type: 'ProductGrid',
          props: {
            products: [
              { name: 'Produit 1', price: '$99', image: 'https://via.placeholder.com/300x200', rating: 4.5 },
              { name: 'Produit 2', price: '$149', image: 'https://via.placeholder.com/300x200', rating: 4.8 },
              { name: 'Produit 3', price: '$199', image: 'https://via.placeholder.com/300x200', rating: 4.2 }
            ]
          },
          style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }
        }
      ]
    },
    {
      id: 'landing-page',
      name: 'Landing Page',
      description: 'Page d\'accueil conversion-optimisée',
      preview: '🚀',
      category: 'Marketing',
      components: [
        {
          id: 'hero-section',
          type: 'HeroSection',
          props: {
            headline: 'Transformez vos Idées en Réalité',
            subheadline: 'L\'app builder le plus puissant au monde',
            ctaPrimary: 'Commencer Gratuitement',
            ctaSecondary: 'Voir la Démo',
            background: 'gradient'
          },
          style: { padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }
        },
        {
          id: 'features',
          type: 'FeaturesSection',
          props: {
            features: [
              { icon: 'Zap', title: 'Rapide', description: 'Créez en minutes' },
              { icon: 'Brain', title: 'Intelligent', description: 'IA intégrée' },
              { icon: 'Rocket', title: 'Puissant', description: 'Déploiement automatique' }
            ]
          },
          style: { padding: '4rem 0', backgroundColor: '#f8fafc' }
        }
      ]
    }
  ];

  // Composants avancés avec IA
  const advancedComponents = [
    { 
      type: 'AIGenerator', 
      icon: Brain, 
      description: 'Génère du contenu avec IA',
      category: 'AI'
    },
    { 
      type: 'SmartForm', 
      icon: Database, 
      description: 'Formulaire intelligent avec validation',
      category: 'Forms'
    },
    { 
      type: 'Analytics', 
      icon: BarChart3, 
      description: 'Tableau de bord analytics',
      category: 'Analytics'
    },
    { 
      type: 'Payment', 
      icon: Shield, 
      description: 'Intégration paiement Stripe',
      category: 'Commerce'
    },
    { 
      type: 'ChatWidget', 
      icon: Users, 
      description: 'Chat en temps réel',
      category: 'Communication'
    },
    { 
      type: 'Newsletter', 
      icon: Share2, 
      description: 'Système d\'email marketing',
      category: 'Marketing'
    },
    { 
      type: 'Deploy', 
      icon: Rocket, 
      description: 'Déploiement automatique',
      category: 'DevOps'
    },
    { 
      type: 'SEO', 
      icon: Globe, 
      description: 'Optimisation SEO automatique',
      category: 'SEO'
    }
  ];

  // Génération de code avancée avec IA
  const generateAdvancedCode = () => {
    const generateComponentCode = (comp: Component): string => {
      const props = Object.entries(comp.props).map(([key, value]) => {
        if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}="${value}"`;
      }).join(' ');
      
      const style = comp.style ? ` style={${JSON.stringify(comp.style)}}` : '';
      const children = comp.children?.map(generateComponentCode).join('') || '';
      
      // Code spécialisé par type de composant
      switch (comp.type) {
        case 'AIGenerator':
          return `<AIGenerator${props ? ` ${props}` : ''}${style}>
            <div className="ai-generator">
              <Brain className="w-6 h-6" />
              <p>Génération de contenu avec IA</p>
              <Button onClick={() => generateWithAI()}>Générer</Button>
            </div>
          </AIGenerator>`;
        
        case 'Analytics':
          return `<Analytics${props ? ` ${props}` : ''}${style}>
            <div className="analytics-dashboard">
              <h3>Analytics en Temps Réel</h3>
              <div className="metrics">
                <div className="metric">
                  <span className="value">12,345</span>
                  <span className="label">Utilisateurs</span>
                </div>
                <div className="metric">
                  <span className="value">$45,678</span>
                  <span className="label">Revenus</span>
                </div>
              </div>
            </div>
          </Analytics>`;
        
        case 'Payment':
          return `<Payment${props ? ` ${props}` : ''}${style}>
            <div className="payment-integration">
              <Shield className="w-6 h-6" />
              <h3>Paiement Sécurisé</h3>
              <p>Intégration Stripe complète</p>
              <Button>Configurer les Paiements</Button>
            </div>
          </Payment>`;
        
        default:
          return `<${comp.type}${props ? ` ${props}` : ''}${style}>
            ${children}
          </${comp.type}>`;
      }
    };

    const imports = `import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, BarChart3, Shield, Users, Rocket, Globe } from 'lucide-react';
import './App.css';

// Composants IA avancés
const AIGenerator = ({ prompt, onGenerate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  
  const generateContent = async () => {
    setIsGenerating(true);
    // Simulation génération IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult('Contenu généré par IA...');
    setIsGenerating(false);
  };
  
  return (
    <div className="ai-generator">
      <Brain className="w-6 h-6" />
      <p>Génération de contenu avec IA</p>
      <Button onClick={generateContent} disabled={isGenerating}>
        {isGenerating ? 'Génération...' : 'Générer'}
      </Button>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

const Analytics = ({ metrics }) => {
  return (
    <div className="analytics-dashboard">
      <h3>Analytics en Temps Réel</h3>
      <div className="metrics-grid">
        {metrics?.map((metric, index) => (
          <div key={index} className="metric-card">
            <span className="metric-value">{metric.value}</span>
            <span className="metric-label">{metric.label}</span>
              <span className={\`metric-change \${metric.trend}\`}>
                {metric.change}
              </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Payment = ({ config }) => {
  return (
    <div className="payment-integration">
      <Shield className="w-6 h-6" />
      <h3>Paiement Sécurisé</h3>
      <p>Intégration Stripe complète</p>
      <Button>Configurer les Paiements</Button>
    </div>
  );
};`;
    
    const componentCode = `export default function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Chargement des données
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // Logique de chargement
  };
  
  return (
    <div className="app">
      ${project.components.map(generateComponentCode).join('')}
    </div>
  );
}`;

    return `${imports}\n\n${componentCode}`;
  };

  // Génération IA
  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulation de génération IA (remplacer par vraie API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiComponent: Component = {
      id: `ai-${Date.now()}`,
      type: 'AIGenerated',
      props: { 
        prompt: aiPrompt,
        generated: true,
        content: `Contenu généré pour: "${aiPrompt}"`
      },
      style: { 
        padding: '1rem', 
        backgroundColor: '#f0f9ff', 
        border: '2px solid #0ea5e9',
        borderRadius: '8px'
      },
      aiGenerated: true,
      category: 'AI'
    };
    
    setProject(prev => ({
      ...prev,
      components: [...prev.components, aiComponent],
      updatedAt: new Date()
    }));
    
    setAiPrompt('');
    setIsGenerating(false);
  };

  // Appliquer un template
  const applyTemplate = (template: any) => {
    setProject(prev => ({
      ...prev,
      template: template.id,
      components: template.components,
      updatedAt: new Date()
    }));
  };

  // Ajouter un composant avancé
  const addAdvancedComponent = (type: string) => {
    const newComponent: Component = {
      id: `component-${Date.now()}`,
      type,
      props: getDefaultAdvancedProps(type),
      children: [],
      style: getDefaultAdvancedStyle(type),
      category: advancedComponents.find(c => c.type === type)?.category || 'General'
    };
    
    setProject(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
      updatedAt: new Date()
    }));
  };

  const getDefaultAdvancedProps = (type: string) => {
    switch (type) {
      case 'AIGenerator':
        return { prompt: '', model: 'gpt-4' };
      case 'SmartForm':
        return { fields: ['name', 'email'], validation: true };
      case 'Analytics':
        return { metrics: ['users', 'revenue', 'conversion'] };
      case 'Payment':
        return { provider: 'stripe', currency: 'EUR' };
      case 'ChatWidget':
        return { theme: 'modern', position: 'bottom-right' };
      case 'Newsletter':
        return { provider: 'mailchimp', doubleOptIn: true };
      case 'Deploy':
        return { platform: 'vercel', autoDeploy: true };
      case 'SEO':
        return { keywords: [], metaDescription: '' };
      default:
        return {};
    }
  };

  const getDefaultAdvancedStyle = (type: string) => {
    switch (type) {
      case 'AIGenerator':
        return { padding: '1rem', backgroundColor: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '8px' };
      case 'Analytics':
        return { padding: '1rem', backgroundColor: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '8px' };
      case 'Payment':
        return { padding: '1rem', backgroundColor: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '8px' };
      default:
        return { padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' };
    }
  };

  // Mettre à jour le code
  useEffect(() => {
    setCode(generateAdvancedCode());
  }, [project.components]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header avancé */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">AI App Builder</h1>
          </div>
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
            <Rocket className="w-4 h-4 mr-2" />
            Déployer
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
        {/* Sidebar - Templates et Composants */}
        <div className="w-96 bg-white border-r p-4 overflow-y-auto">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="components">Composants</TabsTrigger>
              <TabsTrigger value="ai">IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="mt-4">
              <h3 className="font-semibold mb-3">Templates Avancés</h3>
              <div className="space-y-3">
                {advancedTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => applyTemplate(template)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{template.preview}</div>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.category}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="components" className="mt-4">
              <h3 className="font-semibold mb-3">Composants Avancés</h3>
              <div className="grid grid-cols-2 gap-2">
                {advancedComponents.map((comp) => (
                  <Card 
                    key={comp.type}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addAdvancedComponent(comp.type)}
                  >
                    <CardContent className="p-3 text-center">
                      <comp.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm font-medium">{comp.type}</div>
                      <div className="text-xs text-gray-500">{comp.description}</div>
                      <div className="text-xs text-blue-500 mt-1">{comp.category}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-4">
              <h3 className="font-semibold mb-3">Génération IA</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Décrivez ce que vous voulez créer..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-20"
                />
                <Button 
                  onClick={generateWithAI} 
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="w-full"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Génération...' : 'Générer avec IA'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
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
              <TabsTrigger value="analytics">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="h-full">
              <div className={`mx-auto transition-all duration-300 ${
                previewMode === 'mobile' ? 'max-w-sm' : 
                previewMode === 'tablet' ? 'max-w-2xl' : 
                'max-w-6xl'
              }`}>
                <div className="bg-white rounded-lg shadow-lg min-h-96 p-6">
                  {project.components.length === 0 ? (
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Commencez votre App Révolutionnaire</h3>
                      <p className="text-gray-500 mb-4">Choisissez un template ou créez avec IA</p>
                      <div className="flex justify-center space-x-2">
                        <Button onClick={() => applyTemplate(advancedTemplates[0])}>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Template SaaS
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab('ai')}>
                          <Brain className="w-4 h-4 mr-2" />
                          Créer avec IA
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {project.components.map((comp) => (
                        <div
                          key={comp.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedComponent === comp.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          } ${comp.aiGenerated ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''}`}
                          onClick={() => setSelectedComponent(comp.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-gray-700">{comp.type}</div>
                            {comp.aiGenerated && (
                              <div className="flex items-center space-x-1 text-xs text-blue-600">
                                <Brain className="w-3 h-3" />
                                <span>IA</span>
                              </div>
                            )}
                          </div>
                          <div className="text-gray-800">
                            {comp.type === 'AIGenerated' && (
                              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                                <p className="text-sm">{comp.props.content}</p>
                              </div>
                            )}
                            {comp.type === 'Analytics' && (
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-green-100 p-2 rounded text-center">
                                  <div className="font-bold">12K</div>
                                  <div className="text-xs">Users</div>
                                </div>
                                <div className="bg-blue-100 p-2 rounded text-center">
                                  <div className="font-bold">$45K</div>
                                  <div className="text-xs">Revenue</div>
                                </div>
                                <div className="bg-purple-100 p-2 rounded text-center">
                                  <div className="font-bold">3.2%</div>
                                  <div className="text-xs">Conv.</div>
                                </div>
                              </div>
                            )}
                            {comp.type === 'Payment' && (
                              <div className="flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                <Shield className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm">Paiement Stripe configuré</span>
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
            
            <TabsContent value="analytics" className="h-full">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Analytics du Projet</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">Utilisateurs</div>
                          <div className="text-2xl font-bold">12,345</div>
                          <div className="text-sm text-green-600">+12%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">Vues</div>
                          <div className="text-2xl font-bold">45,678</div>
                          <div className="text-sm text-green-600">+8%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-semibold">Conversions</div>
                          <div className="text-2xl font-bold">3.2%</div>
                          <div className="text-sm text-red-600">-2%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panneau de propriétés avancé */}
        <div className="w-80 bg-white border-l p-4">
          <h2 className="text-lg font-semibold mb-4">Propriétés</h2>
          {selectedComponent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <div className="p-2 bg-gray-100 rounded">{selectedComponent}</div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <div className="p-2 bg-gray-100 rounded">
                  {project.components.find(c => c.id === selectedComponent)?.category || 'General'}
                </div>
              </div>
              {/* Ajouter plus de propriétés ici */}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Sélectionnez un composant pour modifier ses propriétés</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de prévisualisation avancée */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-6xl max-h-96 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Aperçu en Direct</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copier
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button onClick={() => setIsPreviewOpen(false)}>Fermer</Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <pre className="text-sm overflow-auto max-h-64">{code}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
