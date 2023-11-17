import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ActionIcon, Button, Table, Text } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { AddCliente } from '../../components/AddCliente'
import { IUsuario, IUsuarioType,  deleteUsuario,  getUsuarios,  postUsuario, putUsuario } from '../../services/cliente.service'
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import styles from "./styles.module.scss";


const ths = (
  <tr>
    <th>Nome</th>
    <th>Telefone</th>
    <th>Cidade</th>
    <th>Bairro</th>
    <th>Rua</th>
    <th>Ações</th>
  </tr>
);




const ClientePage= ({allUsuario}) => {

  const [usuario, setUsuario] = useState<IUsuarioType[]>(allUsuario);

  const fetchUsuario = async () => {
    try {
      const response = await getUsuarios();
      console.log("🚀 ~ file: index.tsx:37 ~ fetchUsuario ~ response:", response)
      setUsuario(response);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const rows = usuario?.map((element) => (
    <tr key={element.id}>
      <td>{element.nome}</td>
      <td>{element.telefone}</td>
      <td>{element.cidade}</td>
      <td>{element.bairro}</td>
      <td>{element.rua}</td>
      <td >
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

  const addUsuario = async (data: IUsuario) => {
    console.log("🚀 ~ file: index.tsx:32 ~ addUsuario ~ data:", data)
    try {
      await postUsuario(data);
      showNotification({
        title: 'Sucesso',
        message: 'Usuário cadastrado com sucesso',
      })
      closeAllModals();
      fetchUsuario()
    } catch (error) {
      showNotification({
        title: 'Erro',
        message: 'Erro ao cadastrar usuário',
      })
      console.log("🚀 ~ file: index.tsx:40 ~ addUsuario ~ error:", error)
      
    }
  };

  const modalAdd = () =>
openModal({
  title: "Adicionar Usuário",
  centered: true,
  radius: "md",
  children: <AddCliente onClose={closeAllModals} onSubmit={addUsuario} />,
});

const updateDeliveryMan = async (data: IUsuarioType) => {

  try {
    await putUsuario({
      ...data,
    },data.id);
    
    closeAllModals();
    const response = await getUsuarios();
    setUsuario(response);
  } catch (error) {
    console.log(error);
  }
};

const modalUpdate = (data: IUsuarioType) => {
  
  
  openModal({
    title: "Editar Entregador",
    centered: true,
    radius: "md",
    children: (
      <AddCliente
        onClose={closeAllModals}
        onSubmit={updateDeliveryMan}
        value={data}
      />
    ),
  });
};

const deleteDeliveryMan = async (id: number) => {
  console.log("🚀 ~ file: index.tsx:130 ~ deleteDeliveryMan ~ id:", id)
  try {
    await deleteUsuario(id);
    const response = await getUsuarios();
    closeAllModals();
    setUsuario(response);
  } catch (error) {
    console.log(error);
  }
};

const openDeleteModal = (id: number, name: string) =>

openConfirmModal({
  title: "Excluir Entregador",
  centered: true,
  children: <Text size="sm">Deletar o entregador "{name}" ?</Text>,
  labels: { confirm: "Excluir", cancel: "Cancelar" },
  confirmProps: { color: "red" },
  onCancel: () => console.log("cancel"),
  onConfirm: () => deleteDeliveryMan(id),
});

  return (
    <React.Fragment>
      <Head>
        <title>Gelato Gramado App</title>
      </Head>
    <Layout >
      <div>
      <Button onClick={modalAdd} color="blue" size="md">Adcionar Cliente</Button>
      <Table striped highlightOnHover  withColumnBorders  className={styles.table}>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
      </div>
    </Layout>
    </React.Fragment>
  )
}


export default ClientePage