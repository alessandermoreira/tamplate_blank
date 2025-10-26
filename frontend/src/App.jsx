import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Bell, User, Truck, CheckSquare, Clock, AlertTriangle, Calendar, Eye, Plus, UserPlus, LogOut } from 'lucide-react';

import VehicleRegistration from './components/VehicleRegistration.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import UsersList from './components/UsersList.jsx';
import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import './App.css';
import { AuthProvider, useAuth, ProtectedRoute } from './contexts/AuthContext.jsx';
import ProductsList from './components/ProductsList.jsx';
import ProductRegistration from './components/ProductRegistration.jsx';
import SalonLoginScreen from './components/SalonLoginScreen.jsx';
import SalonLoginApp from './components/SalonServicesApp.jsx';
import SalonRegistrationApp from './components/SalonRegistrationApp.jsx';
import MarketplaceClientCompact from './components/MarketplaceClientCompact.jsx';

const DashboardApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAuth();
  const [userEdit, setUserEdit] = useState({});
  const [productEdit, setProductEdit] = useState({});
  

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const statsCards = [
    {
      title: 'Veículos',
      value: '42',
      subtitle: '5 novos este mês',
      icon: Truck,
      color: 'bg-blue-500'
    },
    {
      title: 'Checklists',
      value: '128',
      subtitle: '87 concluídos este mês',
      icon: CheckSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Pendentes',
      value: '8',
      subtitle: '3 próximos 7 dias',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Atrasados',
      value: '5',
      subtitle: 'Necessitam atenção',
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const checklistData = [
    {
      veiculo: 'Caminhão de Coleta',
      placa: 'ABC-1234',
      setor: 'Limpeza Urbana',
      ultimoChecklist: '15/06/2023',
      proximo: '15/07/2023',
      status: 'Pendente',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      veiculo: 'Van de Transporte',
      placa: 'DEF-5678',
      setor: 'Educação',
      ultimoChecklist: '01/06/2023',
      proximo: '01/07/2023',
      status: 'Atrasado',
      statusColor: 'bg-red-100 text-red-800'
    }
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentMonth = 'Julho 2023';

  // Função para renderizar o conteúdo da página atual
  // const ProductsList = React.lazy(() => import('./components/ProductsList.jsx'));
  const renderPageContent = () => {
    switch (currentPage) {
      case 'vehicle-registration':
          return <VehicleRegistration onNavigate={handleNavigation} />;
      case 'user-registration':
          return  <ProtectedRoute requiredRole="administrador">  
                    <UserRegistration onNavigate={handleNavigation} userEdit={userEdit}/>
                  </ProtectedRoute>;
      case 'users-list':
          return <UsersList onNavigate={handleNavigation} setUserEdit={setUserEdit} />;
      case 'products-list':
          return (
            <ProductsList onNavigate={handleNavigation} setProductEdit={setProductEdit} />
        );
      case 'product-registration':
          return (
            <ProductRegistration onNavigate={handleNavigation} productEdit={productEdit} />
        );

      case 'registrar':
          return <UserRegistration onNavigate={handleNavigation}   />;          

      default:
         return  renderDashboard();
    }
  };

  // Função para renderizar o dashboard
  const renderDashboard = () => (
    <>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-4">
                {/* Notificação */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </div>
                
                {/* Usuário logado */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.nome}</p>
                    <p className="text-xs text-gray-500">{user?.department}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'warning' ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checklists Pendentes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Checklists Pendentes</CardTitle>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Veículo</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Placa</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Setor</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Último Checklist</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Próximo</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-gray-600">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checklistData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-gray-600" />
                            {item.vehicle}
                          </td>
                          <td className="py-3 px-2">{item.plate}</td>
                          <td className="py-3 px-2">{item.sector}</td>
                          <td className="py-3 px-2">{item.lastChecklist}</td>
                          <td className="py-3 px-2">{item.nextChecklist}</td>
                          <td className="py-3 px-2">
                            <Badge 
                              variant={item.status === 'Pendente' ? 'secondary' : 'destructive'}
                              className={item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <Button 
                              size="sm" 
                              variant={item.status === 'Pendente' ? 'default' : 'destructive'}
                              className={item.status === 'Pendente' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                            >
                              {item.status === 'Pendente' ? 'Realizar' : 'Urgente'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendário */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Calendário de Manutenções
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">{currentMonth}</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {/* Espaços vazios para começar no dia correto */}
                  <div></div>
                  {calendarDays.slice(0, 15).map((day) => (
                    <div 
                      key={day} 
                      className={`py-2 hover:bg-gray-100 rounded cursor-pointer ${
                        day === 1 ? 'bg-blue-100 text-blue-800 font-semibold' : ''
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigation}
        />        
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-0">
          {renderPageContent()}
        </div>
      </div>
    </ToastProvider>
  );
};

// Componente principal da aplicação
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Componente que gerencia a renderização baseada na autenticação
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {

    return (
        <ToastProvider>
          <Login />
        </ToastProvider>
        ) ;
  }

  return (
    <ProtectedRoute>
      <DashboardApp />
    </ProtectedRoute>
  );
};

export default App;

