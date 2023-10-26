
import { Button, Checkbox, Select } from "@mantine/core";

import { GetServerSidePropsContext } from "next";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Cart } from "../../components/Cart"; 

// import { ListAllCremosinho } from "../../../components/ListAllCremosinho";
import { ICremosinho } from "../../services/produto.service";
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

export interface ICremosinhoSell extends ICremosinho {
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
  id_forma_pagamento: number;
  id_entregador: number;
  id_status: number;
  id_usuario: number;
}

const Dashboard: FC<DashboardProps> = ({
  allEntregador,
  allFormaDePagamento,
  allStatus,
  allUsuario,
}) => {
  const [cremosinho, setCremosinho] = useState<ICremosinhoSell[]>([]);
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>({});

  const addCremosinho = (cremosinho: ICremosinho) =>
    setCremosinho((oldCremosinho) => [
      ...oldCremosinho,
      { ...cremosinho, qtd: 1 },
    ]);

  const addById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id_cremosinho === id
          ? { ...element, qtd: element.qtd + 1 }
          : element
      )
    );

  const removeById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.map((element) =>
        element.id_cremosinho === id
          ? { ...element, qtd: element.qtd - 1 }
          : element
      )
    );

  const deleteById = (id: number) =>
    setCremosinho((oldCremosinho) =>
      oldCremosinho.filter((element) => element.id_cremosinho !== id)
    );

  const total = cremosinho.reduce(
    (acc, element) => acc + element.qtd * Number(element.vlr_unitario),
    0
  );

  const onSubmit = async (data: IForm) => {
    const resultPerItem = cremosinho.map((item) => ({
      ...item,
      valor: Number(item.vlr_unitario) * item.qtd,
    }));
    const formattedData = { ...data, itens: resultPerItem, total };
    try {
    //   await postVenda(formattedData as any);
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
  const idEntregador = watch("id_entregador");
  const idFormaDePagamento = watch("id_forma_pagamento");
  const idStatus = watch("id_status");
  const idUsuario = watch("id_usuario");

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
                    data={allEntregador}
                    value={String(idEntregador)}
                    onChange={(e) =>
                      e !== null && setValue("id_entregador", Number(e))
                    }
                  />
                
                </>
              )}
            </div>
            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              data={allUsuario}
              value={String(idUsuario)}
              onChange={(e) => e !== null && setValue("id_usuario", Number(e))}
            ></Select>
            <Select
              label="Forma de Pagamento"
              placeholder="Selecione uma forma"
              data={allFormaDePagamento}
              value={String(idFormaDePagamento)}
              onChange={(e) =>
                e !== null && setValue("id_forma_pagamento", Number(e))
              }
            ></Select>
            <Select
              label="Status da Venda"
              placeholder="Selecione um status"
              data={allStatus}
              value={String(idStatus)}
              onChange={(e) => e !== null && setValue("id_status", Number(e))}
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

   
    return {
      props: {
      
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