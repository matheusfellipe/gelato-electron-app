import prisma from "../../data/db";

export default function handler(req, res) {
    if (req.method === 'GET') {
      prisma.entregador
        .findMany()
        .then((entregadores) => {
          res.status(200).json({ data: entregadores });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Erro interno do servidor ao buscar entregadores' });
        });
    } else if (req.method === 'POST') {
      const { nome, telefone } = JSON.parse(req.body);
      console.log("🚀 ~ file: entregador.ts:15 ~ handler ~ req.body:", req.body);
  
      prisma.entregador
        .create({
          data: {
            nome,
            telefone,
          },
        })
        .then((novoEntregador) => {
          res.status(200).json({ message: 'Entregador criado com sucesso', data: novoEntregador });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Erro interno do servidor ao criar entregador' });
        });
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { nome, telefone } = req.body;
  
      prisma.entregador
        .update({
          where: {
            id: parseInt(id),
          },
          data: {
            nome,
            telefone,
          },
        })
        .then((entregadorAtualizado) => {
          res.status(200).json({ message: 'Entregador atualizado com sucesso', data: entregadorAtualizado });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Erro interno do servidor ao atualizar entregador' });
        });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      console.log("🚀 ~ file: entregador.ts:52 ~ handler ~ id:", id)
  
      prisma.entregador
        .delete({
          where: {
            id: parseInt(id),
          },
        })
        .then(() => {
          res.status(200).json({ message: 'Entregador deletado com sucesso' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Erro interno do servidor ao deletar entregador' });
        });
    } else {
      res.status(404).json({ error: 'Método não suportado' });
    }
  }
  