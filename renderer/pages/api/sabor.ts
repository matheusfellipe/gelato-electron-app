import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { descricao, ativo } =req.body;
    console.log("🚀 ~ file: sabor.ts:6 ~ handler ~ req.body:", req.body)

    prisma.sabor
      .create({
        data: {
          ativo,
          descricao,
        },
      })
      .then((createdSabor) => {
        console.log("🚀 ~ file: sabor.ts:13 ~ handler ~ createdSabor", createdSabor);
        res.status(200).json({ message: "Sabor created successfully", data: createdSabor });
      })
      .catch((error) => {
        console.error("Erro ao criar sabor:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const saborId = parseInt(req.query.id); // Supondo que o ID seja um número inteiro

      prisma.sabor
        .findFirst({
          where: {
            id: saborId,
          },
        })
        .then((sabor) => {
          if (sabor) {
            res.status(200).json({ data: sabor });
          } else {
            res.status(404).json({ error: "Sabor não encontrado" });
          }
        })
        .catch((error) => {
          console.error("Erro ao obter sabor por ID:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      prisma.sabor
        .findMany()
        .then((sabores) => {
          res.status(200).json({ data: sabores });
        })
        .catch((error) => {
          console.error("Erro ao obter sabores:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
  
  }  else if (req.method === 'DELETE') {
    if (req.query.id) {
      const saborId = parseInt(req.query.id);

      prisma.sabor
        .delete({
          where: {
            id: saborId,
          },
        })
        .then(() => {
          res.status(200).json({ message: "Sabor excluído com sucesso" });
        })
        .catch((error) => {
          console.error("Erro ao excluir sabor:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      res.status(400).json({ error: "ID do sabor não fornecido para exclusão" });
    }
  } else if (req.method === 'PUT') {
    try {
      if (req.query.id) {
        const saborId = parseInt(req.query.id);
        const { descricao, ativo } = req.body;

        const updatedSabor = prisma.sabor.update({
          where: {
            id: saborId,
          },
          data: {
            descricao,
            ativo,
          },
        })
        .then((sabor) => {
          if (sabor) {
            res.status(200).json({ message: "Sabor atualizado com sucesso", data: sabor });
          } else {
            res.status(404).json({ error: "Sabor não encontrado" });
          }
        })
        .catch((error) => {
          console.error("Erro ao atualizar sabor:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
      } else {
        res.status(400).json({ error: "ID do sabor não fornecido para atualização" });
      }
    } catch (error) {
      console.error("Erro ao atualizar sabor:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }

}
