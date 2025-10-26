import React, { useState } from 'react';
import { ArrowRight, User, Shield, Building, Mail, Phone, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert.jsx';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';


const Login = ({ onLogin }) => {

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const { login } = useAuth();  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(formData.email, formData.senha);
      
      if (!result.success) {
        setError(result.message || 'Erro ao fazer login');
      }
      // Se o login for bem-sucedido, o AuthContext já gerencia o redirecionamento
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro de login:', err);
    } finally {
      setLoading(false);
    }
    
    // navigate("/home");

    // try {
    //   const response = await fetch('http://localhost:3000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    //   });

    //   const data = await response.json();

    //   if (data.data.token) {
    //     // Salvar dados do usuário no localStorage
    //     localStorage.setItem('authToken', data.data.token);
    //     localStorage.setItem('userData', JSON.stringify(data.data.user));
        
    //     onLogin(data.data.token, data.data.user);
    //   } else {
    //     setError(data.message || 'Erro ao fazer login');
    //   }
    // } catch (err) {
    //   setError('Erro de conexão com o servidor');
    //   console.error('Erro de login:', err);
    // } finally {
    //   setLoading(false);
    // }  
    
    
  };
    
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-gray-900"> </h1>
            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div> */}
              <div className="flex items-center space-x-2">
                <img
                  src="/favicon.ico"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <h1 className="text-lg font-semibold text-gray-700">Marcaí Digital</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
        
          {/* Informações Pessoais */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Login
              </CardTitle>              
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type={"password"}
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                />
              </div>                           
            </CardContent>
            
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">              
                {/* Botões de Ação */}
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <ArrowRight className="h-4 w-4 mr-2" />
                            Entrar
                        </Button>
                    </div>
                </div>  
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}                 
            </CardContent>           
          </Card>

        </form>
      </main>

    </div> 
  );
}
export default Login;