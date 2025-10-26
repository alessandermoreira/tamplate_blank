-- Tabela de relacionamento entre Users e Products
-- Permite vincular múltiplos produtos/sistemas a cada usuário

CREATE TABLE Users_Products (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    -- Foreign keys
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,

    -- Evita duplicação: um usuário não pode ter o mesmo produto vinculado mais de uma vez
    CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- Índices para melhor performance nas consultas
CREATE INDEX idx_users_products_user_id ON Users_Products(user_id);
CREATE INDEX idx_users_products_product_id ON Users_Products(product_id);
