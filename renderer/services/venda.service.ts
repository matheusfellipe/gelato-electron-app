import { mapToIVendaView } from "../mapper/venda.mapper";


export interface IVenda {
  clienteId: number;
  dataVenda: string;
  pago: boolean;
  valorTotal: number;
  itens: IVendaItem[];
}

export interface IVendaType extends IVenda {
  id_venda: number;
}


export interface IVendaView {
  id: number;
  cliente: string;
  total_da_venda: string;
  data_da_venda: string;
  entrega: string;
  entregador: string;
  dt_entrega: string;
  pago: string;
  forma_de_pagamento: string;
  status_da_venda: string;
}

export interface IVendaItem {
  id: number;
  quantidade: number;
  valorTotal: number;
  carrinhoId: number;
  produtoId: number;
  produto: {
    id: number;
    qtd_estoque: number;
    sabor: string;
    vlr_unitario: string;
  };
  carrinho: {
    id: number;
    entregadorId: number;
    formaPagamentoId: number;
    clienteId: number;
    dataVenda: string;
    valorTotal: number;
    pago: boolean;
    cliente: {
      id: number;
      nome: string;
      telefone: string;
      cidade: string;
      bairro: string;
      rua: string;
    };
    entregador: {
      id: number;
      nome: string;
      telefone: string;
    };
    formaPagamento: {
      id: number;
      descricao: string;
    };
  };
}


export const postVenda = async (venda: IVenda) => {
  console.log("🚀 ~ file: venda.service.ts:15 ~ postVenda ~ venda:", venda);

  const data = {
    clienteId: venda.clienteId,
    dataVenda: venda.dataVenda,
    pago: venda.pago,
    valorTotal: venda.valorTotal,
    itens: venda.itens.map((item) => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      valorTotal: item.valorTotal,
    })),
  };

  const response = await fetch("/api/venda", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getVenda = async () => {
  

  const response = await fetch(`/api/venda`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter venda: ${response.statusText}`);
  }

  const { data } = await response.json();
  
  return data as unknown as IVendaItem[];
};

export const putVenda = async (id: number, venda: IVenda) => {
  console.log("🚀 ~ file: venda.service.ts:36 ~ putVenda ~ id:", id);
  console.log("🚀 ~ file: venda.service.ts:36 ~ putVenda ~ venda:", venda);

  const data = {
    clienteId: venda.clienteId,
    dataVenda: venda.dataVenda,
    pago: venda.pago,
    valorTotal: venda.valorTotal,
    itens: venda.itens.map((item) => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      valorTotal: item.valorTotal,
    })),
  };

  const response = await fetch(`/api/venda/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteVenda = async (id: number) => {
  console.log("🚀 ~ file: venda.service.ts:54 ~ deleteVenda ~ id:", id);

  const response = await fetch(`/api/venda/${id}`, {
    method: "DELETE",
  });

  return response.json();
};
