import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, ArrowLeft, Paperclip, Image, Smile, MoreVertical, Search, Check, CheckCheck, Phone, Video, X } from 'lucide-react';

export default function ChatSystem() {
  const [screen, setScreen] = useState('list'); // list, chat
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      nome: 'Beauty Salon & Estética',
      tipo: 'salao',
      foto: null,
      ultimaMensagem: 'Obrigado por agendar conosco!',
      timestamp: new Date(Date.now() - 300000),
      naoLidas: 2,
      online: true,
      mensagens: [
        { id: 1, texto: 'Olá! Gostaria de agendar um horário', enviado: true, timestamp: new Date(Date.now() - 3600000), lida: true },
        { id: 2, texto: 'Olá! Claro, temos horários disponíveis. Qual serviço deseja?', enviado: false, timestamp: new Date(Date.now() - 3500000), lida: true },
        { id: 3, texto: 'Corte feminino', enviado: true, timestamp: new Date(Date.now() - 3400000), lida: true },
        { id: 4, texto: 'Perfeito! Temos disponibilidade amanhã às 14h. Pode ser?', enviado: false, timestamp: new Date(Date.now() - 3300000), lida: true },
        { id: 5, texto: 'Sim, perfeito!', enviado: true, timestamp: new Date(Date.now() - 3200000), lida: true },
        { id: 6, texto: 'Agendamento confirmado para amanhã às 14h!', enviado: false, timestamp: new Date(Date.now() - 600000), lida: false },
        { id: 7, texto: 'Obrigado por agendar conosco!', enviado: false, timestamp: new Date(Date.now() - 300000), lida: false }
      ]
    },
    {
      id: 2,
      nome: 'Glamour Hair Studio',
      tipo: 'salao',
      foto: null,
      ultimaMensagem: 'Até logo!',
      timestamp: new Date(Date.now() - 86400000),
      naoLidas: 0,
      online: false,
      mensagens: [
        { id: 8, texto: 'Bom dia! Qual o valor do corte masculino?', enviado: true, timestamp: new Date(Date.now() - 90000000), lida: true },
        { id: 9, texto: 'Bom dia! O corte masculino custa R$ 45,00', enviado: false, timestamp: new Date(Date.now() - 89900000), lida: true },
        { id: 10, texto: 'Obrigado!', enviado: true, timestamp: new Date(Date.now() - 89800000), lida: true },
        { id: 11, texto: 'Até logo!', enviado: false, timestamp: new Date(Date.now() - 86400000), lida: true }
      ]
    },
    {
      id: 3,
      nome: 'Nails & Beauty',
      tipo: 'salao',
      foto: null,
      ultimaMensagem: 'Vocês fazem unhas de gel?',
      timestamp: new Date(Date.now() - 172800000),
      naoLidas: 0,
      online: false,
      mensagens: [
        { id: 12, texto: 'Vocês fazem unhas de gel?', enviado: true, timestamp: new Date(Date.now() - 172800000), lida: true }
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.mensagens]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      texto: message,
      enviado: true,
      timestamp: new Date(),
      lida: false
    };

    setChats(chats.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          mensagens: [...chat.mensagens, newMessage],
          ultimaMensagem: message,
          timestamp: new Date()
        };
      }
      return chat;
    }));

    setSelectedChat({
      ...selectedChat,
      mensagens: [...selectedChat.mensagens, newMessage]
    });

    setMessage('');

    // Simular resposta automática após 2 segundos
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        texto: 'Obrigado pela mensagem! Em breve responderemos.',
        enviado: false,
        timestamp: new Date(),
        lida: false
      };

      setChats(chats.map(chat => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            mensagens: [...chat.mensagens, newMessage, autoReply],
            ultimaMensagem: autoReply.texto,
            timestamp: new Date(),
            naoLidas: chat.naoLidas + 1
          };
        }
        return chat;
      }));

      setSelectedChat(prev => ({
        ...prev,
        mensagens: [...prev.mensagens, autoReply]
      }));
    }, 2000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / 86400000);

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const markAsRead = (chatId) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          naoLidas: 0,
          mensagens: chat.mensagens.map(msg => ({ ...msg, lida: true }))
        };
      }
      return chat;
    }));
  };

  const getFilteredChats = () => {
    if (!searchTerm) return chats;
    return chats.filter(chat => 
      chat.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderChatList = () => {
    const filtered = getFilteredChats();

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <header className="bg-white shadow-sm border-b border-rose-100 sticky top-0 z-20">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-rose-400 to-purple-400 rounded-full p-2">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Conversas</h1>
              </div>
              <div className="bg-rose-100 text-rose-600 rounded-full px-3 py-1 text-sm font-semibold">
                {chats.reduce((acc, chat) => acc + chat.naoLidas, 0)} novas
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
          </div>
        </header>

        <div className="p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">Nenhuma conversa encontrada</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat);
                    markAsRead(chat.id);
                    setScreen('chat');
                  }}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-rose-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {chat.nome.charAt(0)}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">{chat.nome}</h3>
                        <span className="text-xs text-gray-500">{formatDate(chat.timestamp)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate flex-1">{chat.ultimaMensagem}</p>
                        {chat.naoLidas > 0 && (
                          <span className="ml-2 bg-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.naoLidas}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChat = () => {
    if (!selectedChat) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setScreen('list')}
                  className="p-2 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <ArrowLeft className="text-gray-700" size={24} />
                </button>

                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedChat.nome.charAt(0)}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">{selectedChat.nome}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                  <Phone className="text-gray-600" size={20} />
                </button>
                <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                  <Video className="text-gray-600" size={20} />
                </button>
                <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                  <MoreVertical className="text-gray-600" size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat.mensagens.map((msg, index) => {
            const showDate = index === 0 || 
              new Date(msg.timestamp).toDateString() !== new Date(selectedChat.mensagens[index - 1].timestamp).toDateString();

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="bg-white px-4 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                      {formatDate(msg.timestamp)}
                    </span>
                  </div>
                )}

                <div className={`flex ${msg.enviado ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.enviado
                        ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white'
                        : 'bg-white text-gray-800 shadow-sm border border-rose-100'
                    }`}
                  >
                    <p className="text-sm break-words">{msg.texto}</p>
                    <div className={`flex items-center gap-1 mt-1 ${msg.enviado ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-xs ${msg.enviado ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                      {msg.enviado && (
                        msg.lida ? (
                          <CheckCheck size={14} className="text-white" />
                        ) : (
                          <Check size={14} className="text-white text-opacity-80" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-rose-100 p-4">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
              <Paperclip className="text-gray-600" size={20} />
            </button>
            <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
              <Image className="text-gray-600" size={20} />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <button className="p-2 hover:bg-rose-50 rounded-full transition-colors">
              <Smile className="text-gray-600" size={20} />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-3 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return screen === 'list' ? renderChatList() : renderChat();
}