import React, { useState } from 'react';
import { 
  Rocket, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Settings, 
  Plus, 
  RefreshCw,
  Globe,
  Server,
  Database,
  Cloud,
  Zap,
  AlertTriangle,
  Activity,
  Calendar,
  User,
  GitBranch,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Deployment {
  id: string;
  name: string;
  url: string;
  status: 'success' | 'failed' | 'pending' | 'building';
  environment: 'production' | 'staging' | 'development';
  platform: 'vercel' | 'netlify' | 'aws' | 'custom';
  lastDeployed: string;
  deployedBy: string;
  commitHash: string;
  branch: string;
  buildTime: number;
  logs: string[];
}

interface DeploymentTemplate {
  id: string;
  name: string;
  description: string;
  platform: string;
  config: any;
  icon: React.ComponentType<any>;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    name: 'E-commerce App',
    url: 'https://ecommerce-app.vercel.app',
    status: 'success',
    environment: 'production',
    platform: 'vercel',
    lastDeployed: '2024-01-20 14:30',
    deployedBy: 'Alex Developer',
    commitHash: 'a1b2c3d',
    branch: 'main',
    buildTime: 120,
    logs: ['Build started', 'Dependencies installed', 'Build completed successfully']
  },
  {
    id: '2',
    name: 'Portfolio Site',
    url: 'https://portfolio-site.netlify.app',
    status: 'failed',
    environment: 'staging',
    platform: 'netlify',
    lastDeployed: '2024-01-20 12:15',
    deployedBy: 'Sarah Designer',
    commitHash: 'e4f5g6h',
    branch: 'develop',
    buildTime: 0,
    logs: ['Build started', 'Error: Module not found', 'Build failed']
  },
  {
    id: '3',
    name: 'Dashboard App',
    url: 'https://dashboard-app.aws.amazon.com',
    status: 'building',
    environment: 'production',
    platform: 'aws',
    lastDeployed: '2024-01-20 15:45',
    deployedBy: 'Mike Developer',
    commitHash: 'i7j8k9l',
    branch: 'main',
    buildTime: 0,
    logs: ['Build started', 'Installing dependencies...']
  }
];

const deploymentTemplates: DeploymentTemplate[] = [
  {
    id: '1',
    name: 'Vercel',
    description: 'Déploiement rapide avec Vercel',
    platform: 'vercel',
    icon: Cloud,
    config: {
      buildCommand: 'npm run build',
      outputDirectory: 'dist',
      environment: 'production'
    }
  },
  {
    id: '2',
    name: 'Netlify',
    description: 'Hébergement statique avec Netlify',
    platform: 'netlify',
    icon: Globe,
    config: {
      buildCommand: 'npm run build',
      publishDirectory: 'dist',
      environment: 'production'
    }
  },
  {
    id: '3',
    name: 'AWS S3 + CloudFront',
    description: 'Déploiement sur AWS',
    platform: 'aws',
    icon: Server,
    config: {
      bucket: 'my-app-bucket',
      region: 'us-east-1',
      distribution: 'E1234567890'
    }
  }
];

export function DeploymentManager() {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'building': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return XCircle;
      case 'pending': return Clock;
      case 'building': return RefreshCw;
      default: return Clock;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'vercel': return Cloud;
      case 'netlify': return Globe;
      case 'aws': return Server;
      default: return Server;
    }
  };

  const handleDeploy = (templateId: string) => {
    console.log('Déploiement avec le template:', templateId);
    setShowDeployModal(false);
  };

  const handleRedeploy = (deploymentId: string) => {
    console.log('Redéploiement:', deploymentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Déploiements</h1>
          <p className="text-gray-600 mt-2">Déployez vos applications sur différentes plateformes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </Button>
          <Dialog open={showDeployModal} onOpenChange={setShowDeployModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Déploiement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouveau Déploiement</DialogTitle>
                <DialogDescription>
                  Choisissez une plateforme et configurez votre déploiement
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="app-name">Nom de l'application</Label>
                  <Input id="app-name" placeholder="Mon Application" />
                </div>
                <div>
                  <Label htmlFor="template">Plateforme de déploiement</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      {deploymentTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center gap-2">
                            <template.icon className="w-4 h-4" />
                            {template.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="environment">Environnement</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un environnement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branche Git</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une branche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">main</SelectItem>
                      <SelectItem value="develop">develop</SelectItem>
                      <SelectItem value="feature/new-feature">feature/new-feature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowDeployModal(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => handleDeploy(selectedTemplate)}>
                    Déployer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Deployment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Déploiements Actifs</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">
              -15s cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environnements</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Production, Staging, Dev
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles de Déploiement</CardTitle>
          <CardDescription>
            Choisissez parmi nos modèles pré-configurés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div key={template.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Déploiement rapide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>CI/CD automatique</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Configuration simple</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => setShowDeployModal(true)}
                  >
                    Utiliser ce Modèle
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Deployments */}
      <Tabs defaultValue="deployments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="deployments">Déploiements</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Déploiements Actifs</CardTitle>
              <CardDescription>
                Gérez vos déploiements en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment) => {
                  const StatusIcon = getStatusIcon(deployment.status);
                  const PlatformIcon = getPlatformIcon(deployment.platform);
                  return (
                    <div key={deployment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${getStatusColor(deployment.status)}`}>
                          <StatusIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{deployment.name}</h3>
                            <Badge className={getStatusColor(deployment.status)}>
                              {deployment.status}
                            </Badge>
                            <Badge variant="outline">
                              {deployment.environment}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <PlatformIcon className="w-4 h-4" />
                              {deployment.platform}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitBranch className="w-4 h-4" />
                              {deployment.branch}
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {deployment.commitHash}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {deployment.deployedBy}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {deployment.lastDeployed}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {deployment.buildTime}s
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(deployment.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Voir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRedeploy(deployment.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Redéployer
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs de Déploiement</CardTitle>
              <CardDescription>
                Surveillez les logs de vos déploiements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="border rounded-lg">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{deployment.name}</h3>
                        <Badge className={getStatusColor(deployment.status)}>
                          {deployment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        {deployment.logs.map((log, index) => (
                          <div key={index} className="mb-1">
                            <span className="text-gray-500">[{deployment.lastDeployed}]</span> {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des Déploiements</CardTitle>
              <CardDescription>
                Configurez vos paramètres de déploiement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Déploiement Automatique</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Déploiement sur push</span>
                        <Button variant="outline" size="sm">Activer</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tests automatiques</span>
                        <Button variant="outline" size="sm">Activer</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications</span>
                        <Button variant="outline" size="sm">Activer</Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Environnements</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="prod-url">URL Production</Label>
                        <Input id="prod-url" placeholder="https://app.example.com" />
                      </div>
                      <div>
                        <Label htmlFor="staging-url">URL Staging</Label>
                        <Input id="staging-url" placeholder="https://staging.example.com" />
                      </div>
                      <div>
                        <Label htmlFor="dev-url">URL Development</Label>
                        <Input id="dev-url" placeholder="https://dev.example.com" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Sauvegarder la Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
