
import { search, message-square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="hidden md:block w-px h-6 bg-gray-300"></div>
          <p className="hidden md:block text-gray-600">Welcome back! Here's what's happening with your projects.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects, tasks..."
              className="pl-10 w-64 border-gray-300 focus:border-primary"
            />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100">
            <message-square className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          {/* Profile */}
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full cursor-pointer hover:shadow-lg transition-shadow"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
