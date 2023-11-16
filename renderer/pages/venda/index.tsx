
import { Button, Checkbox, Select } from "@mantine/core";

import { GetServerSidePropsContext } from "next";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Cart } from "../../components/Cart"; 

// import { ListAllCremosinho } from "../../../components/ListAllCremosinho";
import { IProduto, IProdutoType, getProdutos } from "../../services/produto.service";
// import { getEntregador } from "../../../services/entregadorService";
// import { getFormaDePagamento } from "../../../services/formaDePagamentoService";
// import { getStatus } from "../../../services/statusService";
import { formattedValue } from "../../utils/formatter";
import styles from "./styles.module.scss";
// import { getUsuario } from "../../../services/usuarioService";
// import { postVenda } from "../../../services/vendaService";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { ListAllCremosinho } from "../../components/ListAllProduto";
import { Layout } from "../../components/Layout";
import { IUsuarioType, getUsuarios } from "../../services/cliente.service";
import { getEntregadores } from "../../services/entregador.service";
import { getFormasDePagamento } from "../../services/forma-pagamento.service";
import { postVenda } from "../../services/venda.service";

export interface ICremosinhoSell extends IProdutoType {
  qtd: number;
}

interface ILabeledValue {
  label: string;
  value: string;
}

interface DashboardProps {
  allEntregador: ILabeledValue[];
  allFormaDePagamento: ILabeledValue[];
  allStatus: ILabeledValue[];
  allUsuario: ILabeledValue[];
}

interface IForm {
  vlr_total_venda: string;
  dt_venda: string;
  entregador: "s" | "n";
  dt_entrega: string;
  pago: "s" | "n";
  itens: [any];
  formaPagamentoId: number;
  entregadorId: number;
  clienteId: number;
}

const Dashboard: FC<DashboardProps> = () => {
  const [cremosinho, setCremosinho] = useState<ICremosinhoSell[]>([]);
  const [usuario, setUsuario] = useState<ILabeledValue[]>();
  const [produto, setProduto] = useState<ILabeledValue[]>();
  const [entregadores, setEntregador] = useState<ILabeledValue[]>();
  const [formaPagamento, setFormaPagamento] = useState<ILabeledValue[]>();

  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>({});

  const fetchDados = async () => {
    try {
     
      const result = await Promise.all([
        
        getUsuarios(),
        getProdutos(),
        getEntregadores(),
        getFormasDePagamento()
      ]);
  
      const formattedUserResponse = result[0].map((user) => ({
        label: user.nome,
        value: String(user.id),
      }));

      const formattedProdutoResponse = result[1].map((user) => ({
        label: user.sabor,
        value: String(user.id),
      }));

      const formattedEntregadorResponse = result[2].map((user) => ({
        label: user.nome,
        value: String(user.id),
      }));

      const formattedFormaPagamentoResponse = result[3].map((user) => ({
        label: user.descricao,
        value: String(user.id),
      }));

      setUsuario(formattedUserResponse)
      setProduto(formattedProdutoResponse)
      setEntregador(formattedEntregadorResponse)
      setFormaPagamento(formattedFormaPagamentoResponse)
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);


  const addCremosinho = (cremosinho: IProdutoType) =>
    setCremosinho((oldCremosinho) => [
      ...oldCremosinho,
      { ...cremosinho, qtd: 1 },
    ]);

  const addById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id === id
          ? { ...element, qtd: element.qtd + 1 }
          : element
      )
    );

  const removeById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id === id
          ? { ...element, qtd: element.qtd - 1 }
          : element
      )
    );

  const deleteById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.filter((element) => element.id !== id)
    );

  const total = cremosinho.reduce(
    (acc, element) => acc + element.qtd * Number(element.vlr_unitario),
    0
  );

  const onSubmit = async (data: IForm) => {
    console.log("🚀 ~ file: index.tsx:150 ~ onSubmit ~ data:", data)
    const resultPerItem = cremosinho.map((item) => ({
      ...item,
      valor: Number(item.vlr_unitario) * item.qtd,
    }));
    const formattedData = { ...data, itens: resultPerItem, total };
    console.log("🚀 ~ file: index.tsx:156 ~ onSubmit ~ formattedData:", formattedData)
    try {
       postVenda(formattedData as any);
      showNotification({
        title: 'Sucesso',
        message: 'Venda realizada com sucesso',
      })
      router.push('/dashboard')
    } catch (error) {
      showNotification({
        title: 'Erro',
        message: 'Erro ao realizar venda',
      })
      console.log(error);
    }
  };

  const entregador = watch("entregador");
  const idEntregador = watch("entregadorId");
  const idFormaDePagamento = watch("formaPagamentoId");
  const idUsuario = watch("clienteId");

  const pago = watch("pago");

  return (
    <Layout >
    <form onSubmit={handleSubmit(onSubmit)}>
    

      <div className={styles.container}>
        <main className={styles.containerSell}>
          <div className={styles.contentCart}>
            <Checkbox
              value={pago}
              onChange={(e) => setValue("pago", e.target.checked ? "s" : "n")}
              label="Pago"
            />
            <div className={styles.hStack}>
              <Checkbox
                value={entregador}
                onChange={(e) =>
                  setValue("entregador", e.target.checked ? "s" : "n")
                }
                label="Entrega"
              />
              {entregador === "s" && (
                <>
                  <Select
                    label="Entregador"
                    placeholder="Selecione um entregador"
                    data={entregadores}
                    value={String(idEntregador)}
                    onChange={(e) =>
                      e !== null && setValue("entregadorId", Number(e))
                    }
                  />
                
                </>
              )}
            </div>
            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              data={usuario}
              value={String(idUsuario)}
              onChange={(e) => e !== null && setValue("clienteId", Number(e))}
            ></Select>
            <Select
              label="Forma de Pagamento"
              placeholder="Selecione uma forma"
              data={formaPagamento}
              value={String(idFormaDePagamento)}
              onChange={(e) =>
                e !== null && setValue("formaPagamentoId", Number(e))
              }
            ></Select>
        

            <Cart
              actualCremosinho={cremosinho}
              addById={addById}
              removeById={removeById}
              deleteById={deleteById}
            />
          </div>
          <div>
            <ListAllCremosinho
              actualCremosinho={cremosinho}
              addCremosinho={addCremosinho}
            />

            <div className={styles.mt}>
              <p>Total:</p>
              <p>{formattedValue(total)}</p>
            </div>

            <Button type="submit" disabled={total === 0} fullWidth mt={20}>
              Finalizar
            </Button>
          </div>
        </main>
      </div>
    </form>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    console.log(ctx.query);

    const result = await Promise.all([
      
      getUsuarios()
    ]);

    const formattedUserResponse = result[0].map((user) => ({
      label: user.nome,
      value: String(user.id),
    }));

    return {
      props: {
        allUsuario: formattedUserResponse,
      },
    };
  } catch {
    return {
      props: {
        allEntregador: [],
      },
    };
  }
}

export default Dashboard;