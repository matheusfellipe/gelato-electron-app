import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { clienteId, dataVenda, pago, valorTotal, itens } = req.body;

    prisma.carrinho
      .create({
        data: {
          clienteId,
          dataVenda,
          pago,
          valorTotal,
          itens: {
            create: itens.map((item) => ({
              produtoId: item.produtoId,
              quantidade: item.quantidade,
              valorTotal: item.valorTotal,
            })),
          },
        },
        include: {
          itens: true,
        },
      })
      .then((createdCarrinho) => {
        console.log("🚀 ~ file: carrinho.ts:17 ~ handler ~ createdCarrinho", createdCarrinho);
        res.status(200).json({ message: "Carrinho created successfully", data: createdCarrinho });
      })
      .catch((error) => {
        console.error("Erro ao criar carrinho:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const carrinhoId = parseInt(req.query.id); // Supondo que o ID seja um número inteiro

      prisma.carrinho
        .findFirst({
          where: {
            id: carrinhoId,
          },
          include: {
            itens: {
              include: {
                produto: true,
              },
            },
          },
        })
        .then((carrinho) => {
          if (carrinho) {
            res.status(200).json({ data: carrinho });
          } else {
            res.status(404).json({ error: "Carrinho não encontrado" });
          }
        })
        .catch((error) => {
          console.error("Erro ao obter carrinho por ID:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      prisma.carrinho
        .findMany({
          include: {
            itens: {
              include: {
                produto: true,
              },
            },
          },
        })
        .then((carrinhos) => {
          res.status(200).json({ data: carrinhos });
        })
        .catch((error) => {
          console.error("Erro ao obter carrinhos:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
