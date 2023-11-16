export interface IEntregador {
  nome: string;
  telefone: string;
}

export interface IEntregadorType extends IEntregador {
  id: number;
}

export const getEntregadores = async () => {
  try {
    const response = await fetch("/api/entregador", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter entregadores: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data as IEntregadorType[];
  } catch (error) {
    console.error("Erro ao obter entregadores:", error);
    throw error;
  }
};

export const postEntregador = async (entregador: IEntregador) => {
  try {
    const response = await fetch("/api/entregador", {
      method: "POST",
      body: JSON.stringify(entregador),
    });

    return response.json();
  } catch (error) {
    console.error("Erro ao criar entregador:", error);
    throw error;
  }
};

export const putEntregador = async (entregador: IEntregadorType, id: number) => {
  try {
    const response = await fetch(`/api/entregador?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entregador),
    });

    return response.json();
  } catch (error) {
    console.error("Erro ao atualizar entregador:", error);
    throw error;
  }
};

export const deleteEntregador = async (id: number) => {
  try {
    const response = await fetch(`/api/entregador?id=${id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error) {
    console.error("Erro ao deletar entregador:", error);
    throw error;
  }
};
