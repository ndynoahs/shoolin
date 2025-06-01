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

// Design System - Color Tokens
const colors = {
  // Primary Brand Colors
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  // Neutral Colors
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Semantic Colors
  white: '#ffffff',
  black: '#000000',
};

// Component Style Classes
const styles = {
  // Container Styles
  sidebar: {
    base: `fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 border-r flex flex-col justify-between transition-transform duration-300 transform`,
    border: `border-${colors.neutral[200]}`,
  },
  
  // Navigation Styles
  nav: {
    container: 'px-4 space-y-1',
    
    // Menu Item Styles
    item: {
      base: 'flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 group',
      default: `text-${colors.neutral[600]} hover:bg-${colors.neutral[100]} hover:text-${colors.neutral[700]}`,
      active: `bg-${colors.primary[600]} text-white shadow-sm`,
      icon: 'w-5 h-5 mr-3 transition-colors duration-200',
      text: 'text-xs font-medium',
    },
  },
  
  // Brand/Logo Section
  brand: {
    container: 'p-6',
    icon: `w-10 h-10 bg-${colors.primary[600]} rounded-xl flex items-center justify-center shadow-sm`,
    iconInner: 'w-6 h-6 text-white',
  },
  
  // Upgrade Card Styles
  upgrade: {
    container: `p-4 bg-gradient-to-br from-${colors.primary[600]} to-${colors.primary[700]} rounded-xl text-white shadow-lg`,
    title: 'text-sm font-semibold mb-1',
    subtitle: `text-xs text-${colors.primary[200]} mb-4 leading-relaxed`,
    button: `w-full bg-white text-${colors.primary[600]} py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-${colors.neutral[50]} transition-colors duration-200 shadow-sm`,
  },
  
  // Mobile Styles
  mobile: {
    toggle: `md:hidden fixed top-4 left-4 z-50 bg-white text-${colors.primary[600]} p-3 rounded-lg shadow-lg hover:bg-${colors.primary[700]} transition-colors duration-200`,
    overlay: 'fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm',
    closeButton: `md:hidden flex justify-end p-4`,
    closeIcon: `w-6 h-6 text-${colors.neutral[700]} hover:text-${colors.neutral[900]} transition-colors duration-200`,
    menuIcon: `w-6 h-6 text-black`
  },
  
  // Bottom Section
  bottom: {
    container: 'space-y-6 p-4',
    section: 'space-y-1',
  },
};

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
    icon: GraduationCap, 
    label: "Classes", 
    path: "/classes",
    page: "../pages/Classes",
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
    const baseClasses = styles.nav.item.base;
    const stateClasses = isActiveItem(itemPath) 
      ? `bg-purple-600 text-white shadow-sm hover:bg-purple-700` 
      : `text-gray-600 hover:bg-gray-50 hover:text-gray-700`;
    
    return `${baseClasses} ${stateClasses}`;
  };

  const getIconClasses = (itemPath: string) => {
    const baseClasses = styles.nav.item.icon;
    const stateClasses = isActiveItem(itemPath) 
      ? 'text-white' 
      : 'text-gray-500 group-hover:text-gray-600';
    
    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={styles.mobile.toggle}
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className={styles.mobile.menuIcon}/>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className={styles.mobile.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`${styles.sidebar.base} border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <div className={styles.mobile.closeButton}>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className={styles.mobile.closeIcon} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="overflow-y-auto flex-1">
          {/* Brand/Logo Section */}
          <div className={styles.brand.container}>
            <div className="bg-purple-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
              <GraduationCap className={styles.brand.iconInner} />
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.nav.container}>
            {sidebarItems.map((item, index) => (
              <PrefetchLink
                to={item.path}
                preload={() => import(`${item.page}`)}
                key={index}
                className="block"
              >
                <div className={getMenuItemClasses(item.path)}>
                  <item.icon className={getIconClasses(item.path)} />
                  <span className={styles.nav.item.text}>{item.label}</span>
                </div>
              </PrefetchLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom.container}>
          {/* Upgrade Card */}
          <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-white shadow-lg">
            <div className={styles.upgrade.title}>Current Plan: Free</div>
            <div className="text-xs text-purple-200 mb-4 leading-relaxed">
              Upgrade for more features and enhanced experience
            </div>
            <button className="w-full bg-white text-purple-600 py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              ⬆ Upgrade
            </button>
          </div>

          {/* Support & Settings */}
          <div className={styles.bottom.section}>
            <div className="flex items-center px-3 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-700 cursor-pointer transition-all duration-200 group">
              <HelpCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-600 transition-colors duration-200" />
              <span className={styles.nav.item.text}>Support</span>
            </div>
            
            <PrefetchLink 
              to="/settings" 
              preload={() => import("../pages/Settings")}
              className="block"
            >
              <div className={getMenuItemClasses("/settings")}>
                <Settings className={getIconClasses("/settings")} />
                <span className={styles.nav.item.text}>Settings</span>
              </div>
            </PrefetchLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;