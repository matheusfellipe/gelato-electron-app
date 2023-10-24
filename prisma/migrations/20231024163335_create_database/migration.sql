-- CreateTable
CREATE TABLE "Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataVenda" DATETIME NOT NULL,
    "valorTotal" REAL NOT NULL,
    "pago" BOOLEAN NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CarrinhoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "valorTotal" REAL NOT NULL,
    "carrinhoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "CarrinhoItem_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarrinhoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sabor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "preco" REAL NOT NULL,
    "saborId" INTEGER NOT NULL,
    CONSTRAINT "Produto_saborId_fkey" FOREIGN KEY ("saborId") REFERENCES "Sabor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
