
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Check if theme is already set in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true
  });

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const applyTheme = (themeValue: string) => {
      const root = document.documentElement;
      
      if (themeValue === 'dark') {
        root.classList.add('dark');
      } else if (themeValue === 'light') {
        root.classList.remove('dark');
      } else if (themeValue === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      
      // Save theme preference
      localStorage.setItem('theme', themeValue);
    };

    applyTheme(theme);
    
    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    console.log(`Theme changed to: ${value}`);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
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
                <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
                <p className="text-muted-foreground">Manage your account and application preferences</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input defaultValue="Admin" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input defaultValue="User" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input type="email" defaultValue="admin@mindsparks.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive push notifications on mobile</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Desktop Notifications</h4>
                      <p className="text-sm text-muted-foreground">Show notifications on desktop</p>
                    </div>
                    <Switch
                      checked={notifications.desktop}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, desktop: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current Password
                    </label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      New Password
                    </label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button variant="outline">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Theme</h4>
                    <RadioGroup value={theme} onValueChange={handleThemeChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="text-sm text-foreground">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="text-sm text-foreground">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="text-sm text-foreground">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Import Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
