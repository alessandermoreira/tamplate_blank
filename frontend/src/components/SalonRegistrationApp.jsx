import React, { useState } from 'react';
import { Scissors, ArrowLeft, ArrowRight, CheckCircle, Building2, MapPin, Phone, Mail, Clock, Camera, X, AlertCircle, Loader } from 'lucide-react';

export default function SalonRegistrationApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nomeSalao: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    localizacao: {
      latitude: null,
      longitude: null
    },
    descricao: '',
    especialidades: [],
    faixaPreco: '',
    horarioFuncionamento: {
      segunda: { inicio: '09:00', fim: '18:00', fechado: false },
      terca: { inicio: '09:00', fim: '18:00', fechado: false },
      quarta: { inicio: '09:00', fim: '18:00', fechado: false },
      quinta: { inicio: '09:00', fim: '18:00', fechado: false },
      sexta: { inicio: '09:00', fim: '18:00', fechado: false },
      sabado: { inicio: '09:00', fim: '14:00', fechado: false },
      domingo: { inicio: '', fim: '', fechado: true }
    },
    logo: null,
    fotos: [],
    termosAceitos: false
  });

  const especialidadesOptions = [
    'Cortes', 'Coloração', 'Manicure', 'Pedicure', 
    'Tratamentos', 'Maquiagem', 'Sobrancelhas', 'Spa'
  ];

  const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

  const validateStep = () => {
    setError('');
    
    if (currentStep === 1) {
      if (!formData.nomeSalao.trim()) {
        setError('Nome do salão é obrigatório');
        return false;
      }
      if (!formData.cnpj.trim()) {
        setError('CNPJ é obrigatório');
        return false;
      }
      if (!formData.telefone.trim()) {
        setError('Telefone é obrigatório');
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Email válido é obrigatório');
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.endereco.cep.trim()) {
        setError('CEP é obrigatório');
        return false;
      }
      if (!formData.endereco.rua.trim()) {
        setError('Rua é obrigatória');
        return false;
      }
      if (!formData.endereco.numero.trim()) {
        setError('Número é obrigatório');
        return false;
      }
      if (!formData.endereco.bairro.trim()) {
        setError('Bairro é obrigatório');
        return false;
      }
      if (!formData.endereco.cidade.trim()) {
        setError('Cidade é obrigatória');
        return false;
      }
      if (!formData.endereco.estado.trim()) {
        setError('Estado é obrigatório');
        return false;
      }
    }

    if (currentStep === 3) {
      if (formData.especialidades.length === 0) {
        setError('Selecione ao menos uma especialidade');
        return false;
      }
      if (!formData.faixaPreco) {
        setError('Selecione a faixa de preço');
        return false;
      }
    }

    if (currentStep === 4) {
      if (formData.fotos.length === 0) {
        setError('Adicione ao menos uma foto do salão');
        return false;
      }
      if (!formData.termosAceitos) {
        setError('Você deve aceitar os termos e condições');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!validateStep(4)) return;
    
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const toggleEspecialidade = (esp) => {
    if (formData.especialidades.includes(esp)) {
      setFormData({
        ...formData,
        especialidades: formData.especialidades.filter(e => e !== esp)
      });
    } else {
      setFormData({
        ...formData,
        especialidades: [...formData.especialidades, esp]
      });
    }
  };

  const handleAddFoto = () => {
    if (formData.fotos.length < 5) {
      setFormData({
        ...formData,
        fotos: [...formData.fotos, `foto-${Date.now()}`]
      });
    }
  };

  const handleRemoveFoto = (index) => {
    setFormData({
      ...formData,
      fotos: formData.fotos.filter((_, i) => i !== index)
    });
  };

  const buscarCEP = async () => {
    if (formData.endereco.cep.length === 8) {
      setLoading(true);
      setTimeout(() => {
        setFormData({
          ...formData,
          endereco: {
            ...formData.endereco,
            rua: 'Rua Exemplo',
            bairro: 'Bairro Exemplo',
            cidade: 'Belo Horizonte',
            estado: 'MG'
          }
        });
        setLoading(false);
      }, 1000);
    }
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div 
        className="bg-gradient-to-r from-rose-400 to-purple-400 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / 4) * 100}%` }}
      />
    </div>
  );

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full mb-6 shadow-lg">
              <Scissors className="text-white" size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Cadastre seu Salão</h1>
            <p className="text-gray-600 mb-8">
              Faça parte do nosso marketplace e alcance mais clientes
            </p>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all mb-4"
            >
              Começar Cadastro
            </button>

            <button className="text-rose-600 hover:text-rose-700 font-medium text-sm">
              Já tenho cadastro
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Cadastro Realizado!</h1>
            <p className="text-gray-600 mb-2">
              Seu cadastro foi enviado com sucesso
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Em breve entraremos em contato para aprovação
            </p>

            <button className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
              Ir para Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {currentStep > 0 && (
              <button onClick={handleBack} className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                <ArrowLeft className="text-gray-700" size={24} />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 flex-1 text-center">
              Cadastro de Salão
            </h1>
            <div className="w-10"></div>
          </div>
          <ProgressBar />
          <p className="text-center text-sm text-gray-600">
            Etapa {currentStep} de 4
          </p>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Step 1 - Informações Básicas */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Salão <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nomeSalao}
                  onChange={(e) => setFormData({ ...formData, nomeSalao: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Nome do seu salão"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CNPJ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="(31) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="contato@salao.com"
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Próximo
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Endereço */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Endereço e Localização</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.endereco.cep}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      endereco: { ...formData.endereco, cep: e.target.value }
                    })}
                    className="flex-1 px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="00000-000"
                    maxLength={9}
                  />
                  <button
                    onClick={buscarCEP}
                    disabled={loading}
                    className="px-6 py-3 bg-rose-100 text-rose-600 rounded-xl font-medium hover:bg-rose-200 transition-colors"
                  >
                    {loading ? <Loader className="animate-spin" size={20} /> : 'Buscar'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua/Avenida <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.endereco.rua}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco, rua: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Nome da rua"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.endereco.numero}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      endereco: { ...formData.endereco, numero: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={formData.endereco.complemento}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      endereco: { ...formData.endereco, complemento: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Sala 101"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.endereco.bairro}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    endereco: { ...formData.endereco, bairro: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Nome do bairro"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.endereco.cidade}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      endereco: { ...formData.endereco, cidade: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Belo Horizonte"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.endereco.estado}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      endereco: { ...formData.endereco, estado: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="">Selecione</option>
                    <option value="MG">MG</option>
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Próximo
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Informações do Negócio */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações do Negócio</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Salão
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Conte sobre seu salão, diferenciais, ambiente..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Especialidades <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {especialidadesOptions.map((esp) => (
                    <button
                      key={esp}
                      onClick={() => toggleEspecialidade(esp)}
                      className={`py-3 px-4 rounded-xl font-medium transition-all ${
                        formData.especialidades.includes(esp)
                          ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {esp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Faixa de Preço <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {['$', '$$', '$$$'].map((price) => (
                    <button
                      key={price}
                      onClick={() => setFormData({ ...formData, faixaPreco: price })}
                      className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all ${
                        formData.faixaPreco === price
                          ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {price}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  $ = Econômico | $$ = Moderado | $$$ = Premium
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Horário de Funcionamento
                </label>
                <div className="space-y-3">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                        {dia}
                      </div>
                      <input
                        type="time"
                        value={formData.horarioFuncionamento[dia].inicio}
                        onChange={(e) => setFormData({
                          ...formData,
                          horarioFuncionamento: {
                            ...formData.horarioFuncionamento,
                            [dia]: { ...formData.horarioFuncionamento[dia], inicio: e.target.value }
                          }
                        })}
                        disabled={formData.horarioFuncionamento[dia].fechado}
                        className="flex-1 px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-100"
                      />
                      <span className="text-gray-500">até</span>
                      <input
                        type="time"
                        value={formData.horarioFuncionamento[dia].fim}
                        onChange={(e) => setFormData({
                          ...formData,
                          horarioFuncionamento: {
                            ...formData.horarioFuncionamento,
                            [dia]: { ...formData.horarioFuncionamento[dia], fim: e.target.value }
                          }
                        })}
                        disabled={formData.horarioFuncionamento[dia].fechado}
                        className="flex-1 px-3 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-100"
                      />
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formData.horarioFuncionamento[dia].fechado}
                          onChange={(e) => setFormData({
                            ...formData,
                            horarioFuncionamento: {
                              ...formData.horarioFuncionamento,
                              [dia]: { ...formData.horarioFuncionamento[dia], fechado: e.target.checked }
                            }
                          })}
                          className="rounded"
                        />
                        Fechado
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Próximo
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Fotos e Finalização */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fotos e Finalização</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Logo do Salão
                </label>
                <div className="border-2 border-dashed border-rose-200 rounded-xl p-8 text-center hover:border-rose-400 transition-colors cursor-pointer">
                  <Camera className="mx-auto text-rose-300 mb-2" size={48} />
                  <p className="text-sm text-gray-600">Clique para adicionar logo</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Fotos do Salão <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(até 5 fotos)</span>
                </label>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {formData.fotos.map((foto, index) => (
                    <div key={index} className="relative aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-xl flex items-center justify-center">
                      <Camera className="text-white" size={32} />
                      <button
                        onClick={() => handleRemoveFoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {formData.fotos.length < 5 && (
                    <button
                      onClick={handleAddFoto}
                      className="aspect-square border-2 border-dashed border-rose-200 rounded-xl flex items-center justify-center hover:border-rose-400 transition-colors"
                    >
                      <Camera className="text-rose-300" size={32} />
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-rose-100 pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termosAceitos}
                    onChange={(e) => setFormData({ ...formData, termosAceitos: e.target.checked })}
                    className="mt-1 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    Li e aceito os <span className="text-rose-600 font-medium">termos e condições</span> e a <span className="text-rose-600 font-medium">política de privacidade</span>
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Concluir Cadastro
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}