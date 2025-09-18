import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Settings, 
  Crown, 
  UserPlus, 
  Mail, 
  Shield, 
  Calendar,
  Activity,
  TrendingUp,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActive: string;
  projects: number;
  performance: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
  plan: 'free' | 'pro' | 'enterprise';
  projects: number;
  storage: number;
  maxMembers: number;
}

interface TeamProject {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  members: string[];
  lastModified: string;
  progress: number;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Équipe Principale',
    description: 'Équipe de développement principal',
    createdAt: '2024-01-15',
    plan: 'pro',
    projects: 12,
    storage: 2048,
    maxMembers: 25,
    members: [
      {
        id: '1',
        name: 'Alex Developer',
        email: 'alex@example.com',
        avatar: '/api/placeholder/32/32',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-01-15',
        lastActive: '2024-01-20',
        projects: 8,
        performance: 95
      },
      {
        id: '2',
        name: 'Sarah Designer',
        email: 'sarah@example.com',
        avatar: '/api/placeholder/32/32',
        role: 'admin',
        status: 'active',
        joinedAt: '2024-01-20',
        lastActive: '2024-01-19',
        projects: 6,
        performance: 88
      },
      {
        id: '3',
        name: 'Mike Developer',
        email: 'mike@example.com',
        avatar: '/api/placeholder/32/32',
        role: 'developer',
        status: 'active',
        joinedAt: '2024-01-25',
        lastActive: '2024-01-20',
        projects: 4,
        performance: 92
      }
    ]
  }
];

const mockProjects: TeamProject[] = [
  {
    id: '1',
    name: 'Application E-commerce',
    description: 'Plateforme e-commerce moderne',
    status: 'active',
    members: ['1', '2'],
    lastModified: '2024-01-20',
    progress: 75
  },
  {
    id: '2',
    name: 'Dashboard Analytics',
    description: 'Tableau de bord analytique',
    status: 'active',
    members: ['1', '3'],
    lastModified: '2024-01-19',
    progress: 60
  }
];

export function TeamManager() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [projects, setProjects] = useState<TeamProject[]>(mockProjects);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(teams[0]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'developer': return 'bg-green-100 text-green-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipes</h1>
          <p className="text-gray-600 mt-2">Gérez vos équipes, membres et projets collaboratifs</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showCreateTeamModal} onOpenChange={setShowCreateTeamModal}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Équipe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une Nouvelle Équipe</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle équipe pour organiser vos projets et collaborateurs.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team-name">Nom de l'équipe</Label>
                  <Input id="team-name" placeholder="Nom de l'équipe" />
                </div>
                <div>
                  <Label htmlFor="team-description">Description</Label>
                  <Textarea id="team-description" placeholder="Description de l'équipe" />
                </div>
                <div>
                  <Label htmlFor="team-plan">Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Gratuit (5 membres)</SelectItem>
                      <SelectItem value="pro">Pro (25 membres)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (Illimité)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateTeamModal(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setShowCreateTeamModal(false)}>
                    Créer l'Équipe
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Inviter un Membre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Inviter un Membre</DialogTitle>
                <DialogDescription>
                  Invitez un nouveau membre à rejoindre votre équipe.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="invite-email">Email</Label>
                  <Input id="invite-email" type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <Label htmlFor="invite-role">Rôle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setShowInviteModal(false)}>
                    Envoyer l'Invitation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipes Actives</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membres Totaux</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teams.reduce((acc, team) => acc + team.members.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +3 cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets Collaboratifs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Moyenne</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% cette semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Details */}
      {selectedTeam && (
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Team Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedTeam.name}
                      <Badge className={getPlanColor(selectedTeam.plan)}>
                        {selectedTeam.plan.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedTeam.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Membres</p>
                    <p className="text-muted-foreground">
                      {selectedTeam.members.length} / {selectedTeam.maxMembers}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Projets</p>
                    <p className="text-muted-foreground">{selectedTeam.projects}</p>
                  </div>
                  <div>
                    <p className="font-medium">Stockage</p>
                    <p className="text-muted-foreground">{selectedTeam.storage} MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Membres de l'Équipe</CardTitle>
                <CardDescription>
                  Gérez les membres et leurs permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getRoleColor(member.role)}>
                              {member.role}
                            </Badge>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            {member.projects} projets
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {member.performance}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {member.lastActive}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Settings className="w-4 h-4 mr-2" />
                          Gérer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projets Collaboratifs</CardTitle>
                <CardDescription>
                  Gérez les projets de votre équipe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {project.name}
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progression</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.members.length} membres
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.lastModified}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Voir</Button>
                            <Button size="sm" variant="outline">Modifier</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de l'Équipe</CardTitle>
                <CardDescription>
                  Configurez les paramètres et permissions de votre équipe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="team-name-settings">Nom de l'équipe</Label>
                    <Input id="team-name-settings" defaultValue={selectedTeam.name} />
                  </div>
                  <div>
                    <Label htmlFor="team-description-settings">Description</Label>
                    <Textarea id="team-description-settings" defaultValue={selectedTeam.description} />
                  </div>
                  <div>
                    <Label htmlFor="team-plan-settings">Plan</Label>
                    <Select defaultValue={selectedTeam.plan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Gratuit</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Sauvegarder les Modifications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
