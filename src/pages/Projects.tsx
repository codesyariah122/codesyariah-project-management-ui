import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Filter, Search, Edit, Trash2, Calendar, Users } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import ProjectForm from '@/components/ProjectForm';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  dueDate: string;
  teamMembers: number;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
}

const Projects = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'MindSparks Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'In Progress',
      dueDate: 'Jan 30, 2024',
      teamMembers: 5,
      progress: 75,
      priority: 'High'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'React Native mobile application for iOS and Android platforms',
      status: 'In Progress',
      dueDate: 'Feb 15, 2024',
      teamMembers: 3,
      progress: 45,
      priority: 'High'
    },
    {
      id: 3,
      title: 'Brand Identity Update',
      description: 'Refresh brand guidelines, logo, and marketing materials',
      status: 'Completed',
      dueDate: 'Jan 10, 2024',
      teamMembers: 4,
      progress: 100,
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Data Analytics Platform',
      description: 'Build internal analytics dashboard for business intelligence',
      status: 'Planning',
      dueDate: 'Mar 1, 2024',
      teamMembers: 6,
      progress: 15,
      priority: 'Low'
    }
  ]);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (projectId: number) => {
    console.log('Navigating to project:', projectId);
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = (projectData: Omit<Project, 'id'>) => {
    console.log('Creating new project with data:', projectData);
    try {
      const newProject: Project = {
        ...projectData,
        id: Math.max(...projects.map(p => p.id), 0) + 1
      };
      
      console.log('New project created:', newProject);
      setProjects(prev => [...prev, newProject]);
      
      // Close dialog first
      setIsCreateDialogOpen(false);
      
      // Show success toast
      toast({
        title: "Success!",
        description: "New project has been created successfully."
      });
      
      console.log('Project creation completed successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again."
      });
    }
  };

  const handleUpdateProject = (projectData: Omit<Project, 'id'>) => {
    if (!editingProject) {
      console.log('No editing project found');
      return;
    }
    
    console.log('Updating project:', editingProject.id, 'with data:', projectData);
    try {
      setProjects(prev => 
        prev.map(project => 
          project.id === editingProject.id 
            ? { ...projectData, id: editingProject.id }
            : project
        )
      );
      
      // Close dialog and clear editing state
      setEditingProject(undefined);
      setIsEditDialogOpen(false);
      
      toast({
        title: "Success!",
        description: "Project has been updated successfully."
      });
      
      console.log('Project update completed successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project. Please try again."
      });
    }
  };

  const handleDeleteProject = (projectId: number) => {
    console.log('Deleting project:', projectId);
    try {
      setProjects(prev => prev.filter(project => project.id !== projectId));
      toast({
        title: "Success!",
        description: "Project has been deleted successfully."
      });
      console.log('Project deletion completed successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again."
      });
    }
  };

  const openCreateDialog = () => {
    console.log('Opening create project dialog');
    setEditingProject(undefined);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening edit dialog for project:', project.id);
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const closeCreateDialog = () => {
    console.log('Closing create dialog');
    setIsCreateDialogOpen(false);
  };

  const closeEditDialog = () => {
    console.log('Closing edit dialog');
    setIsEditDialogOpen(false);
    setEditingProject(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Projects</h2>
                <p className="text-gray-600">Manage and track all your projects</p>
              </div>
              <Button 
                onClick={openCreateDialog}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200"
                onClick={() => handleCardClick(project.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => openEditDialog(project, e)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{project.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{project.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamMembers}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search terms or create a new project</p>
            </div>
          )}

          {/* Create Project Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="max-w-md">
              <ProjectForm
                onSubmit={handleCreateProject}
                onCancel={closeCreateDialog}
              />
            </DialogContent>
          </Dialog>

          {/* Edit Project Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md">
              <ProjectForm
                project={editingProject}
                onSubmit={handleUpdateProject}
                onCancel={closeEditDialog}
              />
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Projects;
