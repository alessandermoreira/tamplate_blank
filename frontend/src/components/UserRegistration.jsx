import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { ArrowLeft, Save, User, Shield, Building, Mail, Phone, Bell } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext.jsx';
import { Switch } from "@/components/ui/switch.jsx";
import { useAuth } from "../contexts/AuthContext";
const VITE_URL_SERVER = import.meta.env.VITE_URL_SERVER;

const UserRegistration = ({onNavigate, userEdit}) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState(userEdit);
  const { getToken } = useAuth();
  const [alterarSenha, setAlterarSenha] = useState(false);
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
    
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.cargo) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório';
    if (!formData.nivelacesso) newErrors.nivelacesso = 'Nível de acesso é obrigatório';
    if ((!formData.senha && alterarSenha ) || ( !formData.senha && !formData.id) ) newErrors.senha = 'Senha é obrigatória';
    if (formData.senha && !formData.confirmarSenha) newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    if (!formData.cep) newErrors.cep = 'Preencha o CEP';
    if (!formData.cidade) newErrors.cidade = 'Preencha a cidade';    
    if (!formData.endereco) newErrors.endereco = 'Preencha o endereço';        
    // Validação de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }
    
    // Validação de CPF (formato básico)
    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'Formato de CPF inválido (ex: 123.456.789-00)';
    }
    
    // Validação de telefone
    if (formData.telefone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato de telefone inválido (ex: (11) 99999-9999)';
    }
    
    // Validação de senha
    if (formData.senha && formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    // Validação de confirmação de senha
    if ( formData.senha  && (formData.senha !== formData.confirmarSenha)) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {

      if (formData.id) {
        // Editar usuário existente
        axios.put( `${VITE_URL_SERVER}/users/${formData.id}`, 
          formData,   
          { headers: { Authorization: `Bearer ${getToken()}` } })
        .then(response => {
          showSuccess('Usuário atualizado com sucesso!');
          onNavigate('users-list');
        })
        .catch(error => {
          if(error.response.data.message) {
            msg = error.response.data.message;
          }
          
          showError('Erro ao atualizar usuário: ' + error.message + ' - ' + msg );
        });
      }else {
        try {
          axios.post(`${VITE_URL_SERVER}/register`, formData,{params: formData})
          .then(response => {

            // Limpar formulário
            setFormData({
              nome: '',
              email: '',
              telefone: '',
              cpf: '',
              cargo: '',
              setor: '',
              nivelacesso: '',
              senha: '',
              confirmarSenha: '',
              endereco: '',
              cidade: '',
              cep: '',
              observacoes: ''
            });

            console.log('Usuário cadastrado com sucesso:', response.data);
            showSuccess('Usuário "'+formData.nome+'" cadastrado com sucesso!');
            onNavigate('users-list');
      
          })
          .catch(error => {
            if(error.response.data.message)
              showError('Erro: '+ error.response.data.message)
            else
              showError('Erro ao cadastrar usuário: '+ error.message);
          });
        } catch (error) {
          showError('Erro inesperado ao cadastrar usuário. Tente novamente.');
          console.error('Erro:', error);
        }
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
            <br/>
            <h1 className="text-2xl font-semibold text-gray-900"> Cadastro de Usuário</h1>
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
          
          {/* Informações Pessoais */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                  Informações Pessoais
              </CardTitle>             
            </CardHeader>
          
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Ex: João Silva Santos"
                  className={errors.nome ? 'border-red-500' : ''}
                />
                {errors.nome && <p className="text-sm text-red-500">{errors.nome}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="joao.silva@prefeitura.gov.br"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                 <Label htmlFor="nome">Bloqueado</Label>
                 <Switch
                  checked={!!formData.blocked}
                  onCheckedChange={(e) => handleInputChange('blocked', e )}
                  aria-label={formData.blocked ? "Desbloquear usuário" : "Bloquear usuário"}
                />  
              </div>              

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className={errors.telefone ? 'border-red-500' : ''}
                />
                {errors.telefone && <p className="text-sm text-red-500">{errors.telefone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="123.456.789-00"
                  className={errors.cpf ? 'border-red-500' : ''}
                />
                {errors.cpf && <p className="text-sm text-red-500">{errors.cpf}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Rua das Flores, 123"                   
                />
                {errors.endereco && <p className="text-sm text-red-500">{errors.endereco}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="São Paulo"
                />
                {errors.cidade && <p className="text-sm text-red-500">{errors.cidade}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  placeholder="01234-567"
                />
                {errors.cep && <p className="text-sm text-red-500">{errors.cep}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <Building className="h-5 w-5 mr-2 text-green-600" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Select value={formData.cargo} onValueChange={(value) => handleInputChange('cargo', value)}>
                  <SelectTrigger className={errors.cargo ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="coordenador">Coordenador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="diretor">Diretor</SelectItem>
                    <SelectItem value="secretario">Secretário</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="analista">Analista</SelectItem>
                  </SelectContent>
                </Select>
                {errors.cargo && <p className="text-sm text-red-500">{errors.cargo}</p>}
              </div>

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
                    <SelectItem value="financas">Finanças</SelectItem>
                    <SelectItem value="recursos-humanos">Recursos Humanos</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  </SelectContent>
                </Select>
                {errors.setor && <p className="text-sm text-red-500">{errors.setor}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nivelacesso">Nível de Acesso *</Label>
                <Select value={formData.nivelacesso} onValueChange={(value) => handleInputChange('nivelacesso', value)}>
                  <SelectTrigger className={errors.nivelacesso ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Básico - Visualização</SelectItem>
                    <SelectItem value="operacional">Operacional - Edição</SelectItem>
                    <SelectItem value="supervisor">Supervisor - Aprovação</SelectItem>
                    <SelectItem value="administrador">Administrador - Total</SelectItem>
                  </SelectContent>
                </Select>
                {errors.nivelacesso && <p className="text-sm text-red-500">{errors.nivelacesso}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">

              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-yellow-600" />
                Segurança
              </CardTitle>

              { formData.id &&
              <div className="flex items-center text-lg" style={{'gridColumnStart': 'none'}} >
                 <Label htmlFor="nome"> Alterar Senha </Label>
                 <Switch
                  checked={alterarSenha}
                  onCheckedChange={(e) =>  setAlterarSenha(e)}
                  aria-label={alterarSenha ? "Alterar Senha" : "Bloquear usuário"}
                />  
              </div> }              
  
 
            </CardHeader>
            {alterarSenha && 
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={errors.senha ? 'border-red-500' : ''}
                />
                {errors.senha && <p className="text-sm text-red-500">{errors.senha}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  placeholder="Digite a senha novamente"
                  className={errors.confirmarSenha ? 'border-red-500' : ''}
                />
                {errors.confirmarSenha && <p className="text-sm text-red-500">{errors.confirmarSenha}</p>}
              </div>
            </CardContent>
            }
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
                  placeholder="Informações adicionais sobre o usuário..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline"  className="hover:bg-gray-100" onClick={() => onNavigate('/dashboard')}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
                Salvar Usuário
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserRegistration;

