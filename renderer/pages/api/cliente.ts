import prisma from "../../data/db";

export default function handler(req, res) {
  const { nome, bairro, cidade, rua, telefone } = req.body;
  console.log("🚀 ~ file: cliente.ts:5 ~ handler ~ req.body:", req.body)
 
  prisma.cliente.create({
      data: {
        nome: nome,
        bairro: bairro,
        cidade: cidade,
        rua: rua,
        telefone: telefone,
      }
    }).then(createdCliente => {
      console.log("🚀 ~ file: cliente.ts:13 ~ handler ~ createdCliente", createdCliente);
      res.status(200).json({ message: "Cliente created successfully", data: createdCliente });
    }).catch(error => {
      console.error("Erro ao criar cliente:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
