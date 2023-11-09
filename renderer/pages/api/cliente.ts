import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, bairro, cidade, rua, telefone } = JSON.parse(req.body);

    prisma.cliente
      .create({
        data: {
          nome: nome,
          bairro: bairro,
          cidade: cidade,
          rua: rua,
          telefone: telefone,
        },
      })
      .then((createdCliente) => {
        console.log("🚀 ~ file: cliente.ts:13 ~ handler ~ createdCliente", createdCliente);
        res.status(200).json({ message: "Cliente created successfully", data: createdCliente });
      })
      .catch((error) => {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const clienteId = parseInt(req.query.id); // Supondo que o ID seja um número inteiro

      prisma.cliente
        .findFirst({
          where: {
            id: clienteId,
          },
        })
        .then((cliente) => {
          if (cliente) {
            res.status(200).json({ data: cliente });
          } else {
            res.status(404).json({ error: "Cliente não encontrado" });
          }
        })
        .catch((error) => {
          console.error("Erro ao obter cliente por ID:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      prisma.cliente
        .findMany()
        .then((clientes) => {
          res.status(200).json({ data: clientes });
        })
        .catch((error) => {
          console.error("Erro ao obter clientes:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
