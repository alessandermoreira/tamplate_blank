-- Migração para permitir CPF ou CNPJ na tabela Users
-- Altera o campo cpf de VARCHAR(11) para VARCHAR(14) para suportar CNPJ

ALTER TABLE Users
ALTER COLUMN cpf TYPE VARCHAR(14);

-- Adiciona comentário explicativo no campo
COMMENT ON COLUMN Users.cpf IS 'CPF (11 caracteres) ou CNPJ (14 caracteres) sem formatação';
