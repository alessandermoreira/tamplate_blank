import React, { useState } from 'react';
import { Settings, Calendar, BarChart3, Users, Scissors, Plus, MoreVertical, Menu, X, Search, Star, Phone, Mail, Clock, ChevronLeft, ChevronRight, User, MapPin, Bell, Palette, Briefcase, DollarSign, TrendingUp, Download, Filter, CalendarDays, Edit2, Trash2, Check } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

export default function SalonApp() {
  const [activeTab, setActiveTab] = useState('services');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [clientForm, setClientForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    observacoes: ''
  });
  const [scheduleForm, setScheduleForm] = useState({
    clienteId: '',
    servicoId: '',
    profissional: '',
    data: '',
    hora: ''
  });
  const [reportType, setReportType] = useState('revenue'); // 'revenue' or 'services'
  const [reportFilters, setReportFilters] = useState({
    dataInicio: '2025-09-01',
    dataFim: '2025-09-30',
    profissional: '',
    servico: ''
  });

  // Agendas Data
  const [agendas, setAgendas] = useState([
    { id: 1, nomeAgenda: 'Agenda Global', global: true, profissionaisVinculados: [], ativa: true },
    { id: 2, nomeAgenda: 'Agenda Cabelereira Ana', global: false, profissionaisVinculados: [0], ativa: true },
    { id: 3, nomeAgenda: 'Agenda Manicure', global: false, profissionaisVinculados: [1, 2], ativa: true }
  ]);
  const [showAgendaForm, setShowAgendaForm] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState(null);
  const [agendaForm, setAgendaForm] = useState({
    nomeAgenda: '',
    global: false,
    profissionaisVinculados: []
  });
  const [agendaFilter, setAgendaFilter] = useState('all'); // 'all', 'global', 'professional'
  
  // Services Data
  const [services, setServices] = useState([
    { id: 1, name: 'Unhas de Gel', duration: '30 min', price: 'R$ 50,00' },
    { id: 2, name: 'Manicure', duration: '45 min', price: 'R$ 35,00' },
    { id: 3, name: 'Pedicure', duration: '45 min', price: 'R$ 40,00' },
    { id: 4, name: 'Corte Feminino', duration: '60 min', price: 'R$ 80,00' },
    { id: 5, name: 'Corte Masculino', duration: '30 min', price: 'R$ 45,00' },
    { id: 6, name: 'Escova', duration: '40 min', price: 'R$ 60,00' },
    { id: 7, name: 'Hidratação', duration: '50 min', price: 'R$ 70,00' },
    { id: 8, name: 'Coloração', duration: '120 min', price: 'R$ 150,00' },
    { id: 9, name: 'Maquiagem', duration: '45 min', price: 'R$ 90,00' },
    { id: 10, name: 'Design de Sobrancelhas', duration: '20 min', price: 'R$ 30,00' }
  ]);
  const [menuOpen, setMenuOpen] = useState(null);

  // Clients Data
  const [clients, setClients] = useState([
    { id: 1, nome: 'Maria Silva', telefone: '(31) 99999-9999', email: 'maria@email.com', dataNascimento: '1990-05-12', observacoes: 'Prefere cortes curtos', ultimoServico: 'Corte Feminino', vip: true },
    { id: 2, nome: 'Ana Costa', telefone: '(31) 98888-8888', email: 'ana@email.com', dataNascimento: '1985-08-20', observacoes: '', ultimoServico: 'Manicure', vip: false },
    { id: 3, nome: 'Julia Santos', telefone: '(31) 97777-7777', email: 'julia@email.com', dataNascimento: '1992-03-15', observacoes: 'Alérgica a esmalte vermelho', ultimoServico: 'Hidratação', vip: true },
    { id: 4, nome: 'Beatriz Lima', telefone: '(31) 96666-6666', email: '', dataNascimento: '1988-11-30', observacoes: '', ultimoServico: 'Maquiagem', vip: false },
  ]);

  // Schedule Data
  const [schedules, setSchedules] = useState([
    { id: 101, clienteId: 1, servicoId: 4, profissional: 'Ana', dataHora: '2025-09-29T14:00:00', status: 'agendado' },
    { id: 102, clienteId: 2, servicoId: 2, profissional: 'Bia', dataHora: '2025-09-29T15:30:00', status: 'agendado' },
    { id: 103, clienteId: 3, servicoId: 7, profissional: 'Ana', dataHora: '2025-09-29T16:00:00', status: 'agendado' },
    { id: 104, clienteId: 1, servicoId: 1, profissional: 'Carlos', dataHora: '2025-09-30T10:00:00', status: 'agendado' },
  ]);

  // Settings Data
  const [settings, setSettings] = useState({
    profissionais: ['Ana', 'Bia', 'Carlos'],
    horariosAtendimento: {
      segunda: ['09:00', '18:00'],
      terca: ['09:00', '18:00'],
      quarta: ['09:00', '18:00'],
      quinta: ['09:00', '18:00'],
      sexta: ['09:00', '18:00'],
      sabado: ['09:00', '14:00']
    },
    notificacoes: true,
    tema: 'claro',
    informacoesSalao: {
      nome: 'Beauty Salão & Estética',
      endereco: 'Rua Exemplo, 123 - Belo Horizonte',
      telefone: '(31) 99999-9999'
    }
  });

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleEdit = (id) => {
    alert(`Editar serviço: ${services.find(s => s.id === id).name}`);
    setMenuOpen(null);
  };

  const handleDelete = (id) => {
    if (confirm('Deseja realmente excluir este serviço?')) {
      setServices(services.filter(s => s.id !== id));
    }
    setMenuOpen(null);
  };

  const handleAddService = () => {
    alert('Adicionar novo serviço');
  };

  // Client Functions
  const handleEditClient = (client) => {
    setEditingClient(client);
    setClientForm({
      nome: client.nome,
      telefone: client.telefone,
      email: client.email || '',
      dataNascimento: client.dataNascimento || '',
      observacoes: client.observacoes || ''
    });
    setShowClientForm(true);
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setClientForm({
      nome: '',
      telefone: '',
      email: '',
      dataNascimento: '',
      observacoes: ''
    });
    setShowClientForm(true);
  };

  const handleSaveClient = () => {
    // Validação
    if (!clientForm.nome.trim()) {
      alert('Nome é obrigatório');
      return;
    }
    if (!clientForm.telefone.trim()) {
      alert('Telefone é obrigatório');
      return;
    }

    if (editingClient) {
      // Editar cliente existente
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...clientForm }
          : c
      ));
    } else {
      // Adicionar novo cliente
      const newClient = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        ...clientForm,
        ultimoServico: 'Nenhum',
        vip: false
      };
      setClients([...clients, newClient]);
    }
    
    setShowClientForm(false);
    setClientForm({
      nome: '',
      telefone: '',
      email: '',
      dataNascimento: '',
      observacoes: ''
    });
  };

  const handleDeleteClient = (id) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleToggleVip = (id) => {
    setClients(clients.map(c => c.id === id ? { ...c, vip: !c.vip } : c));
  };

  const filteredClients = clients.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm)
  );

  // Schedule Functions
  const getSchedulesForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedules.filter(s => s.dataHora.startsWith(dateStr));
  };

  const getClientName = (clienteId) => {
    const client = clients.find(c => c.id === clienteId);
    return client ? client.nome : 'Cliente não encontrado';
  };

  const getServiceName = (servicoId) => {
    const service = services.find(s => s.id === servicoId);
    return service ? service.name : 'Serviço não encontrado';
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleAddSchedule = () => {
    const today = new Date().toISOString().split('T')[0];
    setScheduleForm({
      clienteId: '',
      servicoId: '',
      profissional: settings.profissionais[0] || '',
      data: today,
      hora: '09:00'
    });
    setShowScheduleForm(true);
  };

  const handleSaveSchedule = () => {
    // Validação
    if (!scheduleForm.clienteId) {
      alert('Selecione um cliente');
      return;
    }
    if (!scheduleForm.servicoId) {
      alert('Selecione um serviço');
      return;
    }
    if (!scheduleForm.data || !scheduleForm.hora) {
      alert('Data e hora são obrigatórios');
      return;
    }

    const newSchedule = {
      id: Math.max(...schedules.map(s => s.id)) + 1,
      clienteId: parseInt(scheduleForm.clienteId),
      servicoId: parseInt(scheduleForm.servicoId),
      profissional: scheduleForm.profissional,
      dataHora: `${scheduleForm.data}T${scheduleForm.hora}:00`,
      status: 'agendado'
    };

    setSchedules([...schedules, newSchedule]);
    setShowScheduleForm(false);
    setScheduleForm({
      clienteId: '',
      servicoId: '',
      profissional: '',
      data: '',
      hora: ''
    });
  };

  const handleCancelSchedule = (id) => {
    if (confirm('Deseja realmente cancelar este agendamento?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  // Report Functions
  const getFilteredSchedules = () => {
    return schedules.filter(s => {
      const scheduleDate = new Date(s.dataHora);
      const startDate = new Date(reportFilters.dataInicio);
      const endDate = new Date(reportFilters.dataFim);
      
      let matches = scheduleDate >= startDate && scheduleDate <= endDate;
      
      if (reportFilters.profissional) {
        matches = matches && s.profissional === reportFilters.profissional;
      }
      
      if (reportFilters.servico) {
        matches = matches && s.servicoId === parseInt(reportFilters.servico);
      }
      
      return matches;
    });
  };

  const calculateRevenueReport = () => {
    const filtered = getFilteredSchedules();
    
    let totalFaturado = 0;
    const servicosMap = {};
    const profissionaisMap = {};
    
    filtered.forEach(schedule => {
      const service = services.find(s => s.id === schedule.servicoId);
      if (service) {
        const valor = parseFloat(service.price.replace('R$ ', '').replace(',', '.'));
        totalFaturado += valor;
        
        // Por serviço
        if (!servicosMap[service.name]) {
          servicosMap[service.name] = 0;
        }
        servicosMap[service.name] += valor;
        
        // Por profissional
        if (!profissionaisMap[schedule.profissional]) {
          profissionaisMap[schedule.profissional] = 0;
        }
        profissionaisMap[schedule.profissional] += valor;
      }
    });
    
    const topServicos = Object.entries(servicosMap)
      .map(([servico, valor]) => ({ servico, valor }))
      .sort((a, b) => b.valor - a.valor);
    
    const topProfissionais = Object.entries(profissionaisMap)
      .map(([profissional, valor]) => ({ profissional, valor }))
      .sort((a, b) => b.valor - a.valor);
    
    return {
      totalFaturado,
      totalAtendimentos: filtered.length,
      ticketMedio: filtered.length > 0 ? totalFaturado / filtered.length : 0,
      topServicos,
      topProfissionais
    };
  };

  const calculateServicesReport = () => {
    const filtered = getFilteredSchedules();
    
    const servicosCount = {};
    const profissionaisCount = {};
    const diasCount = {};
    const clientesCount = {};
    
    filtered.forEach(schedule => {
      const service = services.find(s => s.id === schedule.servicoId);
      const client = clients.find(c => c.id === schedule.clienteId);
      const date = new Date(schedule.dataHora);
      const diaSemana = date.toLocaleDateString('pt-BR', { weekday: 'long' });
      
      // Contagem por serviço
      if (service) {
        servicosCount[service.name] = (servicosCount[service.name] || 0) + 1;
      }
      
      // Contagem por profissional
      profissionaisCount[schedule.profissional] = (profissionaisCount[schedule.profissional] || 0) + 1;
      
      // Contagem por dia da semana
      diasCount[diaSemana] = (diasCount[diaSemana] || 0) + 1;
      
      // Contagem por cliente
      if (client) {
        clientesCount[client.nome] = (clientesCount[client.nome] || 0) + 1;
      }
    });
    
    const totalAtendimentos = filtered.length;
    
    const servicoMaisRealizado = Object.entries(servicosCount)
      .sort((a, b) => b[1] - a[1])[0];
    
    const diasMaisMovimentados = Object.entries(diasCount)
      .map(([dia, atendimentos]) => ({ dia, atendimentos }))
      .sort((a, b) => b.atendimentos - a.atendimentos);
    
    const profissionalMaisAtivo = Object.entries(profissionaisCount)
      .sort((a, b) => b[1] - a[1])[0];
    
    const clientesRecorrentes = Object.entries(clientesCount)
      .map(([cliente, vezes]) => ({ cliente, vezes }))
      .filter(c => c.vezes > 1)
      .sort((a, b) => b.vezes - a.vezes);
    
    const servicosData = Object.entries(servicosCount).map(([name, value]) => ({
      name,
      value,
      percentage: ((value / totalAtendimentos) * 100).toFixed(1)
    }));
    
    return {
      totalAtendimentos,
      servicoMaisRealizado: servicoMaisRealizado ? {
        servico: servicoMaisRealizado[0],
        percentual: ((servicoMaisRealizado[1] / totalAtendimentos) * 100).toFixed(1)
      } : null,
      diasMaisMovimentados,
      profissionalMaisAtivo: profissionalMaisAtivo ? {
        profissional: profissionalMaisAtivo[0],
        totalAtendimentos: profissionalMaisAtivo[1]
      } : null,
      clientesRecorrentes,
      servicosData
    };
  };

  const handleExportReport = (format) => {
    alert(`Exportando relatório em ${format.toUpperCase()}...`);
  };

  const COLORS = ['#fb7185', '#a78bfa', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'];

  // Agenda Functions
  const handleAddAgenda = () => {
    setEditingAgenda(null);
    setAgendaForm({
      nomeAgenda: '',
      global: false,
      profissionaisVinculados: []
    });
    setShowAgendaForm(true);
  };

  const handleEditAgenda = (agenda) => {
    setEditingAgenda(agenda);
    setAgendaForm({
      nomeAgenda: agenda.nomeAgenda,
      global: agenda.global,
      profissionaisVinculados: [...agenda.profissionaisVinculados]
    });
    setShowAgendaForm(true);
  };

  const handleSaveAgenda = () => {
    if (!agendaForm.nomeAgenda.trim()) {
      alert('Por favor, insira o nome da agenda');
      return;
    }

    if (!agendaForm.global && agendaForm.profissionaisVinculados.length === 0) {
      alert('Selecione ao menos um profissional ou marque como agenda global');
      return;
    }

    if (editingAgenda) {
      setAgendas(agendas.map(a => 
        a.id === editingAgenda.id 
          ? { ...a, ...agendaForm }
          : a
      ));
    } else {
      const newAgenda = {
        id: Math.max(...agendas.map(a => a.id), 0) + 1,
        ...agendaForm,
        ativa: true
      };
      setAgendas([...agendas, newAgenda]);
    }

    setShowAgendaForm(false);
    setAgendaForm({
      nomeAgenda: '',
      global: false,
      profissionaisVinculados: []
    });
  };

  const handleDeleteAgenda = (id) => {
    if (confirm('Deseja realmente excluir esta agenda?')) {
      setAgendas(agendas.filter(a => a.id !== id));
    }
  };

  const handleToggleAgendaStatus = (id) => {
    setAgendas(agendas.map(a => 
      a.id === id ? { ...a, ativa: !a.ativa } : a
    ));
  };

  const toggleProfessionalSelection = (index) => {
    const profissionais = [...agendaForm.profissionaisVinculados];
    const idx = profissionais.indexOf(index);
    
    if (idx > -1) {
      profissionais.splice(idx, 1);
    } else {
      profissionais.push(index);
    }
    
    setAgendaForm({ ...agendaForm, profissionaisVinculados: profissionais });
  };

  const getProfessionalNames = (indices) => {
    if (indices.length === 0) return 'Nenhum';
    return indices.map(i => settings.profissionais[i]).filter(Boolean).join(', ');
  };

  const getFilteredAgendas = () => {
    if (agendaFilter === 'global') {
      return agendas.filter(a => a.global);
    } else if (agendaFilter === 'professional') {
      return agendas.filter(a => !a.global);
    }
    return agendas;
  };

  const menuItems = [
    { id: 'services', icon: Scissors, label: 'Serviços' },
    { id: 'clients', icon: Users, label: 'Clientes' },
    { id: 'schedule', icon: Calendar, label: 'Agenda' },
    { id: 'agendas', icon: CalendarDays, label: 'Agendas' },
    { id: 'report', icon: BarChart3, label: 'Relatórios' },
    { id: 'settings', icon: Settings, label: 'Configurações' }
  ];

  // Render Services Screen
  const renderServices = () => (
    <>
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-light text-gray-800 tracking-wide">Serviços</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie seus serviços e preços</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-4 max-w-4xl">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-rose-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-3 mr-4">
                    <Scissors className="text-rose-500" size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0 mr-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{service.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={16} />
                        {service.duration}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold text-rose-600 text-xl">{service.price}</span>
                  
                  <div className="relative">
                    <button onClick={() => toggleMenu(service.id)} className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                      <MoreVertical className="text-gray-400" size={20} />
                    </button>
                    
                    {menuOpen === service.id && (
                      <div className="absolute right-0 mt-2 bg-white border border-rose-100 rounded-xl shadow-xl z-10 w-36 overflow-hidden">
                        <button onClick={() => handleEdit(service.id)} className="w-full text-left px-4 py-3 hover:bg-rose-50 text-sm text-gray-700 transition-colors">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(service.id)} className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors">
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleAddService} className="fixed bottom-8 right-8 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full p-5 shadow-2xl hover:shadow-rose-300 hover:scale-110 transition-all z-20">
        <Plus size={28} />
      </button>
    </>
  );

  // Render Clients Screen
  const renderClients = () => (
    <>
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-light text-gray-800 tracking-wide">Clientes</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie sua base de clientes</p>
          
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-4 max-w-4xl">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-rose-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1 min-w-0">
                  <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-3 mr-4">
                    <User className="text-rose-500" size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800 text-lg">{client.nome}</h3>
                      {client.vip && (
                        <Star className="text-yellow-500 fill-yellow-500" size={18} />
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-600 text-sm flex items-center gap-2">
                        <Phone size={14} />
                        {client.telefone}
                      </p>
                      {client.email && (
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          <Mail size={14} />
                          {client.email}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm mt-2">
                        Último serviço: <span className="font-medium text-rose-600">{client.ultimoServico}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVip(client.id)}
                    className={`p-2 rounded-full transition-colors ${client.vip ? 'bg-yellow-100 hover:bg-yellow-200' : 'hover:bg-gray-100'}`}
                  >
                    <Star className={client.vip ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} size={20} />
                  </button>
                  
                  <button onClick={() => handleEditClient(client)} className="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors text-sm font-medium">
                    Editar
                  </button>
                  
                  <button onClick={() => handleDeleteClient(client.id)} className="p-2 hover:bg-red-50 rounded-full transition-colors">
                    <X className="text-red-500" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setShowClientForm(true)} className="fixed bottom-8 right-8 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full p-5 shadow-2xl hover:shadow-rose-300 hover:scale-110 transition-all z-20">
        <Plus size={28} />
      </button>

      {/* Client Form Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-rose-400 to-purple-400 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
                </h2>
                <button onClick={() => setShowClientForm(false)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={clientForm.nome}
                  onChange={(e) => setClientForm({ ...clientForm, nome: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={clientForm.telefone}
                  onChange={(e) => setClientForm({ ...clientForm, telefone: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="(31) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={clientForm.dataNascimento}
                  onChange={(e) => setClientForm({ ...clientForm, dataNascimento: e.target.value })}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={clientForm.observacoes}
                  onChange={(e) => setClientForm({ ...clientForm, observacoes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Preferências, alergias, observações..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowClientForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveClient}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Render Schedule Screen
  const renderSchedule = () => {
    const todaySchedules = getSchedulesForDate(selectedDate);
    
    return (
      <>
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-light text-gray-800 tracking-wide">Agenda</h1>
            <p className="text-sm text-gray-500 mt-1">Visualize e gerencie agendamentos</p>
            
            <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-4">
              <button onClick={() => changeDate(-1)} className="p-2 hover:bg-white rounded-full transition-colors">
                <ChevronLeft className="text-rose-600" size={24} />
              </button>
              
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-800">
                  {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' })}
                </p>
              </div>
              
              <button onClick={() => changeDate(1)} className="p-2 hover:bg-white rounded-full transition-colors">
                <ChevronRight className="text-rose-600" size={24} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid gap-4 max-w-4xl">
            {todaySchedules.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 text-lg">Nenhum agendamento para este dia</p>
              </div>
            ) : (
              todaySchedules.map((schedule) => (
                <div key={schedule.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full px-4 py-3 mr-4">
                        <p className="font-bold text-rose-600 text-lg">{formatTime(schedule.dataHora)}</p>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{getClientName(schedule.clienteId)}</h3>
                        <p className="text-gray-600 text-sm mt-1">{getServiceName(schedule.servicoId)}</p>
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                          <Briefcase size={14} />
                          Profissional: {schedule.profissional}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {schedule.status}
                      </span>
                      
                      <button 
                        onClick={() => handleCancelSchedule(schedule.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button onClick={() => setShowScheduleForm(true)} className="fixed bottom-8 right-8 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full p-5 shadow-2xl hover:shadow-rose-300 hover:scale-110 transition-all z-20">
          <Plus size={28} />
        </button>

        {/* Schedule Form Modal */}
        {showScheduleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              <div className="bg-gradient-to-r from-rose-400 to-purple-400 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Novo Agendamento</h2>
                  <button onClick={() => setShowScheduleForm(false)} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={scheduleForm.clienteId}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, clienteId: e.target.value })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="">Selecione um cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serviço <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={scheduleForm.servicoId}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, servicoId: e.target.value })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.duration} - {service.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profissional
                  </label>
                  <select
                    value={scheduleForm.profissional}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, profissional: e.target.value })}
                    className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    {settings.profissionais.map((prof, index) => (
                      <option key={index} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={scheduleForm.data}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, data: e.target.value })}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={scheduleForm.hora}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, hora: e.target.value })}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowScheduleForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveSchedule}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Render Settings Screen
  const renderSettings = () => (
    <>
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-light text-gray-800 tracking-wide">Configurações</h1>
          <p className="text-sm text-gray-500 mt-1">Personalize seu aplicativo</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl space-y-6">
          {/* Salon Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="text-rose-500" size={24} />
              Informações do Salão
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Nome</label>
                <p className="font-medium text-gray-800">{settings.informacoesSalao.nome}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Endereço</label>
                <p className="font-medium text-gray-800">{settings.informacoesSalao.endereco}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Telefone</label>
                <p className="font-medium text-gray-800">{settings.informacoesSalao.telefone}</p>
              </div>
            </div>
          </div>

          {/* Professionals */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-rose-500" size={24} />
              Profissionais
            </h2>
            <div className="flex flex-wrap gap-2">
              {settings.profissionais.map((prof, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 rounded-full font-medium">
                  {prof}
                </span>
              ))}
              <button className="px-4 py-2 border-2 border-dashed border-rose-300 text-rose-500 rounded-full hover:bg-rose-50 transition-colors font-medium">
                + Adicionar
              </button>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-rose-500" size={24} />
              Horários de Atendimento
            </h2>
            <div className="space-y-2">
              {Object.entries(settings.horariosAtendimento).map(([dia, horarios]) => (
                <div key={dia} className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-700 capitalize">{dia}</span>
                  <span className="text-gray-600">{horarios[0]} - {horarios[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="text-rose-500" size={24} />
              Preferências
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bell className="text-gray-500" size={20} />
                  <span className="text-gray-700">Notificações</span>
                </div>
                <button className={`w-12 h-6 rounded-full transition-colors ${settings.notificacoes ? 'bg-rose-400' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${settings.notificacoes ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Palette className="text-gray-500" size={20} />
                  <span className="text-gray-700">Tema</span>
                </div>
                <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium capitalize">
                  {settings.tema}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render Reports Screen (placeholder)
  const renderReports = () => {
    const revenueData = calculateRevenueReport();
    const servicesData = calculateServicesReport();
    
    return (
      <>
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-light text-gray-800 tracking-wide">Relatórios</h1>
            <p className="text-sm text-gray-500 mt-1">Análise de desempenho e vendas</p>
            
            {/* Report Type Tabs */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setReportType('revenue')}
                className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all ${
                  reportType === 'revenue'
                    ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-lg'
                    : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-300'
                }`}
              >
                <DollarSign className="inline mr-2" size={20} />
                Conferência de Valor
              </button>
              <button
                onClick={() => setReportType('services')}
                className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all ${
                  reportType === 'services'
                    ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-lg'
                    : 'bg-white border-2 border-rose-200 text-gray-700 hover:border-rose-300'
                }`}
              >
                <TrendingUp className="inline mr-2" size={20} />
                Serviços Prestados
              </button>
            </div>

            {/* Filters */}
            <div className="mt-6 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="text-rose-600" size={20} />
                <h3 className="font-semibold text-gray-800">Filtros</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
                  <input
                    type="date"
                    value={reportFilters.dataInicio}
                    onChange={(e) => setReportFilters({ ...reportFilters, dataInicio: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Fim</label>
                  <input
                    type="date"
                    value={reportFilters.dataFim}
                    onChange={(e) => setReportFilters({ ...reportFilters, dataFim: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profissional</label>
                  <select
                    value={reportFilters.profissional}
                    onChange={(e) => setReportFilters({ ...reportFilters, profissional: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="">Todos</option>
                    {settings.profissionais.map((prof, index) => (
                      <option key={index} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                  <select
                    value={reportFilters.servico}
                    onChange={(e) => setReportFilters({ ...reportFilters, servico: e.target.value })}
                    className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <option value="">Todos</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Export Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleExportReport('excel')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Download size={16} />
                  Exportar Excel
                </button>
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Download size={16} />
                  Exportar PDF
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {reportType === 'revenue' ? (
            <div className="max-w-7xl space-y-6">
              {/* Revenue KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Faturado</p>
                      <p className="text-3xl font-bold text-rose-600">
                        R$ {revenueData.totalFaturado.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <DollarSign className="text-rose-500" size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total de Atendimentos</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {revenueData.totalAtendimentos}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <Calendar className="text-purple-500" size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
                      <p className="text-3xl font-bold text-green-600">
                        R$ {revenueData.ticketMedio.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <TrendingUp className="text-green-500" size={32} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Services by Revenue */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Serviços Mais Rentáveis</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData.topServicos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="servico" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                      <Bar dataKey="valor" fill="#fb7185" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Professionals by Revenue */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Profissionais - Faturamento</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData.topProfissionais}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="profissional" />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                      <Bar dataKey="valor" fill="#a78bfa" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ranking de Serviços</h3>
                  <div className="space-y-3">
                    {revenueData.topServicos.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                        <span className="font-medium text-gray-800">{index + 1}. {item.servico}</span>
                        <span className="font-bold text-rose-600">R$ {item.valor.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Ranking de Profissionais</h3>
                  <div className="space-y-3">
                    {revenueData.topProfissionais.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium text-gray-800">{index + 1}. {item.profissional}</span>
                        <span className="font-bold text-purple-600">R$ {item.valor.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl space-y-6">
              {/* Services KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total de Atendimentos</p>
                      <p className="text-3xl font-bold text-rose-600">
                        {servicesData.totalAtendimentos}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <Scissors className="text-rose-500" size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Serviço Mais Realizado</p>
                      <p className="text-xl font-bold text-purple-600">
                        {servicesData.servicoMaisRealizado?.servico || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {servicesData.servicoMaisRealizado?.percentual || 0}% do total
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <TrendingUp className="text-purple-500" size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Profissional Mais Ativo</p>
                      <p className="text-xl font-bold text-green-600">
                        {servicesData.profissionalMaisAtivo?.profissional || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {servicesData.profissionalMaisAtivo?.totalAtendimentos || 0} atendimentos
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-full p-4">
                      <Users className="text-green-500" size={32} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Services Distribution */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Serviços</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={servicesData.servicosData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {servicesData.servicosData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Busiest Days */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Dias Mais Movimentados</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={servicesData.diasMaisMovimentados}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dia" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="atendimentos" fill="#fbbf24" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Serviços Realizados</h3>
                  <div className="space-y-3">
                    {servicesData.servicosData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="font-bold text-rose-600">{item.value} ({item.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Clientes Recorrentes</h3>
                  <div className="space-y-3">
                    {servicesData.clientesRecorrentes.length > 0 ? (
                      servicesData.clientesRecorrentes.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium text-gray-800">{item.cliente}</span>
                          <span className="font-bold text-purple-600">{item.vezes}x</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Nenhum cliente recorrente no período</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 max-w-7xl mx-auto relative overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute -right-3 top-8 bg-rose-400 text-white rounded-full p-2 shadow-lg hover:bg-rose-500 transition-colors">
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="p-6 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-rose-400 to-purple-400 rounded-full p-3">
              <Scissors className="text-white" size={24} />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Beauty</h2>
                <p className="text-xs text-gray-500">Salão & Estética</p>
              </div>
            )}
          </div>
        </div>

        <nav className="py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (!sidebarOpen) setSidebarOpen(true);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-100 to-purple-100 text-rose-600 border-r-4 border-rose-400'
                    : 'text-gray-600 hover:bg-rose-50'
                }`}
              >
                <Icon size={24} className={isActive ? 'text-rose-500' : ''} />
                {sidebarOpen && (
                  <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {activeTab === 'services' && renderServices()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'report' && renderReports()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-20 z-20 md:hidden" />
      )}
    </div>
  );
}