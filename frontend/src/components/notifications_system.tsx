import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Clock, Calendar, MessageCircle, Star, Gift, AlertCircle, ChevronRight, Trash2, Settings } from 'lucide-react';

export default function NotificationsSystem() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [notificationSettings, setNotificationSettings] = useState({
    agendamentos: true,
    lembretes: true,
    promocoes: true,
    mensagens: true,
    avaliacoes: true
  });

  useEffect(() => {
    const unread = notifications.filter(n => !n.lida).length;
    setUnreadCount(unread);
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      lida: false,
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, lida: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    if (filter === 'unread') return notifications.filter(n => !n.lida);
    if (filter === 'read') return notifications.filter(n => n.lida);
    return notifications;
  };

  const getNotificationIcon = (tipo) => {
    switch (tipo) {
      case 'agendamento':
        return <Calendar className="text-blue-500" size={20} />;
      case 'lembrete':
        return <Clock className="text-orange-500" size={20} />;
      case 'mensagem':
        return <MessageCircle className="text-green-500" size={20} />;
      case 'avaliacao':
        return <Star className="text-yellow-500" size={20} />;
      case 'promocao':
        return <Gift className="text-purple-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  // Simulação de notificações (remover em produção)
  const simulateNotifications = () => {
    const tipos = [
      {
        tipo: 'agendamento',
        titulo: 'Novo Agendamento',
        mensagem: 'Maria Silva agendou Corte Feminino para amanhã às 14h',
        acao: 'Ver detalhes'
      },
      {
        tipo: 'lembrete',
        titulo: 'Lembrete de Agendamento',
        mensagem: 'Você tem um agendamento em 1 hora com Ana Paula',
        acao: 'Ver agendamento'
      },
      {
        tipo: 'mensagem',
        titulo: 'Nova Mensagem',
        mensagem: 'Beauty Salon respondeu sua dúvida',
        acao: 'Abrir chat'
      },
      {
        tipo: 'avaliacao',
        titulo: 'Avalie seu Atendimento',
        mensagem: 'Como foi sua experiência no Beauty Salon?',
        acao: 'Avaliar agora'
      },
      {
        tipo: 'promocao',
        titulo: 'Promoção Especial',
        mensagem: '20% OFF em todos os serviços até sexta-feira!',
        acao: 'Aproveitar'
      }
    ];

    const random = tipos[Math.floor(Math.random() * tipos.length)];
    addNotification(random);
  };

  const NotificationBadge = () => (
    <button
      onClick={() => setShowNotifications(!showNotifications)}
      className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <Bell className="text-gray-700" size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-rose-100 rounded-2xl mb-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sistema de Notificações</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie suas notificações</p>
          </div>
          <NotificationBadge />
        </div>
      </header>

      {/* Simulação de Notificações (Demo) */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100 mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Demo - Simular Notificações</h3>
        <button
          onClick={simulateNotifications}
          className="px-6 py-3 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          Gerar Notificação Aleatória
        </button>
      </div>

      {/* Painel de Notificações */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            {/* Header do Painel */}
            <div className="sticky top-0 bg-gradient-to-r from-rose-400 to-purple-400 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Notificações</h2>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filtros */}
              <div className="flex gap-2">
                {['all', 'unread', 'read'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === f
                        ? 'bg-white text-rose-600'
                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                    }`}
                  >
                    {f === 'all' ? 'Todas' : f === 'unread' ? 'Não lidas' : 'Lidas'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ações Rápidas */}
            {notifications.length > 0 && (
              <div className="p-4 bg-rose-50 border-b border-rose-100 flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="flex-1 px-4 py-2 bg-white text-rose-600 rounded-lg font-medium hover:bg-rose-100 transition-colors text-sm"
                >
                  <Check size={16} className="inline mr-2" />
                  Marcar todas como lidas
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
                >
                  <Trash2 size={16} className="inline mr-2" />
                  Limpar todas
                </button>
              </div>
            )}

            {/* Lista de Notificações */}
            <div className="max-h-96 overflow-y-auto">
              {getFilteredNotifications().length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">Nenhuma notificação</p>
                  <p className="text-gray-400 text-sm mt-2">
                    {filter === 'unread' ? 'Você está em dia!' : 'Suas notificações aparecerão aqui'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-rose-100">
                  {getFilteredNotifications().map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-rose-50 transition-colors ${
                        !notif.lida ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notif.tipo)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800">
                              {notif.titulo}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatTimestamp(notif.timestamp)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-2">
                            {notif.mensagem}
                          </p>

                          <div className="flex items-center gap-2">
                            {notif.acao && (
                              <button className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1">
                                {notif.acao}
                                <ChevronRight size={14} />
                              </button>
                            )}

                            {!notif.lida && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                              >
                                <Check size={14} />
                                Marcar como lida
                              </button>
                            )}

                            <button
                              onClick={() => deleteNotification(notif.id)}
                              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 ml-auto"
                            >
                              <Trash2 size={14} />
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Configurações de Notificações */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-rose-500" size={24} />
          <h3 className="text-xl font-semibold text-gray-800">Configurações de Notificações</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800 capitalize">
                  {key === 'agendamentos' && 'Agendamentos'}
                  {key === 'lembretes' && 'Lembretes'}
                  {key === 'promocoes' && 'Promoções'}
                  {key === 'mensagens' && 'Mensagens'}
                  {key === 'avaliacoes' && 'Avaliações'}
                </p>
                <p className="text-sm text-gray-600">
                  Receber notificações sobre {key}
                </p>
              </div>
              <button
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  [key]: !value
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-rose-400' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info sobre Push Notifications */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-4">
        <div className="flex gap-4">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Sobre as Notificações Push
            </h4>
            <p className="text-sm text-blue-800 mb-3">
              Este sistema gerencia notificações in-app. Para implementar Push Notifications reais, você precisará:
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Firebase Cloud Messaging (FCM) para Android e iOS</li>
              <li>OneSignal ou similar para gestão multiplataforma</li>
              <li>Service Workers para notificações web</li>
              <li>Permissões do usuário para receber notificações</li>
              <li>Backend para enviar notificações programadas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}