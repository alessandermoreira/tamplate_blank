import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Filter, X, ChevronRight, Calendar, User, Phone, Mail, ArrowLeft, Scissors, Heart, Award, CheckCircle, Home, List } from 'lucide-react';

export default function MarketplaceClientApp() {
  const [screen, setScreen] = useState('home');
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [userLocation, setUserLocation] = useState(null);
  const [salons, setSalons] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  
  const [filters, setFilters] = useState({
    maxDistance: 10,
    minRating: 0,
    priceRange: 'all'
  });

  const [bookingForm, setBookingForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    observacoes: ''
  });

  useEffect(() => {
    setUserLocation({ latitude: -19.9167, longitude: -43.9345, city: 'Belo Horizonte' });
  }, []);

  const getFilteredSalons = () => {
    return salons.filter(salon => {
      if (searchTerm && !salon.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (salon.distancia > filters.maxDistance) return false;
      if (salon.avaliacao < filters.minRating) return false;
      if (filters.priceRange !== 'all' && salon.faixaPreco !== filters.priceRange) return false;
      return true;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleConfirmBooking = () => {
    if (!bookingForm.nome || !bookingForm.telefone || !selectedDate || !selectedTime) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const newBooking = {
      id: Date.now(),
      salaoNome: selectedSalon.nome,
      servico: selectedService.nome,
      profissional: selectedProfessional?.nome || 'A definir',
      data: selectedDate,
      hora: selectedTime,
      preco: selectedService.preco
    };
    setMyBookings([...myBookings, newBooking]);
    alert('Agendamento confirmado!');
    setScreen('my-bookings');
  };

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-rose-100 shadow-lg z-30">
      <div className="flex justify-around py-3">
        <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 ${screen === 'home' ? 'text-rose-600' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-xs">Início</span>
        </button>
        <button onClick={() => setScreen('my-bookings')} className={`flex flex-col items-center gap-1 ${screen === 'my-bookings' ? 'text-rose-600' : 'text-gray-400'}`}>
          <Calendar size={24} />
          <span className="text-xs">Agendamentos</span>
        </button>
        <button onClick={() => setScreen('favorites')} className={`flex flex-col items-center gap-1 ${screen === 'favorites' ? 'text-rose-600' : 'text-gray-400'}`}>
          <Heart size={24} />
          <span className="text-xs">Favoritos</span>
        </button>
        <button onClick={() => setScreen('profile')} className={`flex flex-col items-center gap-1 ${screen === 'profile' ? 'text-rose-600' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </nav>
  );

  if (screen === 'home') {
    const filtered = getFilteredSalons();
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
        <header className="bg-white shadow-sm border-b border-rose-100 sticky top-0 z-20">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-rose-400 to-purple-400 rounded-full p-2">
                  <Scissors className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Beauty Marketplace</h1>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin size={12} />
                    <span>{userLocation?.city}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar salões ou serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>

            <button onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 rounded-lg font-medium">
              <Filter size={18} />
              Filtros
            </button>
          </div>
        </header>

        {showFilters && (
          <div className="bg-white border-b border-rose-100 p-4 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distância: {filters.maxDistance} km</label>
                <input type="range" min="1" max="20" value={filters.maxDistance} onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação mínima</label>
                <select value={filters.minRating} onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})} className="w-full px-4 py-2 border border-rose-200 rounded-lg">
                  <option value="0">Todas</option>
                  <option value="4">4.0+</option>
                  <option value="4.5">4.5+</option>
                </select>
              </div>
              <div className="flex gap-2">
                {['all', '$', '$$', '$$$'].map(p => (
                  <button key={p} onClick={() => setFilters({...filters, priceRange: p})} className={`flex-1 py-2 rounded-lg ${filters.priceRange === p ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white' : 'bg-gray-100'}`}>
                    {p === 'all' ? 'Todos' : p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{filtered.length} salões próximos</h2>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Scissors className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500">Nenhum salão encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(salon => (
                <div key={salon.id} onClick={() => { setSelectedSalon(salon); setScreen('salon-detail'); }} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-rose-100">
                  <div className="relative h-40 bg-gradient-to-br from-rose-200 to-purple-200">
                    {salon.destaque && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        <Award size={14} className="inline mr-1" />
                        Destaque
                      </div>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(salon.id); }} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
                      <Heart size={20} className={favorites.includes(salon.id) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{salon.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={14} />
                      <span>{salon.distancia} km • {salon.faixaPreco}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold">{salon.avaliacao}</span>
                      <span className="text-gray-500 text-sm">({salon.totalAvaliacoes})</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-green-600" />
                        <span className="text-green-700 font-medium">{salon.proximoHorario}</span>
                      </div>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  if (screen === 'salon-detail' && selectedSalon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-4 py-4 flex items-center gap-3">
            <button onClick={() => setScreen('home')} className="p-2 hover:bg-rose-50 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold">Detalhes</h1>
          </div>
        </header>

        <div className="p-4">
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 mb-4">
            <div className="h-48 bg-gradient-to-br from-rose-200 to-purple-200"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedSalon.nome}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin size={16} />
                <span className="text-sm">{selectedSalon.endereco}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} />
                  <span className="font-bold">{selectedSalon.avaliacao}</span>
                </div>
                <span className="font-semibold">{selectedSalon.faixaPreco}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <div className="space-y-3">
              {selectedSalon.servicos?.map(srv => (
                <div key={srv.id} className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-semibold">{srv.nome}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <Clock size={14} />
                      <span>{srv.duracao}</span>
                      <span className="font-semibold text-rose-600">{srv.preco}</span>
                    </div>
                  </div>
                  <button onClick={() => { setSelectedService(srv); setScreen('booking'); }} className="px-4 py-2 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-lg font-medium">
                    Agendar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (screen === 'booking' && selectedService && selectedSalon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-4 py-4 flex items-center gap-3">
            <button onClick={() => setScreen('salon-detail')} className="p-2 hover:bg-rose-50 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold">Agendamento</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h3 className="font-semibold mb-4">Resumo</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Salão:</span><span className="font-medium">{selectedSalon.nome}</span></div>
              <div className="flex justify-between"><span>Serviço:</span><span className="font-medium">{selectedService.nome}</span></div>
              <div className="flex justify-between"><span>Valor:</span><span className="font-bold text-rose-600">{selectedService.preco}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h3 className="font-semibold mb-4">Data e Horário</h3>
            <div className="space-y-4">
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-rose-200 rounded-xl" />
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 rounded-lg font-medium ${selectedTime === t ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white' : 'bg-gray-100'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
            <h3 className="font-semibold mb-4">Seus Dados</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Nome *" value={bookingForm.nome} onChange={(e) => setBookingForm({...bookingForm, nome: e.target.value})} className="w-full px-4 py-3 border border-rose-200 rounded-xl" />
              <input type="tel" placeholder="Telefone *" value={bookingForm.telefone} onChange={(e) => setBookingForm({...bookingForm, telefone: e.target.value})} className="w-full px-4 py-3 border border-rose-200 rounded-xl" />
              <input type="email" placeholder="Email" value={bookingForm.email} onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})} className="w-full px-4 py-3 border border-rose-200 rounded-xl" />
            </div>
          </div>

          <button onClick={handleConfirmBooking} className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white rounded-xl font-semibold text-lg">
            Confirmar Agendamento
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (screen === 'my-bookings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
        <header className="bg-white shadow-sm border-b border-rose-100">
          <div className="px-4 py-6">
            <h1 className="text-2xl font-semibold">Meus Agendamentos</h1>
          </div>
        </header>
        <div className="p-4">
          {myBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500">Nenhum agendamento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myBookings.map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
                  <h3 className="font-bold text-lg mb-2">{b.salaoNome}</h3>
                  <p className="text-gray-600 mb-1">{b.servico}</p>
                  <p className="text-sm text-gray-500">{b.data} às {b.hora}</p>
                  <p className="text-rose-600 font-semibold mt-2">{b.preco}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20 flex items-center justify-center">
      <div className="text-center">
        <Scissors className="mx-auto text-rose-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Beauty Marketplace</h2>
        <p className="text-gray-600">Tela em desenvolvimento</p>
      </div>
      <BottomNav />
    </div>
  );
}