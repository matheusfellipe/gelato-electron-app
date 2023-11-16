import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { qtd_estoque, sabor, vlr_unitario } = req.body;
    console.log("🚀 ~ file: produto.ts:6 ~ handler ~ qtd_estoque, sabor, vlr_unitario:", qtd_estoque, sabor, vlr_unitario);
  
    prisma.produto
      .create({
        data: {
          qtd_estoque,
          sabor,
          vlr_unitario
        },
      })
      .then((createdProduto) => {
        res.status(200).json({ message: "Produto criado com sucesso", data: createdProduto });
      })
      .catch((error) => {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ error: "Erro interno do servidor ao criar produto" });
      });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const produtoId = parseInt(req.query.id);
  
      prisma.produto
        .findFirst({
          where: {
            id: produtoId,
          },
        })
        .then((produto) => {
          if (produto) {
            res.status(200).json({ data: produto });
          } else {
            res.status(404).json({ error: "Produto não encontrado" });
          }
        })
        .catch((error) => {
          console.error("Erro ao obter produto por ID:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      prisma.produto
        .findMany()
        .then((produtos) => {
          res.status(200).json({ data: produtos });
        })
        .catch((error) => {
          console.error("Erro ao obter produtos:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  } else if (req.method === 'PUT') {
    const produtoId = parseInt(req.query.id);
  
    if (!produtoId) {
      res.status(400).json({ error: "ID do produto não fornecido para atualização" });
      return;
    }
  
    const { qtd_estoque, sabor, vlr_unitario } = req.body;
  
    prisma.produto
      .update({
        where: {
          id: produtoId,
        },
        data: {
          qtd_estoque,
          sabor,
          vlr_unitario,
        },
      })
      .then((updatedProduto) => {
        if (updatedProduto) {
          res.status(200).json({ message: "Produto atualizado com sucesso", data: updatedProduto });
        } else {
          res.status(404).json({ error: "Produto não encontrado" });
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar produto" });
      });
  } else if (req.method === 'DELETE') {
    if (req.query.id) {
      const produtoId = parseInt(req.query.id);
  
      prisma.produto
        .delete({
          where: {
            id: produtoId,
          },
        })
        .then(() => {
          res.status(200).json({ message: "Produto excluído com sucesso" });
        })
        .catch((error) => {
          console.error("Erro ao excluir produto:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      res.status(400).json({ error: "ID do produto não fornecido para exclusão" });
    }
  } else {
    res.status(405).end();
  }
  
}
