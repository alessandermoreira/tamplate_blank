DROP TABLE IF EXISTS Products;

-- Cria a tabela "Products"
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,                  -- Identificador único e auto-incrementado
    name VARCHAR(100) NOT NULL,             -- Nome do produto
    category VARCHAR(100) NOT NULL,         -- Categoria do produto
    price NUMERIC(10,2) NOT NULL,           -- Preço do produto
    stock INTEGER NOT NULL DEFAULT 0,       -- Quantidade em estoque
    description TEXT,                       -- Descrição do produto (opcional)
    created_at TIMESTAMP DEFAULT NOW(),     -- Data/hora de criação do registro
    updated_at TIMESTAMP DEFAULT NOW()      -- Data/hora da última atualização
);
