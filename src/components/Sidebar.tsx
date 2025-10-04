import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { menuConfig } from '@/config/menuConfig';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  if (!user) return null;

  // Helper function to get the correct menu config key
  const getMenuKey = (): keyof typeof menuConfig => {
    if (user.role === 'vendor' && user.profile?.vendorCategory) {
      return `${user.profile.vendorCategory}-vendor` as keyof typeof menuConfig;
    }
    return user.role as keyof typeof menuConfig;
  };

  const menuItems = menuConfig[getMenuKey()] || [];

  const handleLogout = () => {
    logout();
  };

  const toggleAccordion = (itemPath: string) => {
    if (isCollapsed) return;

    setExpandedMenus(prev =>
      prev.includes(itemPath)
        ? prev.filter(path => path !== itemPath)
        : [itemPath]
    );
  };

  const handleIconClick = (itemPath: string, hasSubmenu: boolean) => {
    if (isCollapsed && hasSubmenu) {
      setActiveSubmenu(activeSubmenu === itemPath ? null : itemPath);
    }
  };

  const userProfileItems = [
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      submenu: [
        { label: 'Account Settings', icon: SettingsIcon, path: '/settings/account-settings' },
        { label: 'Logout', icon: LogOut, path: '/logout', onClick: handleLogout }
      ]
    }
  ];

  return (
    <>
      <aside className={`${
        isCollapsed ? 'w-16' : 'w-80'
      } bg-primary border-r border-sidebar-border flex flex-col h-screen transition-all duration-300 relative z-40`}>
        {/* Header with Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className={`${isCollapsed ? 'justify-center position-relative' : 'justify-between'} flex items-center`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-md flex items-center justify-center font-bold">
                <img src='/logo-main-no-bg.svg' alt="Logo" className="w-full h-full object-contain" />
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-primary-foreground">Deligence.ai</span>
              )}
            </div>
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setActiveSubmenu(null);
              }}
              className={`p-2 text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded transition-colors ${isCollapsed ? 'justify-center absolute p-2 rounded transition-all' : 'justify-between'}`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-2 relative">
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isExpanded = expandedMenus.includes(item.path);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuActive = activeSubmenu === item.path;

              return (
                <div key={item.path} className="relative">
                  <div
                    onClick={(e) => {
                      if (hasSubmenu && !isCollapsed) {
                        e.preventDefault();
                        toggleAccordion(item.path);
                      } else if (hasSubmenu && isCollapsed) {
                        e.preventDefault();
                        handleIconClick(item.path, hasSubmenu);
                      }
                    }}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'space-x-3 px-3 py-3'
                    } rounded-md transition-colors relative ${
                      isActive || isSubmenuActive
                        ? 'bg-primary-foreground text-primary'
                        : 'text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                    } ${hasSubmenu ? 'cursor-pointer' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    {hasSubmenu && !isCollapsed ? (
                      <>
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium flex-1">{item.label}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </>
                    ) : hasSubmenu && isCollapsed ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <Link to={item.path} className={`flex items-center w-full ${isCollapsed ? 'justify-center' : ''}`}>
                        <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                        {!isCollapsed && (
                          <span className="font-medium ml-3">{item.label}</span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Submenu for expanded state */}
                  {!isCollapsed && hasSubmenu && isExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu!.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.path}
                          className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                            location.pathname === subItem.path
                              ? 'bg-accent text-accent-foreground'
                              : 'text-primary-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Profile Section */}
        <div className="p-2 border-t border-sidebar-border">
          {userProfileItems.map((item) => {
            const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.path);
            const isSubmenuActive = activeSubmenu === item.path;
            
            return (
              <div key={item.path} className="relative">
                <div
                  className={`flex items-center ${
                    isCollapsed ? 'justify-center h-10 w-10 mx-auto' : 'space-x-3 px-3 py-3'
                  } rounded-md text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors cursor-pointer ${
                    isSubmenuActive ? 'bg-primary-foreground text-primary' : ''
                  }`}
                  title={isCollapsed ? item.label : ''}
                  onClick={(e) => {
                    if (hasSubmenu && !isCollapsed) {
                      e.preventDefault();
                      toggleAccordion(item.path);
                    } else if (hasSubmenu && isCollapsed) {
                      e.preventDefault();
                      handleIconClick(item.path, hasSubmenu);
                    }
                  }}
                >
                  {hasSubmenu && !isCollapsed ? (
                    <>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{user.name}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </>
                  ) : hasSubmenu && isCollapsed ? (
                    <Icon className="w-6 h-6" />
                  ) : (
                    <Link to={item.path} className={`flex items-center w-full ${isCollapsed ? 'justify-center' : ''}`}>
                      <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
                      {!isCollapsed && (
                        <span className="font-medium ml-3">{item.label}</span>
                      )}
                    </Link>
                  )}
                </div>

                {/* Submenu for expanded state */}
                {!isCollapsed && hasSubmenu && isExpanded && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu!.map((subItem, index) => (
                      subItem.onClick ? (
                        <button
                          key={index}
                          onClick={subItem.onClick}
                          className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors w-full text-left ${
                            location.pathname === subItem.path
                              ? 'bg-accent text-accent-foreground'
                              : 'text-primary-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </button>
                      ) : (
                        <Link
                          key={index}
                          to={subItem.path}
                          className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                            location.pathname === subItem.path
                              ? 'bg-accent text-accent-foreground'
                              : 'text-primary-foreground hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right-side submenu overlay for collapsed state */}
      {isCollapsed && activeSubmenu && (
        <>
          {/* Backdrop to close submenu */}
          <div 
            className="fixed inset-0 z-30 bg-transparent" 
            onClick={() => setActiveSubmenu(null)}
          />
          
          {/* Submenu panel - positioned absolutely to avoid overflow */}
          <div className="fixed left-16 top-0 bottom-0 w-72 bg-background border border-border shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="text-lg font-semibold text-foreground">
                {menuItems.find(item => item.path === activeSubmenu)?.label ||
                 userProfileItems.find(item => item.path === activeSubmenu)?.label}
              </h3>
            </div>
            <div className="p-4">
              <nav className="space-y-1">
                {/* Regular menu items submenu */}
                {menuItems
                  .find(item => item.path === activeSubmenu)
                  ?.submenu?.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.path}
                      onClick={() => setActiveSubmenu(null)}
                      className={`flex items-center space-x-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 ${
                        location.pathname === subItem.path
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted hover:translate-x-1'
                      }`}
                    >
                      <subItem.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                
                {/* Profile submenu for user profile items */}
                {userProfileItems
                  .find(item => item.path === activeSubmenu)
                  ?.submenu?.map((subItem, index) => (
                    subItem.onClick ? (
                      <button
                        key={index}
                        onClick={() => {
                          subItem.onClick!();
                          setActiveSubmenu(null);
                        }}
                        className="flex items-center space-x-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 w-full text-left text-foreground hover:bg-muted hover:translate-x-1"
                      >
                        <subItem.icon className="w-4 h-4 flex-shrink-0" />
                        <span>{subItem.label}</span>
                      </button>
                    ) : (
                      <Link
                        key={index}
                        to={subItem.path}
                        onClick={() => setActiveSubmenu(null)}
                        className={`flex items-center space-x-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 ${
                          location.pathname === subItem.path
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted hover:translate-x-1'
                        }`}
                      >
                        <subItem.icon className="w-4 h-4 flex-shrink-0" />
                        <span>{subItem.label}</span>
                      </Link>
                    )
                  ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;