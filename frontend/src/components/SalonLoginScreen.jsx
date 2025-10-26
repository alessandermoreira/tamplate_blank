import React, { useState, useEffect } from 'react';
import { Scissors, Mail, Lock, Eye, EyeOff, Fingerprint, Loader, AlertCircle, CheckCircle, User, Phone, Building2, ArrowLeft } from 'lucide-react';

export default function SalonLoginApp() {
  const [screen, setScreen] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [biometryAvailable, setBiometryAvailable] = useState(true);
  const [showBiometryPrompt, setShowBiometryPrompt] = useState(false);
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    nome: '', email: '', telefone: '', nomeSalao: '', password: '', confirmPassword: ''
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setBiometryAvailable(true);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleLogin = () => {
    setError('');
    setSuccess('');
    
    if (!loginForm.email || !loginForm.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (!validateEmail(loginForm.email)) {
      setError('E-mail inválido');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: 1, nome: 'Carla Souza', email: loginForm.email,
        telefone: '(31) 99999-9999', nomeSalao: 'Beauty Salão & Estética',
        auth: { tokenJWT: 'mock_jwt_token_12345', biometriaAtivada: false }
      };
      
      setUserData(mockUser);
      setLoading(false);
      setSuccess('Login realizado com sucesso!');
      
      if (biometryAvailable && !mockUser.auth.biometriaAtivada) {
        setTimeout(() => setShowBiometryPrompt(true), 1000);
      } else {
        setTimeout(() => setScreen('dashboard'), 1500);
      }
    }, 1500);
  };

  const handleBiometricLogin = () => {
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: 1, nome: 'Carla Souza', email: 'carla@beautysalao.com',
        telefone: '(31) 99999-9999', nomeSalao: 'Beauty Salão & Estética',
        auth: { tokenJWT: 'mock_jwt_token_12345', biometriaAtivada: true }
      };
      
      setUserData(mockUser);
      setSuccess('Autenticação biométrica realizada!');
      setLoading(false);
      setTimeout(() => setScreen('dashboard'), 1500);
    }, 2000);
  };

  const handleSignup = () => {
    setError('');
    setSuccess('');
    
    if (!signupForm.nome || !signupForm.email || !signupForm.telefone || 
        !signupForm.nomeSalao || !signupForm.password || !signupForm.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (!validateEmail(signupForm.email)) {
      setError('E-mail inválido');
      return;
    }
    
    if (signupForm.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setSuccess('Conta criada com sucesso! Faça login para continuar.');
      setLoading(false);
      setTimeout(() => {
        setScreen('login');
        setSignupForm({ nome: '', email: '', telefone: '', nomeSalao: '', password: '', confirmPassword: '' });
      }, 2000);
    }, 1500);
  };

  const handleForgotPassword = () => {
    setError('');
    setSuccess('');
    
    if (!forgotEmail) {
      setError('Por favor, insira seu e-mail');
      return;
    }
    
    if (!validateEmail(forgotEmail)) {
      setError('E-mail inválido');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setSuccess('Link de redefinição enviado para seu e-mail!');
      setLoading(false);
      setTimeout(() => {
        setScreen('login');
        setForgotEmail('');
      }, 2000);
    }, 1500);
  };

  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full mb-4 shadow-lg">
            <Scissors className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Beauty Salão</h1>
          <p className="text-gray-600">Gerencie seu negócio com elegância</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Entrar</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : null}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          {biometryAvailable && (
            <>
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">ou</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <button
                onClick={handleBiometricLogin}
                disabled={loading}
                className="w-full bg-white border-2 border-rose-300 text-rose-600 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
              >
                <Fingerprint size={24} />
                Entrar com Biometria
              </button>
            </>
          )}

          <div className="mt-6 flex justify-between text-sm">
            <button
              onClick={() => setScreen('forgot')}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Esqueci minha senha
            </button>
            <button
              onClick={() => setScreen('signup')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Criar conta
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          © 2025 Beauty Salão. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );

  const renderSignup = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setScreen('login')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="text-gray-600" size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Criar Conta</h2>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={signupForm.nome}
                  onChange={(e) => setSignupForm({ ...signupForm, nome: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={signupForm.telefone}
                  onChange={(e) => setSignupForm({ ...signupForm, telefone: formatPhone(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="(31) 99999-9999"
                  maxLength={15}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Salão</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={signupForm.nomeSalao}
                  onChange={(e) => setSignupForm({ ...signupForm, nomeSalao: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Nome do seu salão"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Digite a senha novamente"
                />
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : null}
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForgot = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setScreen('login')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="text-gray-600" size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">Recuperar Senha</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Digite seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
              <CheckCircle size={20} />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-400 to-purple-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : null}
              {loading ? 'Enviando...' : 'Enviar Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBiometryPrompt = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-purple-100 rounded-full mb-4">
            <Fingerprint className="text-rose-500" size={40} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ativar Login Biométrico?</h3>
          <p className="text-gray-600 mb-6">
            Faça login de forma rápida e segura usando sua digital ou reconhecimento facial.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => { setShowBiometryPrompt(false); setTimeout(() => setScreen('dashboard'), 500); }}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Agora Não
            </button>
            <button
              onClick={() => {
                if (userData) {
                  setUserData({ ...userData, auth: { ...userData.auth, biometriaAtivada: true } });
                }
                setShowBiometryPrompt(false);
                setTimeout(() => setScreen('dashboard'), 500);
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Ativar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Bem-vinda, {userData?.nome}!</h1>
              <p className="text-gray-600 mt-1">{userData?.nomeSalao}</p>
            </div>
            <button
              onClick={() => {
                setUserData(null);
                setScreen('login');
                setLoginForm({ email: '', password: '' });
                setError('');
                setSuccess('');
              }}
              className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors"
            >
              Sair
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Agendamentos Hoje</h3>
              <p className="text-4xl font-bold text-rose-600">12</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Faturamento Mensal</h3>
              <p className="text-4xl font-bold text-purple-600">R$ 15.2k</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Clientes Ativos</h3>
              <p className="text-4xl font-bold text-pink-600">87</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Status da Conta</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">E-mail</span>
              <span className="font-medium text-gray-900">{userData?.email}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Telefone</span>
              <span className="font-medium text-gray-900">{userData?.telefone}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Login Biométrico</span>
              <span className={`font-medium ${userData?.auth.biometriaAtivada ? 'text-green-600' : 'text-gray-500'}`}>
                {userData?.auth.biometriaAtivada ? 'Ativado ✓' : 'Desativado'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === 'login' && renderLogin()}
      {screen === 'signup' && renderSignup()}
      {screen === 'forgot' && renderForgot()}
      {screen === 'dashboard' && renderDashboard()}
      {showBiometryPrompt && renderBiometryPrompt()}
    </>
  );
}