import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Zap, 
  Palette, 
  Code, 
  Rocket, 
  Star, 
  Users, 
  ArrowRight,
  Play,
  Download,
  Eye,
  Brain,
  Sparkles,
  Lightning,
  Shield,
  Globe,
  BarChart3,
  Database,
  Share2
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'IA Intégrée',
      description: 'Génération automatique avec IA avancée',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Builder Visuel',
      description: 'Créez des apps avec drag & drop, sans code',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Code,
      title: 'Code en Direct',
      description: 'Voir le code React généré en temps réel',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Rocket,
      title: 'Déploiement Auto',
      description: 'Déployez sur Vercel/Netlify en 1 clic',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Intégrés',
      description: 'Métriques et analytics en temps réel',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Sécurité Enterprise',
      description: 'Paiements Stripe, auth, et plus',
      color: 'from-red-500 to-red-600'
    }
  ];

  const templates = [
    {
      name: 'SaaS Dashboard',
      description: 'Tableau de bord complet avec analytics',
      preview: '📊',
      category: 'SaaS',
      features: ['Analytics', 'Users', 'Payments']
    },
    {
      name: 'E-commerce Store',
      description: 'Boutique en ligne moderne',
      preview: '🛒',
      category: 'E-commerce',
      features: ['Products', 'Cart', 'Payments']
    },
    {
      name: 'AI-Powered App',
      description: 'Application avec IA intégrée',
      preview: '🧠',
      category: 'AI',
      features: ['AI Chat', 'Generation', 'Smart Forms']
    },
    {
      name: 'Startup Landing',
      description: 'Page d\'accueil conversion-optimisée',
      preview: '🚀',
      category: 'Marketing',
      features: ['Hero', 'Features', 'CTA']
    },
    {
      name: 'Portfolio Pro',
      description: 'Site vitrine professionnel',
      preview: '👤',
      category: 'Portfolio',
      features: ['Gallery', 'Contact', 'Blog']
    },
    {
      name: 'Mobile App',
      description: 'Application mobile responsive',
      preview: '📱',
      category: 'Mobile',
      features: ['Responsive', 'Touch', 'Native']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              L'App Builder du
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Futur
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Créez des applications révolutionnaires avec IA. 
              Templates professionnels, déploiement automatique, analytics intégrés.
              <span className="font-semibold text-purple-600"> Aucun code requis.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => navigate({ to: '/ai-builder' })}
              >
                <Brain className="w-5 h-5 mr-2" />
                Créer avec IA
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4"
              >
                <Play className="w-5 h-5 mr-2" />
                Voir la Démo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir notre Builder ?
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour créer des applications professionnelles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Templates Prêts à l'Emploi
            </h2>
            <p className="text-xl text-gray-600">
              Commencez avec des designs professionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{template.preview}</div>
                    <div className="flex space-x-1">
                      {template.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-gray-500">{template.category}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Apps Créées</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Utilisateurs Actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Client</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à Créer votre App ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de développeurs qui créent des apps incroyables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-4"
              onClick={() => navigate({ to: '/builder' })}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Commencer Maintenant
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">🚀 App Builder</h3>
            <p className="text-gray-400 mb-6">
              La plateforme de création d'applications la plus simple au monde
            </p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <Code className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                Communauté
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}