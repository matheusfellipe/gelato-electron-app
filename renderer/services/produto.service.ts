export interface IProduto {
  preco: number;
  quantidade: number;
  volume: number;
  saborId: number; // Referência ao ID do sabor
}

export interface IProdutoType extends IProduto {
  id: number;
}

export const getProdutos = async () => {
  console.log("🚀 ~ file: produto.service.ts:26 ~ getProdutos ~ entrou aqui:");

  const response = await fetch("/api/produto", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter produtos: ${response.statusText}`);
  }


  const { data } = await response.json();
  console.log("🚀 ~ file: produto.service.ts:25 ~ getProdutos ~ data:", data)

  return data as IProdutoType[];
};

export const postProduto = async (produto: IProduto) => {
  console.log("🚀 ~ file: produto.service.ts:28 ~ postProduto ~ produto:", produto);

  const data = {
    preco: produto.preco,
    quantidade: produto.quantidade,
    volume: produto.volume,
    saborId: produto.saborId,
  };

  const response = await fetch("/api/produto", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const putProduto = async (produto: IProdutoType, id: number) => {
  console.log("🚀 ~ file: produto.service.ts:57 ~ putProduto ~ id:", id);
  console.log("🚀 ~ file: produto.service.ts:57 ~ putProduto ~ produto:", produto);

  const data = {
    preco: produto.preco,
    quantidade: produto.quantidade,
    volume: produto.volume,
    saborId: produto.saborId,
  };
  console.log("🚀 ~ file: produto.service.ts:66 ~ putProduto ~ data:", data);

  const response = await fetch(`/api/produto?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteProduto = async (id: number) => {
  console.log("🚀 ~ file: produto.service.ts:79 ~ deleteProduto ~ id:", id);
  const response = await fetch(`/api/produto?id=${id}`, {
    method: "DELETE",
  });

  return response.json();
};
