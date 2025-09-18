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
  Zap,
  Shield,
  Globe,
  BarChart3,
  Database,
  Share2,
  Clock
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
      name: 'SaaS Landing Pro',
      description: 'Page d\'accueil SaaS avec CTA optimisés et analytics',
      preview: '🚀',
      category: 'Marketing',
      features: ['Hero', 'Features', 'Pricing', 'Testimonials', 'Analytics'],
      difficulty: 'Facile',
      time: '15 min',
      rating: 4.8,
      premium: false
    },
    {
      name: 'Portfolio 3D Interactive',
      description: 'Portfolio avec animations 3D et effets visuels avancés',
      preview: '👤',
      category: 'Portfolio',
      features: ['3D Gallery', 'Interactive CV', 'Contact Form', 'Blog', 'Animations'],
      difficulty: 'Avancé',
      time: '1h 30',
      rating: 4.7,
      premium: true
    },
    {
      name: 'Mobile PWA Pro',
      description: 'Application mobile avec fonctionnalités offline et notifications',
      preview: '📱',
      category: 'Mobile',
      features: ['PWA', 'Offline Mode', 'Push Notifications', 'Background Sync'],
      difficulty: 'Avancé',
      time: '1h 30',
      rating: 4.8,
      premium: true
    },
    {
      name: 'CRM Business Suite',
      description: 'Système CRM complet avec pipeline de vente et analytics',
      preview: '💼',
      category: 'Business',
      features: ['Lead Management', 'Sales Pipeline', 'Analytics', 'Reports', 'Team Collaboration'],
      difficulty: 'Avancé',
      time: '2h 30',
      rating: 4.9,
      premium: true
    },
    {
      name: 'Restaurant Menu App',
      description: 'Application de menu interactif avec commande en ligne',
      preview: '🍽️',
      category: 'Food & Beverage',
      features: ['Interactive Menu', 'Online Ordering', 'QR Code', 'Payment Integration'],
      difficulty: 'Intermédiaire',
      time: '45 min',
      rating: 4.6,
      premium: false
    },
    {
      name: 'Fitness Tracker Pro',
      description: 'Application de suivi fitness avec graphiques et analytics',
      preview: '💪',
      category: 'Health & Fitness',
      features: ['Workout Tracking', 'Progress Charts', 'Goal Setting', 'Social Features'],
      difficulty: 'Intermédiaire',
      time: '1h',
      rating: 4.7,
      premium: false
    },
    {
      name: 'Blog CMS Advanced',
      description: 'Blog avec éditeur WYSIWYG et SEO optimisé',
      preview: '📝',
      category: 'Content',
      features: ['WYSIWYG Editor', 'SEO Tools', 'Comment System', 'Analytics'],
      difficulty: 'Intermédiaire',
      time: '30 min',
      rating: 4.5,
      premium: false
    },
    {
      name: 'Event Management',
      description: 'Plateforme de gestion d\'événements avec ticketing',
      preview: '🎉',
      category: 'Events',
      features: ['Event Creation', 'Ticket Sales', 'Attendee Management', 'Analytics'],
      difficulty: 'Avancé',
      time: '2h',
      rating: 4.8,
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 opacity-30 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 opacity-40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 opacity-35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-indigo-200 opacity-25 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                L'App Builder du
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  {' '}Futur
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Créez des applications révolutionnaires avec IA. 
                Templates professionnels, déploiement automatique, analytics intégrés.
                <span className="font-semibold text-purple-600"> Aucun code requis.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => navigate({ to: '/ai-builder' })}
              >
                <Brain className="w-5 h-5 mr-2" />
                Créer avec IA
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Voir la Démo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-gray-500 text-sm mb-4">Rejoint par plus de 10,000 développeurs</p>
              <div className="flex justify-center items-center space-x-8 opacity-80">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 font-semibold">10K+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-semibold">4.9/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 font-semibold">50+ Pays</span>
                </div>
              </div>
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
              <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 border-0 shadow-lg">
                <CardHeader className="relative">
                  {/* Premium Badge */}
                  {template.premium && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      PREMIUM
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{template.preview}</div>
                    <div className="flex items-center space-x-2">
                      {template.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{template.rating}</span>
                        </div>
                      )}
                      {template.premium && (
                        <div className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-semibold">
                          Pro
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">{template.name}</CardTitle>
                      <p className="text-sm text-gray-500">{template.category}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  {/* Template Info */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    {template.difficulty && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          template.difficulty === 'Facile' ? 'bg-green-400' :
                          template.difficulty === 'Intermédiaire' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <span className="text-gray-600">{template.difficulty}</span>
                      </div>
                    )}
                    {template.time && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{template.time}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 4).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{template.features.length - 4} plus
                      </span>
                    )}
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