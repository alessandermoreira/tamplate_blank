import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Edit } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Button } from "react-day-picker";
import { Bell } from "lucide-react";
import { User } from "lucide-react";
const VITE_URL_SERVER = import.meta.env.VITE_URL_SERVER;

const UsersList = ({onNavigate, setUserEdit}) => {
  const { getToken, hasPermission } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  const formatCpf = (value) => {
    // Remove caracteres não-numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara de CPF: 000.000.000-00
    const formattedValue = numericValue
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço

    return formattedValue;
  };  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${VITE_URL_SERVER}/users`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUsers(response.data.map(u => ({ ...u, senha: "", cpf: formatCpf(u.cpf) }))  );

      } catch (err) {
        setError("Erro ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-600">Carregando usuários...</div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-red-600">{error}</div>
    </div>
  );

  // Filter users by name, email, cpf, setor, cidade, telefone, nivelacesso
  const filteredUsers = users.filter((user) => {
    const search = filter.toLowerCase();
    return (
      user.nome?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.cpf?.toLowerCase().includes(search) ||
      user.setor?.toLowerCase().includes(search) ||
      user.cidade?.toLowerCase().includes(search) ||
      user.telefone?.toLowerCase().includes(search) ||
      user.nivelacesso?.toLowerCase().includes(search)
    );
  });

  // Toggle block/unblock user
  const handleToggleBlock = async (userId, currentBlocked) => {
    try {
      await axios.patch(
        `${VITE_URL_SERVER}/users/${userId}/block`,
        { blocked: !currentBlocked },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, blocked: !currentBlocked } : u
        )
      );
    } catch (err) {
      alert("Erro ao atualizar status do usuário.");
    }
  };

  const handleEditUser = (user) => {
    setUserEdit(user);
    onNavigate("user-registration");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <br/>
            <h1 className="text-2xl font-semibold text-gray-900"> Usuários Registrados</h1>
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
      </header> */}


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <CardContent>
          <br/>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Clientes</h1>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Filtrar por nome, email, setor..."
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <button style={{float: "right", right: "10px", cursor: "pointer"}} onClick={() => onNavigate("user-registration")}>
              Novo
              <UserPlus className="ml-2 inline-block" />
            </button>            
          </div>


          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF/CNPJ</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setor</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nível de Acesso</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                  {/* <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bloqueado</th> */}
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-gray-400">Nenhum usuário encontrado.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.nome}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.cpf}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.setor}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.nivelacesso}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.telefone}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{user.cidade}</td>

                      { hasPermission('administrador') && 
                      <td className="px-4 py-2 text-center">
                        <a                          
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          onClick={() => handleEditUser(user)} 
                        >
                          <Edit ></Edit>
                        </a>
                      </td>
                      }

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </main>

    </div>
  );
};

export default UsersList;
