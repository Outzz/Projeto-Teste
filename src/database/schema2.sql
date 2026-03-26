CREATE TABLE produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(1221),
  cor VARCHAR(100),
  tamanho VARCHAR(100),
  preco DECIMAL(2, 10),
  id_funcionario INT,
  id_estoque INT,
  id_fornecedor INT,
  id_usuarios INT,
  categoria VARCHAR,
  FOREIGN KEY (id_estoque) REFERENCES estoque(id)
 );
 
CREATE TABLE cliente (
  id_cliente INTEGER primary KEY AUTOINCREMENT,
  nome VARCHAR(100),
  idade INT(2, 10),
  email VARCHAR(1000),
  data_nascimento DATE,
  cpf INT(2, 10),
  telefone VARCHAR(1000)
);

CREATE TABLE fornecedor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100),
  cnpj VARCHAR(21),
  email VARCHAR(1000),
  telefone VARCHAR(1000)
);
  
CREATE TABLE compra (
  id INTEGER PRIMARY KeY AUTOINCREMENT,
  email VARCHAR(100),
  cpf VARCHAR(20),
  pagamento VARCHAR(100),
  endereco VARCHAR(100),
  cupon INT,
  frete DECIMAL(10, 3),
  valor DECIMAL(1, 3),
  status VARCHAR(40),
  id_produto INTEGER
);

CREATE TABLE estoque (
  id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
  quantidade VARCHAR(100),
  cor VARCHAR(10),
  tamanho VARCHAR(10)
);
  
CREATE TABLE funcionarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100),
  cpf VARCHAR(200),
  cargo VARCHAR(1000),
  telefone VARCHAR(109),
  id_funcionarios INTEGER
);

CREATE TABLE avaliacao (
  id_avaliacao INTEGER PRIMARY KEY AUTOINCREMENT,
  comentario VARCHAR(1100),
  estrelas INT,
  feedback VARCHAR(20)
);

CREATE TABLE pedido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  frete DECIMAL(1, 2),
  cupon VARCHAR(22),
  produto VARCHAR(100),
  quantidade INT,
  valor_unitário DECIMAL(2, 10),
  status VARCHAR(100),
  tipo_entrega VARCHAR(100),
  total INT,
  data_hora DATE,
  endereco_entrega VARCHAR(202),
  id_cliente INTEGER,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE item_pedido(
  id_produtos INT,
  FOREIGN KEY (id_produtos) REFERENCES produtos(id),
  id_pedido INT,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id),
  quantidade INT
);

CREATE TABLE categoria (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(223),
  descricao VARCHAR(232)
);

INSERT INTO produtos (nome, cor, tamanho, preco, id_funcionarios, id_fornecedor, id_usuarios, categoria)
VALUES 
('camiseta', 'azul', 'xgg', '55,00', '22', '4412', '7', 'roupas');
 
INSERT INTO estoque (quantidade, cor, tamanho) 
VALUES
('50', 'azul', 'M'),
('30', 'preto', 'G'),
('20', 'branco', 'P'),
('40', 'verde', 'GG'),
('15', 'vermelho', 'XG');

INSERT INTO funcionarios (nome, email, cpf, cargo, telefone, id_funcionarios) 
VALUES
('Carlos Silva', 'carlos@email.com', '11111111111', 'Gerente', '11999999999', 1),
('Ana Souza', 'ana@email.com', '22222222222', 'Vendedora', '11988888888', 2),
('João Santos', 'joao@email.com', '33333333333', 'Estoquista', '11977777777', 3),
('Mariana Lima', 'mariana@email.com', '44444444444', 'Caixa', '11966666666', 4),
('Pedro Alves', 'pedro@email.com', '55555555555', 'Supervisor', '11955555555', 5);

INSERT INTO cliente (nome, idade, email, data_nascimento, cpf, telefone) 
VALUES
('Lucas Pereira', 25, 'lucas@email.com', '1999-05-10', 12345678901, '11911111111'),
('Fernanda Costa', 30, 'fernanda@email.com', '1994-08-21', 12345678902, '11922222222'),
('Bruno Rocha', 22, 'bruno@email.com', '2002-03-15', 12345678903, '11933333333'),
('Juliana Martins', 27, 'juliana@email.com', '1997-11-02', 12345678904, '11944444444'),
('Rafael Gomes', 35, 'rafael@email.com', '1989-09-09', 12345678905, '11955555555');

INSERT INTO fornecedor (nome, cnpj, email, telefone) 
VALUES
('Fornecedor Brasil', '12345678000100', 'contato@fornecedor.com', '1133333333'),
('Moda Atacado', '22345678000100', 'vendas@moda.com', '1144444444'),
('Tecidos LTDA', '32345678000100', 'suporte@tecidos.com', '1155555555'),
('Roupas Premium', '42345678000100', 'premium@roupas.com', '1166666666'),
('Distribuidora SP', '52345678000100', 'distribuidora@email.com', '1177777777');

INSERT INTO categoria (nome, descricao) 
VALUES
('Roupas', 'Vestuário em geral'),
('Calçados', 'Sapatos e tênis'),
('Acessórios', 'Bonés, cintos e bolsas'),
('Esportivos', 'Roupas para esporte'),
('Infantil', 'Roupas para crianças');

