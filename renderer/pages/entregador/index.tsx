import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ActionIcon, Button, Switch, Table, Text } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { AddEntregador } from '../../components/AddEntregador'
import styles from "./styles.module.scss";
import { IEntregador, IEntregadorType, deleteEntregador, getEntregadores, postEntregador, putEntregador } from '../../services/entregador.service'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals'

const ths = (
  <tr>
    <th>Nome</th>
    <th>Telefone</th>
    <th>Ações</th>
  </tr>
);

const EntregadorPage = () => {
  const [entregadores, setEntregadores] = useState<IEntregadorType[]>();

  const fetchEntregadores = async () => {
    try {
      const response = await getEntregadores();
      setEntregadores(response);
    } catch (error) {
      console.error("Erro ao obter entregadores:", error);
    }
  };

  useEffect(() => {
    fetchEntregadores();
  }, []);

  const rows = entregadores?.map((element) => (
    <tr key={element.id}>
      <td>{element.nome}</td>
      <td>{element.telefone}</td>
      
      <td>
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id, element.nome)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));


  
  const addEntregador = async (data: IEntregador) => {
    try {
      await postEntregador(data);
      showNotification({
        title: 'Sucesso',
        message: 'Entregador cadastrado com sucesso',
      });
      closeAllModals();
      fetchEntregadores()
    } catch (error) {
      showNotification({
        title: 'Erro',
        message: 'Erro ao cadastrar entregador',
      });
      console.error("Erro ao cadastrar entregador:", error);
    }
  };
  
  const modalAdd = () =>
    openModal({
      title: "Adicionar Entregador",
      centered: true,
      radius: "md",
      children: <AddEntregador onClose={closeAllModals} onSubmit={addEntregador} />,
    });
  
  const updateEntregador = async (data: IEntregadorType) => {
    try {
      await putEntregador({
        ...data,
      }, data.id);
      closeAllModals();
      const response = await getEntregadores();
      setEntregadores(response);
    } catch (error) {
      console.error("Erro ao atualizar entregador:", error);
    }
  };
  
  const modalUpdate = (data: IEntregadorType) => {
    openModal({
      title: "Editar Entregador",
      centered: true,
      radius: "md",
      children: (
        <AddEntregador
          onClose={closeAllModals}
          onSubmit={updateEntregador}
          value={data}
        />
      ),
    });
  };
  
  const modalDeleteEntregador = async (id: number) => {
    try {
      await deleteEntregador(id);
      const response = await getEntregadores();
      closeAllModals();
      setEntregadores(response);
    } catch (error) {
      console.error("Erro ao deletar entregador:", error);
    }
  };
  
  const openDeleteModal = (id: number, name: string) =>
    openConfirmModal({
      title: "Excluir Entregador",
      centered: true,
      children: <Text size="sm">Deletar o entregador "{name}"?</Text>,
      labels: { confirm: "Excluir", cancel: "Cancelar" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("cancel"),
      onConfirm: () => modalDeleteEntregador(id),
    });
  


  return (
    <React.Fragment>
      <Head>
      <title>Entregador CRUD</title>
      </Head>
      <Layout>
        <div className={styles.containerModal}>
          <Button onClick={modalAdd} color="blue" size="md">Adicionar Entregador</Button>
          <Table striped highlightOnHover withColumnBorders className={styles.table}>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default EntregadorPage
