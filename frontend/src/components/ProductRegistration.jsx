import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
const VITE_URL_SERVER = import.meta.env.VITE_URL_SERVER;

const ProductRegistration = ({ onNavigate, productEdit }) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState(productEdit || {});
  const { getToken } = useAuth();
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.category) newErrors.category = "Categoria é obrigatória";
    if (!formData.price || isNaN(formData.price)) newErrors.price = "Preço válido é obrigatório";
    if (formData.stock === "" || isNaN(formData.stock)) newErrors.stock = "Estoque válido é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.id) {
        // Editar produto existente
        axios.put(`${VITE_URL_SERVER}/products/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then(() => {
          showSuccess("Produto atualizado com sucesso!");
          onNavigate("products-list");
        })
        .catch((error) => {
          showError("Erro ao atualizar produto: " + error.message);
        });
      } else {
        // Cadastrar novo produto
        axios.post(`${VITE_URL_SERVER}/products`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then(() => {
          showSuccess("Produto cadastrado com sucesso!");
          onNavigate("products-list");
        })
        .catch((error) => {
          showError("Erro ao cadastrar produto: " + error.message);
        });
      }
    } else {
      showError("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Produto</h1>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nome do produto"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="Categoria do produto"
                  className={errors.category ? "border-red-500" : ""}
                />
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Preço do produto"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="Quantidade em estoque"
                  className={errors.stock ? "border-red-500" : ""}
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descrição do produto (opcional)"
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={() => onNavigate("products-list")}>Cancelar</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Salvar Produto</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductRegistration;
