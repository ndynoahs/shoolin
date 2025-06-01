import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Eye, LogOut, Mail, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    initials?: string;
  };
}

const ContentHeader: React.FC<HeaderProps> = ({ 
  title, 
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    initials: "JD"
  }
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        triggerRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`); // Replace with actual handlers
    setIsDropdownOpen(false);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderAvatar = (isLarge = false) => {
    const sizeClasses = isLarge ? "w-12 h-12" : "w-10 h-10 sm:w-10 sm:h-10";
    const avatarClasses = `${sizeClasses} rounded-full object-cover border-2 border-gray-200`;
    const fallbackClasses = `${sizeClasses} bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm`;

    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className={avatarClasses}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = fallbackClasses;
              fallback.textContent = getUserInitials(user.name);
              parent.appendChild(fallback);
            }
          }}
        />
      );
    }

    return (
      <div className={fallbackClasses}>
        {user.initials || getUserInitials(user.name)}
      </div>
    );
  };

  return (
<>
  {/* Fixed Header */}
  {/* <header className="pt-6 md:pt-0 md:fixed top-[30px]  md:top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm rounded-xl"> */}
  <header className=" md:top-0 left-0 right-0 z-40 mt-10 md:mt-0 bg-white border-b border-gray-200 shadow-sm ">
    <div className="px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center  max-w-full">
      
      {/* Page Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{title}</h1>

      {/* Profile Section */}
      <div className="relative">
        <div
          ref={triggerRef}
          className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
          onClick={handleDropdownToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleDropdownToggle();
            }
          }}
        >
          {/* Avatar with Status */}
          <div className="relative">
            {renderAvatar()}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          </div>

          {/* Chevron */}
          {/* <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-200 ${isDropdownOpen ? 'rotate-180' : ''} hidden sm:block`} /> */}
        </div>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 origin-top-right ${
            isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              {renderAvatar(true)}
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" />
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <div
              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
              onClick={() => handleMenuItemClick('view-profile')}
            >
              <Eye className="w-4 h-4 mr-3 text-gray-400" />
              <span className="font-medium">View Profile</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-1" />

            <div
              className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150"
              onClick={() => handleMenuItemClick('logout')}
            >
              <LogOut className="w-4 h-4 mr-3 text-red-500" />
              <span className="font-medium">Sign Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  {/* Spacer to prevent content overlap */}
  <div className="h-5" />
</>

  );
};

export default ContentHeader;