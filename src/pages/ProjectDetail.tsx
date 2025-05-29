
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Edit, Trash2, Target } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock projects data - in real app this would come from API
  const mockProjects: Project[] = [
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
  ];

  useEffect(() => {
    const projectId = parseInt(id || '');
    const foundProject = mockProjects.find(p => p.id === projectId);
    setProject(foundProject || null);
  }, [id]);

  const handleEditProject = (projectData: Omit<Project, 'id'>) => {
    if (!project) return;
    
    const updatedProject = { ...projectData, id: project.id };
    setProject(updatedProject);
    setIsEditDialogOpen(false);
    toast({
      title: "Project Updated",
      description: "Project has been updated successfully."
    });
  };

  const handleDeleteProject = () => {
    navigate('/projects');
    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully."
    });
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

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project not found</h3>
              <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/projects')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/projects')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex space-x-2 mb-4">
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                    {project.priority} Priority
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <Button 
                    onClick={() => setIsEditDialogOpen(true)}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Project
                  </Button>
                  <DialogContent className="max-w-md">
                    <ProjectForm
                      project={project}
                      onSubmit={handleEditProject}
                      onCancel={() => setIsEditDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
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
                        onClick={handleDeleteProject}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{project.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Overall Progress</span>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {project.progress >= 100 ? 'Project completed!' : 
                     project.progress >= 75 ? 'Almost there! Great progress.' :
                     project.progress >= 50 ? 'Good progress, keep it up!' :
                     project.progress >= 25 ? 'Getting started, stay focused.' :
                     'Project in early stages.'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Due Date</p>
                      <p className="text-sm text-gray-600">{project.dueDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Team Members</p>
                      <p className="text-sm text-gray-600">{project.teamMembers} members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {project.status === 'Completed' ? 'This project has been completed successfully.' :
                       project.status === 'In Progress' ? 'This project is currently being worked on.' :
                       'This project is in the planning phase.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;
