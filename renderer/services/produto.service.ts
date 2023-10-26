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

  