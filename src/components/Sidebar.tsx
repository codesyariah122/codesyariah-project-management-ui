import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Folder,
  Users,
  Calendar,
  Settings,
  Search,
  PencilLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Dashboard", icon: Folder, path: "/" },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  { name: "Tasks", icon: PencilLine, path: "/tasks" },
  { name: "Search", icon: Search, path: "/search" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (item: (typeof navigationItems)[0]) => {
    console.log(`Navigating to: ${item.name}`);
    navigate(item.path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-lg text-gray-800">
                CodeSyariah
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1 hover:bg-gray-100"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.name}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    active
                      ? "bg-primary text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  } ${isCollapsed ? "px-2" : "px-4"}`}
                  onClick={() => handleNavigation(item)}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@codesyariah.id</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
