const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({
  origin: '*', // Permite todas as origens (para desenvolvimento)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Se você definiu senha no MySQL, coloca aqui
  database: 'vitta_db'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL!');
});

// ==================== ROTAS ====================

// Teste da API
app.get('/', (req, res) => {
  res.json({ message: 'API Vitta funcionando!' });
});

// Cadastrar usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, dataNascimento, idade, sexo, peso, altura, tipoSanguineo, metaAgua, imc } = req.body;

  const sql = `INSERT INTO usuarios (nome, email, senha, dataNascimento, idade, sexo, peso, altura, tipoSanguineo, metaAgua, imc) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nome, email, senha, dataNascimento, idade, sexo, peso, altura, tipoSanguineo, metaAgua, imc], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    const usuario = results[0];
    console.log('Usuário encontrado:', usuario); // ✅ Adiciona essa linha
    
    res.json({ 
      message: 'Login bem-sucedido!', 
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        metaAgua: usuario.metaAgua,
        peso: usuario.peso,
        altura: usuario.altura
      }
    });
  });
});

// Registrar água
app.post('/agua', (req, res) => {
  const { usuario_id, quantidade, data, hora } = req.body;

  const sql = 'INSERT INTO agua_registros (usuario_id, quantidade, data, hora) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [usuario_id, quantidade, data, hora], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar água' });
    }
    res.status(201).json({ message: 'Registro salvo!', id: result.insertId });
  });
});

// Buscar registros de água de hoje
app.get('/agua/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const sql = 'SELECT * FROM agua_registros WHERE usuario_id = ? AND data = ? ORDER BY hora DESC';
  
  db.query(sql, [usuario_id, hoje], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar registros' });
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});