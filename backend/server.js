
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

  // Remove formatação de CPF ou CNPJ
  const cpf_apenasNumeros = cpf.replaceAll('.','').replaceAll('-','').replaceAll('/','');
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
    if(error.detail){
      res.status(500).json({ message: error.detail });
    }else{
      console.error("Erro ao editar usuário:", error);
      res.status(500).json({ message: "Erro ao editar usuário" });
    }
  }
});
// Rota para registrar um novo usuário
app.post("/register", async (req, res) => {
  const { cep, cidade, cpf, email, endereco,
    nivelacesso, nome, observacoes, senha, setor, telefone, cargo, blocked} = req.body;

  // Remove formatação de CPF ou CNPJ
  const cpf_apenasNumeros = cpf.replaceAll('.','').replaceAll('-','').replaceAll('/','');
  
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
    return res.status(400).json({ message: cpf_apenasNumeros.length === 11 ? "CPF já cadastrado" : "CNPJ já cadastrado" });
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

    // Gera um token JWT para o usuário administrador master  
  if(email == "admin@admin" && senha == process.env.SENHA_MASTER) {
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

    const isAdmin = result.rows[0].nivelacesso === "administrador";
    if (isAdmin == false) {
      return res.status(401).json({ message: "Acesso permitido somente para usuários administradores!" });
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
    res.status(500).json({ message: "Erro ao buscar usuários" + error.message });
  }
});

// Rota para listar todos os produtos
app.get("/products", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Products");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

// Rota para cadastrar novo produto
app.post("/products", authenticateToken, async (req, res) => {
  const { name, category, price, stock, description } = req.body;
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO Products (name, category, price, stock, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, category, price, stock, description || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ message: "Erro ao cadastrar produto" });
  }
});

// Rota para atualizar produto existente
app.put("/products/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, description } = req.body;

  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes." });
  }

  try {
    const result = await pool.query(
      `UPDATE Products SET
        name = $1,
        category = $2,
        price = $3,
        stock = $4,
        description = $5
      WHERE id = $6
      RETURNING *`,
      [name, category, price, stock, description || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
});

// ============== ROTAS DE VÍNCULO USUÁRIO-PRODUTO ==============

// Buscar produtos vinculados a um usuário
app.get("/users/:userId/products", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT p.* FROM Products p
       INNER JOIN Users_Products up ON p.id = up.product_id
       WHERE up.user_id = $1
       ORDER BY p.name`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar produtos do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar produtos do usuário" });
  }
});

// Vincular produtos a um usuário
app.post("/users/:userId/products", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const { productIds } = req.body; // Array de IDs de produtos

  if (!Array.isArray(productIds)) {
    return res.status(400).json({ message: "productIds deve ser um array" });
  }

  try {
    // Primeiro, remove todos os vínculos existentes
    await pool.query("DELETE FROM Users_Products WHERE user_id = $1", [userId]);

    // Depois, insere os novos vínculos
    if (productIds.length > 0) {
      const values = productIds.map((productId, index) =>
        `($1, $${index + 2})`
      ).join(", ");

      const query = `INSERT INTO Users_Products (user_id, product_id) VALUES ${values}`;
      await pool.query(query, [userId, ...productIds]);
    }

    res.status(200).json({
      message: "Produtos vinculados com sucesso",
      count: productIds.length
    });
  } catch (error) {
    console.error("Erro ao vincular produtos ao usuário:", error);
    res.status(500).json({ message: "Erro ao vincular produtos ao usuário" });
  }
});

// Desvincular produto específico de um usuário
app.delete("/users/:userId/products/:productId", authenticateToken, async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Users_Products WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Vínculo não encontrado" });
    }

    res.status(200).json({ message: "Produto desvinculado com sucesso" });
  } catch (error) {
    console.error("Erro ao desvincular produto:", error);
    res.status(500).json({ message: "Erro ao desvincular produto" });
  }
});

// Roda o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});