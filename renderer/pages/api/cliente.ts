import prisma from "../../data/db";

export default function handler(req, res) {
    const { nome, bairro,cidade,rua,telefone } = JSON.parse(req.body);
  
    const data =  prisma.cliente.create({
        data:{
          nome:nome,
          bairro:bairro,
          cidade:cidade,
          rua:rua,
          telefone:telefone,
    
        }
      })
    res.status(200).json({ message: "Cliente created successfully" });
  }