import prisma from "../../data/db";

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id_usuarios, nome, bairro, cidade, rua, telefone } = req.body;
  
      if (!id_usuarios) {
        const createdCliente =  prisma.cliente.create({
          data: {
            nome: nome,
            bairro: bairro,
            cidade: cidade,
            rua: rua,
            telefone: telefone,
          },
        })  .then((cliente) => {
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
  
        res.status(200).json({ message: "Cliente criado com sucesso", data: createdCliente });
      } else {
        const clienteId = parseInt(id_usuarios);
  
        const updatedCliente =  prisma.cliente.update({
          where: {
            id: clienteId,
          },
          data: {
            nome: nome,
            bairro: bairro,
            cidade: cidade,
            rua: rua,
            telefone: telefone,
          },
        })  .then((cliente) => {
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
  
        res.status(200).json({ message: "Cliente atualizado com sucesso", data: updatedCliente });
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar cliente:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
   else if (req.method === 'GET') {
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
  } else if (req.method === 'DELETE') {
    if (req.query.id) {
      const clienteId = parseInt(req.query.id);
      console.log("🚀 ~ file: cliente.ts:78 ~ handler ~ clienteId:", clienteId)

      prisma.cliente
        .delete({
          where: {
            id: clienteId,
          },
        })
        .then(() => {
          res.status(200).json({ message: "Cliente excluído com sucesso" });
        })
        .catch((error) => {
          console.error("Erro ao excluir cliente:", error);
          res.status(500).json({ error: "Internal Server Error, Cliente está relacionado a algum carrinho" });
        });
    } else {
      res.status(400).json({ error: "ID do cliente não fornecido para exclusão" });
    }
    
  } 
  else {
    res.status(405).end(); // Método não permitido
  }
}


async function deleteCliente(clienteId: number) {
  try {
    await prisma.cliente.delete({
      where: {
        id: clienteId,
      },
    });

    return { success: true, message: "Cliente excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    return { success: false, error: "Internal Server Error, Cliente está relacionado a algum carrinho" };
  }
}