INSERT INTO produtos (nome, cor, tamanho, preco, id_funcionario, id_estoque, id_fornecedor, id_usuarios, categoria) 
VALUES
('Camiseta Nike', 'preto', 'M', 120.00, 1, 1, 1, 1, 'Roupas'),
('Calça Jeans', 'azul', 'G', 150.00, 2, 2, 2, 1, 'Roupas'),
('Tênis Esportivo', 'branco', '42', 560.00, 3, 3, 3, 2, 'Calçados'),
('Boné Adidas', 'preto', 'U', 80.00, 4, 4, 4, 2, 'Acessórios'),
('Jaqueta', 'verde', 'GG', 250.00, 5, 5, 5, 3, 'Roupas');

INSERT INTO compra (email, cpf, pagamento, endereco, cupon, frete, valor, status, id_produto) 
VALUES
('lucas@email.com', '12345678901', 'cartao', 'Rua A 123', 10, 15.000, 120.000, 'enviado', 1),
('fernanda@email.com', '12345678902', 'pix', 'Rua B 456', 5, 12.000, 150.000, 'processando', 2),
('bruno@email.com', '12345678903', 'boleto', 'Rua C 789', 0, 20.000, 300.000, 'entregue', 3),
('juliana@email.com', '12345678904', 'cartao', 'Rua D 321', 8, 18.000, 80.000, 'enviado', 4),
('rafael@email.com', '12345678905', 'pix', 'Rua E 654', 3, 15.000, 250.000, 'processando', 5);

INSERT INTO avaliacao (comentario, estrelas, feedback) 
VALUES
('Produto excelente', 5, 'positivo'),
('Boa qualidade', 4, 'positivo'),
('Produto razoável', 3, 'neutro'),
('Não gostei muito', 2, 'negativo'),
('Produto ruim', 1, 'negativo');

INSERT INTO pedido (
  id, frete, cupon, produto, quantidade, valor_unitário, status, tipo_entrega, total, data_hora, endereco_entrega, id_cliente
)
VALUES
(1, 10.00, 'DESC20', 'Notebook', 2, 1500.00, 'pendente', 'expressa', 3000, '2025-06-10', 'Rua F 999', 1),
(2, 5.00, 'PROMO10', 'Mouse Gamer', 1, 200.00, 'entregue', 'normal', 200, '2025-06-11', 'Rua G 888', 2),
(3, 12.00, 'DESC5', 'Teclado Mecânico', 1, 350.00, 'pendente', 'retirada', 350, '2025-06-12', 'Rua H 777', 3),
(4, 8.00, 'PROMO15', 'Monitor 24"', 2, 800.00, 'aguardando', 'expressa', 1600, '2025-06-13', 'Rua I 666', 4),
(5, 15.00, 'DESC25', 'Cadeira Gamer', 1, 1200.00, 'entregue', 'normal', 1200, '2025-06-14', 'Rua J 555', 5);

INSERT INTO item_pedido (id_produtos, id_pedido, quantidade) 
VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 3),
(4, 4, 1),
(5, 5, 2);

--Atvidade 2--
--1--
SELECT *
FROM pedido
WHERE status = 'pendente';

--2--
SELECT id, total, status
FROM pedido
WHERE total > 500;

--3--
SELECT *
FROM pedido
WHERE data_hora BETWEEN '2025-06-01' AND '2025-06-03';

--4--
SELECT *
FROM pedido
WHERE id_cliente = 5;

--Atvidade 3--

--6--
UPDATE pedido
SET status = 'entregue'
WHERE id = 2;

--7--
UPDATE pedido
SET total = 'R$ 950,00'
WHERE id = 2;

--8--
UPDATE pedido
SET tipo_entrega = 'retirada'
WHERE id = 3;

--9--
UPDATE pedido
SET status = 'cancelado'
WHERE status = 'pendente';

--10--
UPDATE pedido
SET quantidade = 3,
    total = quantidade * valor_unitário
WHERE id = 1;

--11--
UPDATE pedido
SET valor_unitário = valor_unitário * 0.85
WHERE id = 5;

UPDATE pedido
SET total = quantidade * valor_unitário
WHERE id = 5;

--Ativade 4--

--12--
SELECT 
p.nome,
p.preco,
c.nome,
c.descricao
FROM produtos p
JOIN categoria c
ON p.categoria = c.id
WHERE p.categoria =3 ;

--13--
SELECT 
p.nome,
p.cor,
p.tamanho,
e.quantidade
FROM produtos p
JOIN estoque e
ON p.id_estoque = e.id_estoque
WHERE e.id_estoque = 2;

--14--
SELECT 
p.nome,
p.preco,
f.nome,
f.email
FROM produtos p
JOIN fornecedor f
ON p.id_fornecedor = f.id
WHERE f.id = 1;

--15--
SELECT 
p.nome,
p.preco,
f.nome,
f.cargo
FROM produtos p
JOIN funcionarios f
ON p.id_funcionario = f.id
WHERE f.id = 2;

--16-´-
SELECT 
p.id,
p.total,
p.data_hora,
c.nome,
c.email
FROM pedido p
JOIN cliente c
ON p.id_cliente = c.id
WHERE c.id = 3;