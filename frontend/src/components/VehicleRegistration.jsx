import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { ArrowLeft, Save, Truck, FileText, Settings, Calendar, Bell, User } from 'lucide-react';
import { useToast } from '../contexts/ToastContext.jsx';
import { Search } from 'lucide-react';

const VehicleRegistration = () => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    tipo: '',
    marca: '',
    modelo: '',
    ano: '',
    placa: '',
    chassi: '',
    renavam: '',
    cor: '',
    combustivel: '',
    setor: '',
    responsavel: '',
    kmAtual: '',
    proximaManutencao: '',
    observacoes: ''
  });

  const [pesquisar, setPesquisar] = useState('');

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!formData.marca) newErrors.marca = 'Marca é obrigatória';
    if (!formData.modelo) newErrors.modelo = 'Modelo é obrigatório';
    if (!formData.ano) newErrors.ano = 'Ano é obrigatório';
    if (!formData.placa) newErrors.placa = 'Placa é obrigatória';
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório';
    if (!formData.responsavel) newErrors.responsavel = 'Responsável é obrigatório';
    
    // Validação de placa (formato brasileiro)
    if (formData.placa && !/^[A-Z]{3}-?\d{4}$/.test(formData.placa.toUpperCase())) {
      newErrors.placa = 'Formato de placa inválido (ex: ABC-1234)';
    }
    
    // Validação de ano
    if (formData.ano && (formData.ano < 1900 || formData.ano > new Date().getFullYear() + 1)) {
      newErrors.ano = 'Ano inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Simular salvamento com possibilidade de erro
        const success = Math.random() > 0.2; // 80% de chance de sucesso
        
        if (success) {
          showSuccess(`Veículo ${formData.marca} ${formData.modelo} cadastrado com sucesso!`);
          console.log('Dados do veículo:', formData);
          
          // Limpar formulário após sucesso
          setFormData({
            tipo: '',
            marca: '',
            modelo: '',
            ano: '',
            placa: '',
            cor: '',
            chassi: '',
            renavam: '',
            combustivel: '',
            setor: '',
            responsavel: '',
            quilometragem: '',
            proximaManutencao: '',
            observacoes: ''
          });
          
          // Voltar ao dashboard após 2 segundos
          setTimeout(() => {
            onBack();
          }, 2000);
        } else {
          showError('Erro ao cadastrar veículo. Verifique os dados e tente novamente.');
        }
      } catch (error) {
        showError('Erro inesperado ao cadastrar veículo. Tente novamente.');
        console.error('Erro:', error);
      }
    } else {
      showError('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Veículo</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Operador Municipal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Pesquisar */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Search className="h-5 w-5 mr-2 text-green-600" />
                  Pesquisar                           
              </CardTitle>
              <div className="space-y-2">
                <Input
                  id="pesquisar"
                  value={pesquisar}
                  onChange={(e) => handleInputChange('pesquisar', e.target.value.toUpperCase())}
                />
              </div>               
            </CardHeader>
          </Card>

          {/* Informações Básicas */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Truck className="h-5 w-5 mr-2 text-blue-600" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Veículo *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger className={errors.tipo ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caminhao">Caminhão</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="onibus">Ônibus</SelectItem>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="motocicleta">Motocicleta</SelectItem>
                    <SelectItem value="trator">Trator</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipo && <p className="text-sm text-red-500">{errors.tipo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <Input
                  id="marca"
                  value={formData.marca}
                  onChange={(e) => handleInputChange('marca', e.target.value)}
                  placeholder="Ex: Volkswagen"
                  className={errors.marca ? 'border-red-500' : ''}
                />
                {errors.marca && <p className="text-sm text-red-500">{errors.marca}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  value={formData.modelo}
                  onChange={(e) => handleInputChange('modelo', e.target.value)}
                  placeholder="Ex: Constellation"
                  className={errors.modelo ? 'border-red-500' : ''}
                />
                {errors.modelo && <p className="text-sm text-red-500">{errors.modelo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ano">Ano *</Label>
                <Input
                  id="ano"
                  type="number"
                  value={formData.ano}
                  onChange={(e) => handleInputChange('ano', e.target.value)}
                  placeholder="Ex: 2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className={errors.ano ? 'border-red-500' : ''}
                />
                {errors.ano && <p className="text-sm text-red-500">{errors.ano}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="placa">Placa *</Label>
                <Input
                  id="placa"
                  value={formData.placa}
                  onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase())}
                  placeholder="ABC-1234"
                  maxLength="8"
                  className={errors.placa ? 'border-red-500' : ''}
                />
                {errors.placa && <p className="text-sm text-red-500">{errors.placa}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  value={formData.cor}
                  onChange={(e) => handleInputChange('cor', e.target.value)}
                  placeholder="Ex: Branco"
                />
              </div>
            </CardContent>
          </Card>

          {/* Documentação */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Documentação
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chassi">Chassi</Label>
                <Input
                  id="chassi"
                  value={formData.chassi}
                  onChange={(e) => handleInputChange('chassi', e.target.value.toUpperCase())}
                  placeholder="17 dígitos"
                  maxLength="17"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="renavam">RENAVAM</Label>
                <Input
                  id="renavam"
                  value={formData.renavam}
                  onChange={(e) => handleInputChange('renavam', e.target.value)}
                  placeholder="Número do RENAVAM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="combustivel">Combustível</Label>
                <Select value={formData.combustivel} onValueChange={(value) => handleInputChange('combustivel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o combustível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasolina">Gasolina</SelectItem>
                    <SelectItem value="etanol">Etanol</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="gnv">GNV</SelectItem>
                    <SelectItem value="eletrico">Elétrico</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Informações Operacionais */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Settings className="h-5 w-5 mr-2 text-yellow-600" />
                Informações Operacionais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="setor">Setor *</Label>
                <Select value={formData.setor} onValueChange={(value) => handleInputChange('setor', value)}>
                  <SelectTrigger className={errors.setor ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limpeza-urbana">Limpeza Urbana</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="obras">Obras</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="agricultura">Agricultura</SelectItem>
                    <SelectItem value="administracao">Administração</SelectItem>
                  </SelectContent>
                </Select>
                {errors.setor && <p className="text-sm text-red-500">{errors.setor}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  value={formData.responsavel}
                  onChange={(e) => handleInputChange('responsavel', e.target.value)}
                  placeholder="Nome do responsável"
                  className={errors.responsavel ? 'border-red-500' : ''}
                />
                {errors.responsavel && <p className="text-sm text-red-500">{errors.responsavel}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="kmAtual">Quilometragem Atual</Label>
                <Input
                  id="kmAtual"
                  type="number"
                  value={formData.kmAtual}
                  onChange={(e) => handleInputChange('kmAtual', e.target.value)}
                  placeholder="Ex: 50000"
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proximaManutencao">Próxima Manutenção</Label>
                <Input
                  id="proximaManutencao"
                  type="date"
                  value={formData.proximaManutencao}
                  onChange={(e) => handleInputChange('proximaManutencao', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  placeholder="Informações adicionais sobre o veículo..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" className="hover:bg-gray-100">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Salvar Veículo
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default VehicleRegistration;

