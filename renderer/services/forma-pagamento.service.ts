export interface IFormaDePagamento {
    descricao: string;
  }
  
  export interface IFormaDePagamentoType extends IFormaDePagamento {
    id: number;
  }
  
  export const getFormasDePagamento = async () => {
    try {
      const response = await fetch("/api/forma_pagamento", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao obter formas de pagamento: ${response.statusText}`);
      }
  
      const { data } = await response.json();
      return data as IFormaDePagamentoType[];
    } catch (error) {
      console.error("Erro ao obter formas de pagamento:", error);
      throw error;
    }
  };
  