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
import { FC, useEffect, useState } from "react";
import { AddProduto } from "../../components/AddProduto";
import { showNotification } from '@mantine/notifications';
import {

  IProduto,
  IProdutoType,
  getProdutos,
 
} from "../../services/produto.service"
import { convertMoney } from "../../utils/string";
import styles from "./styles.module.scss";
import { onlyNumbers } from "../../utils/number";
import { Layout } from "../../components/Layout";
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
  allProduto: IProdutoType[];
}

const Product: FC<ProductProps> = () => {
  const [produto, setProduto] =
    useState<IProdutoType[]>();

    const fetchProdutos = async () => {
      try {
        const response = await getProdutos();
        setProduto(response);
        console.log("🚀 ~ file: index.tsx:49 ~ fetchProdutos ~ response:", response)
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };
  
    useEffect(() => {
      fetchProdutos();
    }, []);

    const rows = produto?.map((element) => (
      <tr key={element.id}>
        <td>{element.sabor}</td>
        <td>{convertMoney(element.vlr_unitario)}</td>
        <td>{element.qtd_estoque}</td>
        <td className={styles.tableFlex}>
          <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            onClick={() => openDeleteModal(element.id, element.sabor)}
            size={20}
            color="red"
          >
            <IconTrash />
          </ActionIcon>
        </td>
      </tr>
    ));

  const addProduct = async (data: IProduto) => {
 

    try {
      // await postproduto({
      //   ...data,
      //   inativo: "f",
      //   vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      // });
      showNotification({
        title: 'Sucesso',
        message: 'produto cadastrado com sucesso',
      })
      closeAllModals();
      // const response = await getproduto();
      // setProduto(response);
    } catch (error) {
      showNotification({
        title: 'Erro',
        message: 'Erro ao cadastrar o produto',
      })
      console.log(error);
    }
  };

  const updateProduct = async (data: IProduto) => {
    try {
      // await putproduto({
      //   ...data,
      //   vlr_unitario: onlyNumbers(data.vlr_unitario) / 100,
      // });
      closeAllModals();
      // const response = await getproduto();
      // setProduto(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modalUpdate = (data: IProduto) =>
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
      // await deleteproduto(id);
      // const response = await getproduto();
      closeAllModals();
      // setProduto(response);
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
        <div className={styles.containerModal}>
          <Button onClick={modalAdd} color="blue" size="md">
            Adicionar
          </Button>
          <Table striped highlightOnHover  withColumnBorders  className={styles.table}>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </main>
    </Layout>
  );
};



export default Product;