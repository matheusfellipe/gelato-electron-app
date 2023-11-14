export interface ISabor {
    descricao: string;
    ativo: boolean;
   
   
  }
  
  export interface ISaborType extends ISabor {
    id: number;
  }


  export const getSabores = async () => {
    console.log("🚀 ~ file: sabor.service.ts:26 ~ getSabores ~ entrou aqui:");
  
    const response = await fetch("/api/sabor", {
      method: "GET",
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao obter sabores: ${response.statusText}`);
    }
  
    console.log("🚀 ~ file: sabor.service.ts:27 ~ getSabores ~ response:", response);
    const { data } = await response.json();
  
    return data as ISaborType[];
  };
  
  export const postSabor = async (sabor: ISabor) => {
    console.log("🚀 ~ file: sabor.service.ts:28 ~ postSabor ~ sabor:", sabor);
  
    const data = {
      descricao: sabor.descricao,
      ativo: sabor.ativo,
    };
  
    const response = await fetch("/api/sabor", {
      method: "POST",
      body: JSON.stringify(data),
    });
  
    return response.json();
  };
  
  export const putSabor = async (sabor: ISaborType, id: number) => {
    console.log("🚀 ~ file: sabor.service.ts:57 ~ putSabor ~ id:", id);
    console.log("🚀 ~ file: sabor.service.ts:57 ~ putSabor ~ sabor:", sabor);
  
    const data = {
      descricao: sabor.descricao,
      ativo: sabor.ativo,
    };
    console.log("🚀 ~ file: sabor.service.ts:66 ~ putSabor ~ data:", data);
  
    const response = await fetch(`/api/sabor?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    return response.json();
  };
  
  export const deleteSabor = async (id: number) => {
    console.log("🚀 ~ file: sabor.service.ts:79 ~ deleteSabor ~ id:", id);
    const response = await fetch(`/api/sabor?id=${id}`, {
      method: "DELETE",
    });
  
    return response.json();
  };