import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { preco, quantidade, volume, saborId } = req.body;

    prisma.produto
      .create({
        data: {
          preco,
          quantidade,
          volume,
          sabor: saborId ? { connect: { id: saborId } } : undefined,
        },
      })
      .then((createdProduto) => {
        console.log("🚀 ~ file: produto.ts:13 ~ handler ~ createdProduto", createdProduto);
        res.status(200).json({ message: "Produto created successfully", data: createdProduto });
      })
      .catch((error) => {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const produtoId = parseInt(req.query.id); // Supondo que o ID seja um número inteiro

      prisma.produto
        .findFirst({
          where: {
            id: produtoId,
          },
          include: {
            sabor: true,
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
        .findMany({
          include: {
            sabor: true,
          },
        })
        .then((produtos) => {
          res.status(200).json({ data: produtos });
        })
        .catch((error) => {
          console.error("Erro ao obter produtos:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
