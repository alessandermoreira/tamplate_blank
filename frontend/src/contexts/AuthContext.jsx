import React, { createContext, useContext, useState, useEffect } from 'react';

const VITE_URL_SERVER = import.meta.env.VITE_URL_SERVER;

// Criar o contexto de autenticação
const AuthContext = createContext(undefined);

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há dados de autenticação salvos no localStorage
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          // Verificar se o token ainda é válido
          const response = await fetch(`${VITE_URL_SERVER}/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
          });

          const data = await response.json();

          if (data.success) {
            // Token válido, restaurar sessão
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpar dados
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Em caso de erro, limpar dados por segurança
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Função de login
  const login = async (email, senha) => {
    try {
      const response = await fetch(`${VITE_URL_SERVER}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (data.token) {
        // Salvar dados no localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Atualizar estado
        setUser(data.user);
        setIsAuthenticated(true);
        
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: 'Erro de conexão com o servidor' };
    }
  };

  // Função de logout
  const logout = async () => {
      // Limpar dados locais do resultado
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
  };

  // Função para atualizar dados do usuário
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Função para verificar se o usuário tem uma determinada permissão
  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'administrador': 3,
      'supervisor': 2,
      'operator': 1
    };
    
    const userLevel = roleHierarchy[user.nivelacesso] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };

  // Função para obter token de autenticação
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Valor do contexto
  const contextValue = {
    // Estado
    user,
    loading,
    isAuthenticated,
    
    // Funções
    login,
    logout,
    updateUser,
    hasPermission,
    getToken,
    
    // Dados derivados
    userName: user?.name || '',
    userEmail: user?.email || '',
    userRole: user?.role || '',
    userDepartment: user?.department || ''
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente para proteger rotas que requerem autenticação
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, hasPermission } = useAuth();

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
    return null; // O App.jsx irá mostrar a tela de login
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthContext;

