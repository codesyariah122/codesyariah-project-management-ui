
import { useState } from 'react';
import { Users, Mail, Phone, MoreVertical, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Team = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      email: 'sarah@mindsparks.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612d5c1?w=150&h=150&fit=crop&crop=face',
      status: 'Active',
      projects: 5
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Frontend Developer',
      email: 'mike@mindsparks.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'Active',
      projects: 3
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UI/UX Designer',
      email: 'emily@mindsparks.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'Active',
      projects: 4
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Backend Developer',
      email: 'david@mindsparks.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'Away',
      projects: 2
    }
  ];

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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h2>
                <p className="text-gray-600">Manage your team members and their roles</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto"
                    />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${
                      member.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium">{member.projects} Projects</span>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Team;
