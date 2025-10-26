import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Edit } from "lucide-react";
import { Plus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
const VITE_URL_SERVER = import.meta.env.VITE_URL_SERVER;

const ProductsList = ({ onNavigate, setProductEdit }) => {
  const { getToken, hasPermission } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${VITE_URL_SERVER}/products`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Carregando produtos...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );

  // Filter products by name, category, description
  const filteredProducts = products.filter((product) => {
    const search = filter.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });

  const handleEditProduct = (product) => {
    setProductEdit(product);
    onNavigate("product-registration");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CardContent>
          <br />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sistemas</h1>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Filtrar por nome, categoria..."
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button
              style={{ float: "right", right: "10px", cursor: "pointer" }}
              onClick={() => onNavigate("product-registration")}
            >
              Novo
              <Plus className="ml-2 inline-block" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">{product.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">R$ {product.price}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{product.stock}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{product.description}</td>
                      {hasPermission("administrador") && (
                        <td className="px-4 py-2 text-center">
                          <a
                            className="text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit />
                          </a>
                        </td>
                      )}
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

export default ProductsList;
