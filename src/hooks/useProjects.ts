import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthModal';

export interface Project {
  id: string;
  name: string;
  description: string;
  components: any[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  thumbnail?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Charger les projets depuis localStorage
  useEffect(() => {
    if (user?.id) {
      loadProjects();
    }
  }, [user?.id]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const storedProjects = localStorage.getItem(`rork_projects_${user?.id}`);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (name: string, description: string = '') => {
    if (!user?.id) return null;

    const newProject: Project = {
      id: `project_${Date.now()}`,
      name,
      description,
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    
    // Sauvegarder dans localStorage
    localStorage.setItem(`rork_projects_${user.id}`, JSON.stringify(updatedProjects));
    
    return newProject;
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    if (!user?.id) return null;

    const updatedProjects = projects.map(project => 
      project.id === projectId 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );
    
    setProjects(updatedProjects);
    
    // Sauvegarder dans localStorage
    localStorage.setItem(`rork_projects_${user.id}`, JSON.stringify(updatedProjects));
    
    // Mettre à jour le projet actuel si c'est celui-ci
    if (currentProject?.id === projectId) {
      setCurrentProject({ ...currentProject, ...updates, updatedAt: new Date().toISOString() });
    }
    
    return updatedProjects.find(p => p.id === projectId);
  };

  const deleteProject = async (projectId: string) => {
    if (!user?.id) return false;

    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    
    // Sauvegarder dans localStorage
    localStorage.setItem(`rork_projects_${user.id}`, JSON.stringify(updatedProjects));
    
    // Nettoyer le projet actuel si c'est celui-ci
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
    
    return true;
  };

  const loadProject = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      return project;
    }
    return null;
  };

  const saveProjectComponents = async (projectId: string, components: any[]) => {
    return updateProject(projectId, { components });
  };

  return {
    projects,
    currentProject,
    isLoading,
    createProject,
    updateProject,
    deleteProject,
    loadProject,
    saveProjectComponents,
    setCurrentProject,
  };
}
