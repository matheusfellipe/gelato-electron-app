export interface ICremosinho {
    sabor: string;
    vlr_unitario: string;
    qtd_estoque: number;
    inativo: "f" | "v";
    id_cremosinho?: number;
  }


  export interface ICremosinhoPrice {
    sabor: string;
    vlr_unitario: number;
    qtd_estoque: number;
    inativo: "f" | "v";
    id_cremosinho?: number;
  }
  
  export interface ICremosinhoType extends ICremosinho {
    id_cremosinho: number;
  }

  // export const getProdutoById = async (produtoId) => {
  //   try {
  //     const produto = await prisma.produto.findFirst({
  //       where: {
  //         id: produtoId,
  //       },
  //       include: {
  //         sabor: true,
  //       },
  //     });
  
  //     return produto;
  //   } catch (error) {
  //     console.error("Erro ao obter produto por ID:", error);
  //     throw error;
  //   }
  // };
  
  export const getAllProdutos = async () => {
    const response = await fetch("/api/produto",{
      method:"GET"
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao obter usuários: ${response.statusText}`);
    }
    
    console.log("🚀 ~ file: cliente.service.ts:27 ~ getUsuarios ~ response:", response)
    const data = await response.json();
   
    return data as ICremosinhoType[];
  };