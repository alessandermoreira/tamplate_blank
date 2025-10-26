import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import {
  Home,
  Package,
  UserPlus,
  Menu,
  X,
  ChevronLeft,
  Settings,
  LogOut,
  Users,
  LogIn,
  Scissors,
  Store,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = ({ currentPage, onNavigate, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, userName } = useAuth();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Visão geral do sistema'
    },
    {
      id: 'users-list',
      label: 'Clientes',
      icon: Users,
      description: 'Visualizar e gerenciar clientes'
    },
    {
      id: 'products-list',
      label: 'Sistemas',
      icon: Package,
      description: 'Visualizar nossos produtos'
    }
    // {
    //   id: 'salon-login',
    //   label: 'Login Salão',
    //   icon: LogIn,
    //   description: 'Acessar tela de login do salão'
    // },
    // {
    //   id: 'salon-app',
    //   label: 'Salão App',
    //   icon: Scissors,
    //   description: 'Acessar app do salão'
    // },
    // {
    //   id: 'salon-registration-app',
    //   label: 'Salão Registration App',
    //   icon: UserPlus,
    //   description: 'Acessar app do salão'
    // }  ,
    // {
    //   id: 'salon-marketplace-app',
    //   label: 'Salão Marketplace App',
    //   icon: Store,
    //   description: 'Acessar marketplace do salão'
    // }


  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
    // Fechar sidebar em mobile após navegação
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  const handleLogout = async () => {
    await logout();
  };  

  return (
    <>
      {/* Botão de toggle para mobile */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:shadow-none
          ${isCollapsed ? 'md:w-16' : 'md:w-64'}
          w-64
          ${className}
        `}
      >
        {/* Header do Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sistema</h2>
                <p className="text-xs text-gray-500">Manutenção</p>
              </div>
            </div>
          )}
          
          {/* Botão de colapsar (apenas desktop) */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex"
            onClick={toggleCollapse}
          >
            <ChevronLeft 
              className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`
                      w-full justify-start h-auto p-3
                      ${isActive 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                      ${isCollapsed ? 'px-3' : ''}
                    `}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.label}</span>
                        <span className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </span>
                      </div>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer do Sidebar */}
        <div className="border-t border-gray-200 p-4">
          {!isCollapsed && (
            <div className="mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">OM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                     {user?.setor}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className={`flex ${isCollapsed ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <Button
              variant="ghost"
              size="sm"
              className={`${isCollapsed ? 'w-full' : 'flex-1'} text-gray-600 hover:text-gray-900`}
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Configurações</span>}
            </Button>
            
            {/* <Button
              variant="ghost"
              size="sm"
              className={`${isCollapsed ? 'w-full' : 'flex-1'} text-gray-600 hover:text-gray-900`}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Sair</span>}
            </Button> */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">Sair</span>}              
            </Button>


          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

