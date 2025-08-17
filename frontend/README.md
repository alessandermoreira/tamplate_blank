# Dashboard - Sistema de Manutenção

Este é um projeto React que implementa um dashboard para sistema de manutenção de veículos municipais, baseado no design fornecido.

## Características Implementadas

### 🎨 Interface
- **Header**: Título do dashboard, botão "Novo Checklist", notificação com badge e informações do usuário
- **Cards de Estatísticas**: 4 cards principais mostrando:
  - Veículos (42) - com ícone de caminhão azul
  - Checklists (128) - com ícone de checklist verde
  - Pendentes (8) - com ícone de relógio amarelo
  - Atrasados (5) - com ícone de alerta vermelho

### 📊 Componentes Principais
- **Tabela de Checklists Pendentes**: Lista veículos com informações de placa, setor, datas e status
- **Calendário de Manutenções**: Visualização mensal (Julho 2023) com grid de dias
- **Sistema de Status**: Badges coloridos para "Pendente" e "Atrasado"
- **Botões de Ação**: "Realizar" para pendentes e "Urgente" para atrasados

### 🚗 Página de Cadastro de Veículos
- **Formulário Completo**: Cadastro detalhado de veículos com validação
- **Seções Organizadas**:
  - **Informações Básicas**: Tipo, marca, modelo, ano, placa, cor
  - **Documentação**: Chassi, RENAVAM, combustível
  - **Informações Operacionais**: Setor, responsável, quilometragem, próxima manutenção
  - **Observações**: Campo de texto livre para informações adicionais
- **Validação de Dados**: Campos obrigatórios, formato de placa, validação de ano
- **Navegação**: Botões para voltar ao dashboard ou salvar o veículo

### 🛠️ Tecnologias Utilizadas
- **React 18** - Framework principal
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Vite** - Build tool

### 📱 Responsividade
- Layout adaptativo para desktop, tablet e mobile
- Grid responsivo para os cards de estatísticas
- Tabela com scroll horizontal em telas menores
- Formulário de cadastro responsivo com grid adaptativo

## Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação e Execução
```bash
# Navegar para o diretório do projeto
cd dashboard-app

# Instalar dependências (já instaladas)
pnpm install

# Executar em modo desenvolvimento
pnpm run dev

# Ou para acesso externo
pnpm run dev -- --host
```

### Build para Produção
```bash
# Gerar build otimizado
pnpm run build

# Visualizar build localmente
pnpm run preview
```

## Estrutura do Projeto

```
dashboard-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── VehicleRegistration.jsx  # Página de cadastro de veículos
│   ├── App.jsx              # Componente principal com navegação
│   ├── App.css              # Estilos globais
│   └── main.jsx             # Ponto de entrada
├── package.json
└── vite.config.js
```

## Funcionalidades Implementadas

✅ **Header com navegação**
✅ **Cards de estatísticas com ícones coloridos**
✅ **Tabela de checklists pendentes**
✅ **Calendário de manutenções**
✅ **Sistema de badges para status**
✅ **Botões de ação contextuais**
✅ **Design responsivo**
✅ **Cores e layout fiéis ao design original**
✅ **Página de cadastro de veículos completa**
✅ **Navegação entre páginas**
✅ **Formulário com validação**
✅ **Campos organizados em seções**

## Navegação

### Dashboard Principal
- Acesso via URL raiz ou botão "Voltar" da página de cadastro
- Botão "Novo Veículo" no header para acessar o cadastro

### Página de Cadastro de Veículos
- Acesso via botão "Novo Veículo" no dashboard
- Formulário organizado em 4 seções principais
- Validação em tempo real dos campos obrigatórios
- Botões "Cancelar" e "Salvar Veículo"

## Campos do Formulário de Cadastro

### Informações Básicas (Obrigatórias*)
- Tipo de Veículo* (Caminhão, Van, Ônibus, Carro, Motocicleta, Trator, Outros)
- Marca*
- Modelo*
- Ano*
- Placa* (formato ABC-1234)
- Cor

### Documentação
- Chassi (17 dígitos)
- RENAVAM
- Combustível (Gasolina, Etanol, Flex, Diesel, GNV, Elétrico, Híbrido)

### Informações Operacionais (Obrigatórias*)
- Setor* (Limpeza Urbana, Educação, Saúde, Obras, Transporte, Agricultura, Administração)
- Responsável*
- Quilometragem Atual
- Próxima Manutenção (data)

### Observações
- Campo de texto livre para informações adicionais

## Próximos Passos (Sugestões)

- [ ] Implementar persistência de dados (localStorage ou API)
- [ ] Adicionar listagem de veículos cadastrados
- [ ] Implementar edição de veículos existentes
- [ ] Conectar com API backend
- [ ] Implementar filtros e busca na listagem
- [ ] Adicionar upload de imagens dos veículos
- [ ] Implementar notificações funcionais
- [ ] Adicionar relatórios e estatísticas

## Deployment

O projeto está pronto para deploy em qualquer plataforma que suporte aplicações React estáticas (Vercel, Netlify, etc.).

