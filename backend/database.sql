-- Cria o banco se não existir
CREATE DATABASE IF NOT EXISTS vitta_db;
USE vitta_db;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  dataNascimento VARCHAR(10),
  idade INT,
  sexo CHAR(1),
  peso DECIMAL(5,2),
  altura DECIMAL(5,2),
  tipoSanguineo VARCHAR(5),
  metaAgua INT,
  imc DECIMAL(4,1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cria a tabela de registros de água
CREATE TABLE IF NOT EXISTS agua_registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  quantidade INT NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);