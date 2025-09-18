import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Code, 
  Download, 
  Eye, 
  Clock, 
  Star,
  Activity,
  Zap,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MetricData {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}

interface ChartData {
  date: string;
  apps: number;
  users: number;
  views: number;
  builds: number;
}

interface TopApp {
  id: string;
  name: string;
  category: string;
  views: number;
  builds: number;
  rating: number;
  status: 'active' | 'draft' | 'published';
}

interface UserActivity {
  id: string;
  name: string;
  action: string;
  app: string;
  timestamp: string;
  avatar?: string;
}

const mockMetrics: MetricData[] = [
  {
    name: 'Applications Créées',
    value: 1247,
    change: 12.5,
    trend: 'up',
    icon: Code,
    color: 'text-blue-600'
  },
  {
    name: 'Utilisateurs Actifs',
    value: 2840,
    change: 8.2,
    trend: 'up',
    icon: Users,
    color: 'text-green-600'
  },
  {
    name: 'Vues Total',
    value: 45620,
    change: 15.3,
    trend: 'up',
    icon: Eye,
    color: 'text-purple-600'
  },
  {
    name: 'Builds Réussis',
    value: 8934,
    change: -2.1,
    trend: 'down',
    icon: Zap,
    color: 'text-orange-600'
  }
];

const mockChartData: ChartData[] = [
  { date: '2024-01-01', apps: 45, users: 120, views: 890, builds: 67 },
  { date: '2024-01-02', apps: 52, users: 135, views: 920, builds: 72 },
  { date: '2024-01-03', apps: 48, users: 128, views: 850, builds: 69 },
  { date: '2024-01-04', apps: 61, users: 142, views: 1100, builds: 85 },
  { date: '2024-01-05', apps: 58, users: 138, views: 980, builds: 78 },
  { date: '2024-01-06', apps: 67, users: 155, views: 1200, builds: 92 },
  { date: '2024-01-07', apps: 72, users: 168, views: 1350, builds: 105 }
];

const mockTopApps: TopApp[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    category: 'Business',
    views: 2450,
    builds: 156,
    rating: 4.8,
    status: 'published'
  },
  {
    id: '2',
    name: 'Dashboard Analytics',
    category: 'Analytics',
    views: 1890,
    builds: 98,
    rating: 4.6,
    status: 'published'
  },
  {
    id: '3',
    name: 'Portfolio Website',
    category: 'Portfolio',
    views: 1650,
    builds: 87,
    rating: 4.9,
    status: 'published'
  },
  {
    id: '4',
    name: 'Task Manager',
    category: 'Productivity',
    views: 1420,
    builds: 76,
    rating: 4.5,
    status: 'draft'
  },
  {
    id: '5',
    name: 'Blog Platform',
    category: 'Content',
    views: 1280,
    builds: 65,
    rating: 4.7,
    status: 'published'
  }
];

const mockUserActivity: UserActivity[] = [
  {
    id: '1',
    name: 'Alex Developer',
    action: 'Créé une nouvelle application',
    app: 'E-commerce Platform',
    timestamp: 'Il y a 2 minutes',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '2',
    name: 'Sarah Designer',
    action: 'Publié une application',
    app: 'Portfolio Website',
    timestamp: 'Il y a 15 minutes',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '3',
    name: 'Mike Developer',
    action: 'Modifié une application',
    app: 'Dashboard Analytics',
    timestamp: 'Il y a 1 heure',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '4',
    name: 'Emma Designer',
    action: 'Créé une nouvelle application',
    app: 'Task Manager',
    timestamp: 'Il y a 2 heures',
    avatar: '/api/placeholder/32/32'
  }
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? ArrowUpRight : ArrowDownRight;
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Surveillez les performances et l'utilisation de votre plateforme</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Dernière 24h</SelectItem>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.name}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <TrendIcon className={`h-3 w-3 mr-1 ${getTrendColor(metric.trend)}`} />
                  <span className={getTrendColor(metric.trend)}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="ml-1">vs période précédente</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Activité Récente
              </CardTitle>
              <CardDescription>
                Vue d'ensemble de l'activité sur les 7 derniers jours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Graphique d'activité</p>
                  <p className="text-sm text-gray-500">Intégration avec une librairie de graphiques</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activité Récente
                </CardTitle>
                <CardDescription>
                  Dernières actions des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.name}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                        <p className="text-xs text-blue-600">{activity.app}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Objectifs
                </CardTitle>
                <CardDescription>
                  Progression vers vos objectifs mensuels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Applications créées</span>
                      <span>1247 / 1500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Utilisateurs actifs</span>
                      <span>2840 / 3000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Vues total</span>
                      <span>45620 / 50000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="apps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Applications</CardTitle>
              <CardDescription>
                Applications les plus populaires et performantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopApps.map((app, index) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{app.name}</p>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{app.category}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            {app.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Zap className="w-3 h-3" />
                            {app.builds}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="w-3 h-3" />
                            {app.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Voir Détails
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Utilisateurs</CardTitle>
              <CardDescription>
                Comportement et engagement des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">2840</h3>
                  <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                  <p className="text-xs text-green-600 mt-1">+8.2% ce mois</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Clock className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">2.4h</h3>
                  <p className="text-sm text-gray-600">Temps Moyen/Session</p>
                  <p className="text-xs text-green-600 mt-1">+15% ce mois</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">78%</h3>
                  <p className="text-sm text-gray-600">Taux de Rétention</p>
                  <p className="text-xs text-green-600 mt-1">+5% ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Technique</CardTitle>
              <CardDescription>
                Métriques de performance et de fiabilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1.2s</div>
                  <p className="text-sm text-gray-600">Temps de Chargement</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0.1%</div>
                  <p className="text-sm text-gray-600">Taux d'Erreur</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
