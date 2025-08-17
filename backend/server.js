
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const cors = require('cors');

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// Inicializa o servidor Express
const app = express();
app.use(bodyParser.json()); // Permite interpretar JSON no corpo das requisições
// Configurando o middleware cors com a opção origin
app.use(cors({
  origin: [process.env.dns_origin]
}));

// Configuração da porta
const PORT = 3000;

// Chave secreta usada para assinaturas do JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Banco de usuários em memória (não persistente para este exemplo)
const users = [];

// Rota para editar usuário existente
app.put("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const {
    cep, cidade, cpf, email, endereco, nivelacesso, nome, observacoes, setor, telefone, cargo, blocked, senha, confirmarSenha
  } = req.body;

  const cpf_apenasNumeros = cpf.replaceAll('.','').replaceAll('-','');  
  const cep_apenasNumeros = cep.replaceAll('-','');
  try {
    const result = await pool.query(
      `UPDATE Users SET
        cep = $1,
        cidade = $2,
        cpf = $3,
        email = $4,
        endereco = $5,
        nivelacesso = $6,
        nome = $7,
        observacoes = $8,
        setor = $9,
        telefone = $10,
        cargo = $11,
        blocked = $12
      WHERE id = $13`,
      [
        cep_apenasNumeros,
        cidade,
        cpf_apenasNumeros,
        email,
        endereco,
        nivelacesso,
        nome,
        observacoes,
        setor,
        telefone,
        cargo,
        blocked,
        id
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }else {
      // Se a senha foi alterada, atualiza a senha
      if(senha && senha === confirmarSenha) {
        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);
        await pool.query(
          "UPDATE Users SET senha = $1 WHERE id = $2",
          [hashedPassword, id]
        );
      }
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    res.status(500).json({ message: "Erro ao editar usuário" });
  }
});
// Rota para registrar um novo usuário
app.post("/register", async (req, res) => {
  const { cep, cidade, confirmarSenha, cpf, email, endereco, 
    nivelacesso, nome, observacoes, senha, setor, telefone, cargo, blocked} = req.body;

  const cpf_apenasNumeros = cpf.replaceAll('.','').replaceAll('-','');
  
  // Verifica se o formulário está completo
  if (!nome || !senha) {
    return res.status(400).json({ message: "É necessário informar username e password" });
  }

  const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
  if (result.rows.length > 0) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const result2 = await pool.query("SELECT * FROM Users WHERE cpf = $1", [cpf_apenasNumeros]);
  if (result2.rows.length > 0) {
    return res.status(400).json({ message: "CPF já cadastrado" });
  }  

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(senha, 10);
  const salvo = await pool.query(`INSERT INTO Users (cep, cidade, cpf, email, endereco, 
    nivelacesso, nome, observacoes, senha, setor, telefone, cargo, blocked) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [cep.replaceAll('-',''), cidade, cpf_apenasNumeros, email, endereco, 
    nivelacesso, nome, observacoes, hashedPassword, setor, telefone, cargo, blocked]
  ).catch((error) => {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ message: error.message });
  });

  if (salvo.rowCount === 0) {
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }else { 
    res.status(201).json({ message: "Usuário registrado com sucesso!" }); 
  }
});

// Rota para login do usuário
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o formulário está completo
  if (!email || !senha) {
    return res.status(400).json({ message: "É necessário informar email e senha" });
  }

  if(email == "admin@admin" && senha == process.env.SENHA_MASTER) {
    // Gera um token JWT para o usuário admin
    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token: token, message: "Login realizado com sucesso!", user: { email: email, nivelacesso: "administrador" } });
  }

  try {
    const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
    // return res.json(result.rows); 
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isBlocked = result.rows[0].blocked;
    if (isBlocked) {
      return res.status(401).json({ message: "Usuário bloqueado!" });
    }

    const isPasswordValid = await bcrypt.compare(senha, result.rows[0].senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Gera um token JWT
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token:token, message: "Login realizado com sucesso!", user:result.rows[0] });    
    
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).send("Erro no servidor.");
  }

  // Verifica se o usuário existe
  // const user = users.find(user => user.username === username);
  // if (!user) {
  //   return res.status(400).json({ message: "Usuário não encontrado!" });
  // }

  // Verifica se a senha está correta
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   return res.status(401).json({ message: "Senha incorreta!" });
  // }

  // Gera um token JWT
  // const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  // res.status(200).json({ message: "Login realizado com sucesso!", token });
});

// Rota para bloquear/desbloquear usuário
app.patch("/users/:id/block", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { blocked } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Users SET blocked = $1 WHERE id = $2 RETURNING id, blocked",
      [blocked, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao bloquear/desbloquear usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar status do usuário" });
  }
});

// verifica token JWT
app.post("/verify", async (req, res) => {
  const { token } = req.body;

  // Verifica se o formulário está completo
  if (!token) {
    return res.status(400).json({ message: "É necessário informar o token" });
  }


  // Valida o token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado!" });
    } else {
      return res.status(200).json({ message: "Token é valido!" , success: true });
    }
  });  

});

// Middleware para verificar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi fornecido no cabeçalho
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  const token = authHeader.split(" ")[1];

  // Valida o token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado!" });
    }
    req.user = user;
    next();
  });
}

// Rota protegida
app.get("/dashboard", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Bem-vindo ao dashboard, ${req.user.username}!` });
});

// Rota para listar todos os usuários registrados
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

// Roda o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});