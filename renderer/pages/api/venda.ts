import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
   const { entregadorId, formaPagamentoId, clienteId, dataVenda, pago, total, itens } = req.body;
   console.log("🚀 ~ file: venda.ts:6 ~ handler ~ total:", total)

  prisma.carrinho
    .create({
      data: {
        entregadorId,
        formaPagamentoId,
        clienteId,
        dataVenda: new Date(),
        valorTotal:total,
        pago:pago??false,
        itens: {
          create: itens?.map((item) => ({
            quantidade: item.qtd,
            valorTotal: item.valor,
            produto: {
              connect: { id: item.id }
            }
          })),
        },
      },
      include: {
        itens: true,
      },
    })
    .then((createdCarrinho) => {
      console.log("Carrinho criado com sucesso:", createdCarrinho);
      res.status(200).json({ message: "Carrinho criado com sucesso", data: createdCarrinho });
    })
    .catch((error) => {
      console.error("Erro ao criar carrinho:", error);
      res.status(500).json({ error: "Erro interno do servidor ao criar carrinho" });
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
  }  else {
    res.status(405).end(); // Método não permitido
  }
}
