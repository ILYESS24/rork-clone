import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Activity,
  TrendingUp,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  Star,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'suspended' | 'pending';
  plan: 'free' | 'pro' | 'enterprise';
  joinedAt: string;
  lastActive: string;
  projects: number;
  apps: number;
  storage: number;
  location: string;
  verified: boolean;
}

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface SystemMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  status: 'healthy' | 'warning' | 'critical';
}

const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Alex Developer',
    email: 'alex@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'admin',
    status: 'active',
    plan: 'enterprise',
    joinedAt: '2024-01-15',
    lastActive: '2024-01-20',
    projects: 25,
    apps: 45,
    storage: 1024,
    location: 'Paris, France',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Designer',
    email: 'sarah@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'user',
    status: 'active',
    plan: 'pro',
    joinedAt: '2024-01-20',
    lastActive: '2024-01-19',
    projects: 12,
    apps: 18,
    storage: 512,
    location: 'Lyon, France',
    verified: true
  },
  {
    id: '3',
    name: 'Mike Developer',
    email: 'mike@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'user',
    status: 'suspended',
    plan: 'free',
    joinedAt: '2024-01-25',
    lastActive: '2024-01-18',
    projects: 3,
    apps: 5,
    storage: 100,
    location: 'Marseille, France',
    verified: false
  },
  {
    id: '4',
    name: 'Emma Designer',
    email: 'emma@example.com',
    avatar: '/api/placeholder/32/32',
    role: 'moderator',
    status: 'active',
    plan: 'pro',
    joinedAt: '2024-01-28',
    lastActive: '2024-01-20',
    projects: 8,
    apps: 12,
    storage: 256,
    location: 'Toulouse, France',
    verified: true
  }
];

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Stockage élevé',
    message: 'Plusieurs utilisateurs approchent de leur limite de stockage',
    timestamp: '2024-01-20 14:30',
    resolved: false
  },
  {
    id: '2',
    type: 'error',
    title: 'Erreur de build',
    message: 'Échec de build détecté pour 3 applications',
    timestamp: '2024-01-20 13:45',
    resolved: true
  },
  {
    id: '3',
    type: 'info',
    title: 'Mise à jour disponible',
    message: 'Nouvelle version du système disponible',
    timestamp: '2024-01-20 12:00',
    resolved: false
  }
];

const mockSystemMetrics: SystemMetric[] = [
  {
    name: 'Utilisateurs Actifs',
    value: 2840,
    change: 8.2,
    trend: 'up',
    status: 'healthy'
  },
  {
    name: 'Applications Créées',
    value: 1247,
    change: 12.5,
    trend: 'up',
    status: 'healthy'
  },
  {
    name: 'Stockage Utilisé',
    value: 75,
    change: 15.3,
    trend: 'up',
    status: 'warning'
  },
  {
    name: 'Taux d\'Erreur',
    value: 0.1,
    change: -5.2,
    trend: 'down',
    status: 'healthy'
  }
];

export function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'pro': return 'bg-blue-100 text-blue-800';
      case 'free': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} pour l'utilisateur ${userId}`);
  };

  const handleAlertResolve = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600 mt-2">Gérez votre plateforme et vos utilisateurs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres Système
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Nouvel Utilisateur
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {mockSystemMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.name}
              </CardTitle>
              <div className={`h-2 w-2 rounded-full ${getMetricStatusColor(metric.status)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value.toLocaleString()}{metric.name.includes('Taux') ? '%' : ''}
              </div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <TrendingUp className={`h-3 w-3 mr-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="ml-1">vs période précédente</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alertes Système
          </CardTitle>
          <CardDescription>
            Surveillez les alertes et problèmes système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-4 border rounded-lg ${alert.resolved ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
                    {alert.type === 'error' && <XCircle className="h-4 w-4" />}
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {alert.type === 'info' && <Activity className="h-4 w-4" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!alert.resolved && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAlertResolve(alert.id)}
                    >
                      Résoudre
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Utilisateurs</CardTitle>
              <CardDescription>
                Gérez les utilisateurs, leurs rôles et permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Modérateur</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          {user.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {user.role === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getPlanColor(user.plan)}>
                            {user.plan}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                        <div>
                          <p className="font-medium">{user.projects}</p>
                          <p className="text-xs">Projets</p>
                        </div>
                        <div>
                          <p className="font-medium">{user.apps}</p>
                          <p className="text-xs">Apps</p>
                        </div>
                        <div>
                          <p className="font-medium">{user.storage}MB</p>
                          <p className="text-xs">Stockage</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <Clock className="w-3 h-3" />
                        {user.lastActive}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'view')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'delete')}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Rôles</CardTitle>
              <CardDescription>
                Configurez les rôles et permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Administrateur</h3>
                      <p className="text-sm text-gray-600">Accès complet</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Gestion utilisateurs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Configuration système
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Analytics avancées
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Modifier
                  </Button>
                </div>
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Modérateur</h3>
                      <p className="text-sm text-gray-600">Modération contenu</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Modération contenu
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Support utilisateurs
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Configuration système
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Modifier
                  </Button>
                </div>
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-8 w-8 text-gray-600" />
                    <div>
                      <h3 className="font-semibold">Utilisateur</h3>
                      <p className="text-sm text-gray-600">Utilisation standard</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Création d'apps
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Administration
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Système</CardTitle>
              <CardDescription>
                Paramètres et configuration de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Limites Système</h3>
                    <div>
                      <Label htmlFor="max-users">Utilisateurs maximum</Label>
                      <Input id="max-users" type="number" defaultValue="10000" />
                    </div>
                    <div>
                      <Label htmlFor="max-storage">Stockage maximum (GB)</Label>
                      <Input id="max-storage" type="number" defaultValue="1000" />
                    </div>
                    <div>
                      <Label htmlFor="max-apps">Applications maximum par utilisateur</Label>
                      <Input id="max-apps" type="number" defaultValue="100" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Sécurité</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Authentification 2FA</span>
                        <Button variant="outline" size="sm">Activer</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Limite de tentatives de connexion</span>
                        <Input type="number" defaultValue="5" className="w-20" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Expiration de session (heures)</span>
                        <Input type="number" defaultValue="24" className="w-20" />
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
