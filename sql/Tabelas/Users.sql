DROP TABLE IF EXISTS Users;

-- Cria a tabela "Users"
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,                  -- Identificador único e auto-incrementado
    cep VARCHAR(8) NOT NULL,                -- CEP no formato texto de 8 caracteres (ex.: 12345678)
    cidade VARCHAR(100) NOT NULL,           -- Nome da cidade
    senha VARCHAR(255) NOT NULL,            -- Senha criptografada
    cpf VARCHAR(14) UNIQUE NOT NULL,        -- CPF (11 caracteres) ou CNPJ (14 caracteres) sem formatação
    email VARCHAR(100) UNIQUE NOT NULL,     -- Email único e obrigatório
    endereco TEXT NOT NULL,                 -- Campo para o endereço completo
    nivelAcesso VARCHAR(20) NOT NULL,       -- Nível de acesso do usuário (ex.: 1 = Admin, 2 = Usuário)
    nome VARCHAR(100) NOT NULL,             -- Nome completo do usuário
    observacoes TEXT,                       -- Campo para observações adicionais (opcional)
    setor VARCHAR(100),                     -- Nome do setor (departamento)
    cargo VARCHAR(100),                     -- Cargo do usuário
    telefone VARCHAR(15),                   -- Telefone do usuário (ex.: (11) 98765-4321)
    criado_em TIMESTAMP DEFAULT NOW(),       -- Data/hora de criação do registro (padrão: momento atual)
    blocked BOOLEAN DEFAULT FALSE -- Indica se o usuário está bloqueado (padrão: FALSE)
);