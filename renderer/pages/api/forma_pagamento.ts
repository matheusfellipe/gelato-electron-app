import prisma from "../../data/db";

export default function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query.id) {
          const formaPagamentoId = parseInt(req.query.id);
      
          prisma.formaDePagamento
            .findFirst({
              where: {
                id: formaPagamentoId,
              },
            })
            .then((formaPagamento) => {
              if (formaPagamento) {
                res.status(200).json({ data: formaPagamento });
              } else {
                res.status(404).json({ error: "Forma de pagamento não encontrada" });
              }
            })
            .catch((error) => {
              console.error("Erro ao obter forma de pagamento por ID:", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
        } else {
          prisma.formaDePagamento
            .findMany()
            .then((formasPagamento) => {
              res.status(200).json({ data: formasPagamento });
            })
            .catch((error) => {
              console.error("Erro ao obter formas de pagamento:", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
        }
      }
}