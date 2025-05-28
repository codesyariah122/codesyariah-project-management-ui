
import { useState } from 'react';
import { 
  Folder, 
  Users, 
  CalendarCheck,
  PencilLine
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import ProjectCard from '@/components/ProjectCard';
import TaskBoard from '@/components/TaskBoard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState('projects');

  const handleNewProject = () => {
    console.log('Creating new project...');
    alert('New Project feature will open project creation form. Feature coming soon!');
  };

  const handleViewAllProjects = () => {
    console.log('Viewing all projects...');
    alert('View All Projects will show complete project list. Feature coming soon!');
  };

  const handleAddTask = () => {
    console.log('Adding new task...');
    alert('Add Task feature will open task creation form. Feature coming soon!');
  };

  const handleNavigation = (section: string) => {
    console.log(`Navigation to section: ${section}`);
    setCurrentSection(section);
  };

  const statsData = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2.5%',
      changeType: 'increase' as const,
      icon: Folder,
      color: 'bg-primary'
    },
    {
      title: 'Team Members',
      value: '24',
      change: '+4.1%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'bg-secondary'
    },
    {
      title: 'Completed Tasks',
      value: '156',
      change: '+12.3%',
      changeType: 'increase' as const,
      icon: CalendarCheck,
      color: 'bg-accent'
    },
    {
      title: 'In Progress',
      value: '8',
      change: '-2.1%',
      changeType: 'decrease' as const,
      icon: PencilLine,
      color: 'bg-orange-500'
    }
  ];

  const projects = [
    {
      title: 'MindSparks Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'In Progress' as const,
      dueDate: 'Jan 30, 2024',
      teamMembers: 5,
      progress: 75,
      priority: 'High' as const
    },
    {
      title: 'Mobile App Development',
      description: 'React Native mobile application for iOS and Android platforms',
      status: 'In Progress' as const,
      dueDate: 'Feb 15, 2024',
      teamMembers: 3,
      progress: 45,
      priority: 'High' as const
    },
    {
      title: 'Brand Identity Update',
      description: 'Refresh brand guidelines, logo, and marketing materials',
      status: 'Completed' as const,
      dueDate: 'Jan 10, 2024',
      teamMembers: 4,
      progress: 100,
      priority: 'Medium' as const
    },
    {
      title: 'Data Analytics Platform',
      description: 'Build internal analytics dashboard for business intelligence',
      status: 'Planning' as const,
      dueDate: 'Mar 1, 2024',
      teamMembers: 6,
      progress: 15,
      priority: 'Low' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={handleNavigation}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8" id="projects">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to MindSparks Project Hub
                </h2>
                <p className="text-gray-600">
                  Manage your projects efficiently and spark innovation together
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                onClick={handleNewProject}
              >
                <PencilLine className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Recent Projects</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewAllProjects}
              >
                View All Projects
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>

          {/* Task Board Section */}
          <div className="mb-8" id="tasks">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Task Board</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddTask}
              >
                <PencilLine className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <div className="animate-fade-in">
              <TaskBoard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
