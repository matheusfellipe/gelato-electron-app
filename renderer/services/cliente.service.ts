import prisma from "../data/db";






export interface IUsuario {
  nome: string;
  telefone: string;
  rua: string;
  bairro: string;
  cidade:string;
 
}

export interface IUsuarioType extends IUsuario {
  id_usuario: number;
}

export const getUsuario = async () => {
  const data  = await prisma.cliente.findMany();

  return data as unknown as IUsuarioType[];
};

export const postUsuario = async (usuario: IUsuario) => {
    console.log("🚀 ~ file: cliente.service.ts:28 ~ postUsuario ~ usuario:", usuario)
    
    
  const data = await prisma.cliente.create({
    data:{
      nome:usuario.nome,
      bairro:usuario.bairro,
      cidade:usuario.cidade,
      rua:usuario.rua,
      telefone:usuario.telefone,

    }
  })
  return data;
};

// export const putUsuario = async (usuario: IUsuarioType) => {
//   const { data } = await api.put(
//     `/usuario/${usuario.id_usuario}`,
//     usuario
//   );

//   return data;
// };

// export const deleteUsuario = async (id: number) => {
//   const { data } = await api.delete(`/usuario/${id}`);

//   return data;
// };