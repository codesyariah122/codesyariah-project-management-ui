
import { useState } from 'react';
import { Search as SearchIcon, Filter, FileText, Users, Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Search = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = [
    {
      id: 1,
      type: 'project',
      title: 'MindSparks Website Redesign',
      description: 'Complete overhaul of the company website with modern design',
      category: 'Projects',
      icon: FileText
    },
    {
      id: 2,
      type: 'team',
      title: 'Sarah Johnson',
      description: 'Project Manager - sarah@mindsparks.com',
      category: 'Team',
      icon: Users
    },
    {
      id: 3,
      type: 'task',
      title: 'Design System Documentation',
      description: 'Create comprehensive documentation for the design system',
      category: 'Tasks',
      icon: FileText
    },
    {
      id: 4,
      type: 'event',
      title: 'Client Presentation',
      description: 'Present project progress to client - Jan 29, 10:00 AM',
      category: 'Calendar',
      icon: Calendar
    }
  ];

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Search</h2>
                <p className="text-gray-600">Find projects, team members, tasks, and events</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="relative flex-1 max-w-2xl">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search across all content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-lg"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {searchTerm ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({filteredResults.length})
              </h3>
              
              {filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map(result => {
                    const Icon = result.icon;
                    return (
                      <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-2 rounded-lg ${
                              result.type === 'project' ? 'bg-blue-100 text-blue-600' :
                              result.type === 'team' ? 'bg-green-100 text-green-600' :
                              result.type === 'task' ? 'bg-purple-100 text-purple-600' :
                              'bg-orange-100 text-orange-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{result.title}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-1">{result.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Start searching</h3>
              <p className="text-gray-600">Enter a search term to find projects, team members, tasks, and events</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;
