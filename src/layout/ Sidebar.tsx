import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  History,
  GraduationCap,
  MessageCircle,
  ClipboardList,
  HelpCircle,
  Settings,
  X,
  Mail,
  Trash2,
  Edit3,
  Menu,
} from "lucide-react";
import { PrefetchLink } from "../utils/preload";

// Navigation Items Configuration
const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
    page: "../pages/Dashboard",
  },
  { 
    icon: Wrench, 
    label: "AI Tools", 
    path: "/ai-tools",
    page: "../pages/AITools",
  },
  { 
    icon: History, 
    label: "Work History", 
    path: "/history",
    page: "../pages/WorkHistory",
  },
  { 
    icon: GraduationCap, 
    label: "Launch a Class", 
    path: "/launch-class",
    page: "../pages/LaunchClass",
  },
  { 
    icon: MessageCircle, 
    label: "AI Chat", 
    path: "/ai-chat",
    page: "../pages/AIChat",
  },
  { 
    icon: ClipboardList, 
    label: "Assignment", 
    path: "/assignment",
    page: "../pages/Assignment",
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches menu item
  const isActiveItem = (itemPath: string) => {
    return location.pathname === itemPath;
  };

  // Get dynamic classes for menu items
  const getMenuItemClasses = (itemPath: string) => {
    const baseClasses = "flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 group";
    const stateClasses = isActiveItem(itemPath) 
      ? "bg-purple-600 text-white shadow-sm hover:bg-purple-700" 
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-700";
    
    return `${baseClasses} ${stateClasses}`;
  };

  const getIconClasses = (itemPath: string) => {
    const baseClasses = "w-5 h-5 mr-3 transition-colors duration-200";
    const stateClasses = isActiveItem(itemPath) 
      ? "text-white" 
      : "text-gray-500 group-hover:text-gray-600";
    
    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-purple-600 p-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ height: '100vh', minHeight: '100vh' }}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors duration-200" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="overflow-y-scroll flex-1">
          {/* Brand/Logo Section */}
          <div className="p-6">
            <div className="bg-purple-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="px-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <PrefetchLink
                to={item.path}
                preload={() => import(`${item.page}`)}
                key={index}
                className="block"
              >
                <div className={getMenuItemClasses(item.path)}>
                  <item.icon className={getIconClasses(item.path)} />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </PrefetchLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-6 p-4">
          {/* Upgrade Card */}
          <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-white shadow-lg">
            <div className="text-sm font-semibold mb-1">Current Plan: Free</div>
            <div className="text-xs text-purple-200 mb-4 leading-relaxed">
              Upgrade for more features and enhanced experience
            </div>
            <button className="w-full bg-white text-purple-600 py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              ⬆ Upgrade
            </button>
          </div>

          {/* Support & Settings */}
          <div className="space-y-1">
            <div className="flex items-center px-3 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-700 cursor-pointer transition-all duration-200 group">
              <HelpCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-600 transition-colors duration-200" />
              <span className="text-xs font-medium">Support</span>
            </div>
            
            <PrefetchLink 
              to="/settings" 
              preload={() => import("../pages/Settings")}
              className="block"
            >
              <div className={getMenuItemClasses("/settings")}>
                <Settings className={getIconClasses("/settings")} />
                <span className="text-xs font-medium">Settings</span>
              </div>
            </PrefetchLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;