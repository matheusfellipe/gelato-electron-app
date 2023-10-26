import {
  ActionIcon,
  Button,

  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";

import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useState } from "react";
import { AddProduto } from "../components/AddProduto";
import { showNotification } from '@mantine/notifications';
import {

  ICremosinho,
  ICremosinhoType,
 
} from "../services/produto.service"
import { convertMoney } from "../utils/string";
import styles from "./styles.module.scss";
import { onlyNumbers } from "../utils/number";
import { Layout } from "../components/Layout";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const ths = (
  <tr>
    <th>Sabor</th>
    <th>Preço</th>
    <th>Quantidade</th>
    <th>Ações</th>
  </tr>
);
interface ProductProps {
  allCremosinho: ICremosinhoType[];
}

const Product: FC<ProductProps> = ({ allCremosinho }) => {
  const [cremosinho, setCremosinho] =
    useState<ICremosinhoType[]>(allCremosinho);

  const rows = cremosinho.map((element) => (
    <tr key={element.id_cremosinho}>
      <td>{element.sabor}</td>
      <td>{convertMoney(element.vlr_unitario)}</td>
      <td>{element.qtd_estoque}</td>
      <td className={styles.tableFlex}>
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id_cremosinho, element.sabor)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));

  const addProduct = async (data: ICremosinho) => {
    console.log((onlyNumbers(data.vlr_unitario) / 100).toFixed(0));

    try {
      // await postCremosinho({
      //   ...data,
      //   inativo: "f",
      //   vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      // });
      showNotification({
        title: 'Sucesso',
        message: 'Cremosinho cadastrado com sucesso',
      })
      closeAllModals();
      // const response = await getCremosinho();
      // setCremosinho(response);
    } catch (error) {
      showNotification({
        title: 'Erro',
        message: 'Erro ao cadastrar o cremosinho',
      })
      console.log(error);
    }
  };

  const updateProduct = async (data: ICremosinho) => {
    try {
      // await putCremosinho({
      //   ...data,
      //   vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      // });
      closeAllModals();
      // const response = await getCremosinho();
      // setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalUpdate = (data: ICremosinho) =>
    openModal({
      title: "Editar Produto",
      centered: true,
      radius: "md",
      children: (
        <AddProduto
          onClose={closeAllModals}
          onSubmit={updateProduct}
          value={data}
        />
      ),
    });

  const modalAdd = () =>
    openModal({
      title: "Adicionar Produto",
      centered: true,
      radius: "md",
      children: (
        <AddProduto onClose={closeAllModals} onSubmit={addProduct} />
      ),
    });

  const deleteProduct = async (id: number) => {
    try {
      // await deleteCremosinho(id);
      // const response = await getCremosinho();
      closeAllModals();
      // setCremosinho(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id: number, name: string) =>
    openConfirmModal({
      title: "Excluir Produto",
      centered: true,
      children: <Text size="sm">Deletar o produto "{name}" ?</Text>,
      labels: { confirm: "Excluir o produto", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => deleteProduct(id),
    });

  return (
    <Layout>
      <Head>
        <title>Produto CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
  

      <main className={styles.containerProduct}>
        <div className={styles.tableStyle}>
          <Button onClick={modalAdd} color="blue" size="md">
            Adicionar
          </Button>
          <Table striped highlightOnHover  withColumnBorders>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    // const response = await getCremosinho();

    return {
      props: {
        allCremosinho:  [
          {
            id_cremosinho: 1,
            sabor: 'Morango',
            vlr_unitario: 2.5,
            qtd_estoque: 10,
          },
          {
            id_cremosinho: 2,
            sabor: 'Chocolate',
            vlr_unitario: 3,
            qtd_estoque: 15,
          },
          // Adicione mais objetos conforme necessário
        ]
      },
    };
  } catch {
    return {
      props: {
        allCremosinho: [],
      },
    };
  }
}

export default Product;