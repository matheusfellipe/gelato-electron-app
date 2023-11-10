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

export const getUsuarios = async () => {
  console.log("🚀 ~ file: cliente.service.ts:26 ~ getUsuarios ~ entrou aqui:")
  
  const response = await fetch("/api/cliente",{
    method:"GET"
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao obter usuários: ${response.statusText}`);
  }
  
  console.log("🚀 ~ file: cliente.service.ts:27 ~ getUsuarios ~ response:", response)
  const {data} = await response.json();
 
  return data as IUsuarioType[];
};

export const postUsuario = async (usuario: IUsuario) => {
    console.log("🚀 ~ file: cliente.service.ts:28 ~ postUsuario ~ usuario:", usuario)
    
    
  const data = await {
    
      nome:usuario.nome,
      bairro:usuario.bairro,
      cidade:usuario.cidade,
      rua:usuario.rua,
      telefone:usuario.telefone,

    
  }
  const response = await fetch("/api/cliente", {
    method: "POST",
    body: JSON.stringify(data),
  });
 

  return response.json();
};



export const putUsuario = async (usuario: IUsuarioType) => {
  const data = {
    nome: usuario.nome,
    bairro: usuario.bairro,
    cidade: usuario.cidade,
    rua: usuario.rua,
    telefone: usuario.telefone,
  };

  const response = await fetch(`/api/cliente?id=${usuario.id_usuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};


export const deleteUsuario = async (id: number) => {
  const response = await fetch(`/api/cliente/${id}`, {
    method: "DELETE",
  });

  return response.json();
};