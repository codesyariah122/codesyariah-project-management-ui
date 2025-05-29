
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="hidden md:block w-px h-6 bg-border"></div>
          <p className="hidden md:block text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, tasks..."
              className="pl-10 w-64"
            />
          </div>
          
          {/* Notifications */}
          <NotificationDropdown />
          
          {/* Profile */}
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full cursor-pointer hover:shadow-lg transition-shadow"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
