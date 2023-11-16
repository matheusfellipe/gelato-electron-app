import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ActionIcon, Button, Switch, Table, Text } from '@mantine/core'
import { Layout } from '../../components/Layout'
import { AddSabor } from '../../components/AddSabor'
import styles from "./styles.module.scss";
import { ISabor, ISaborType, deleteSabor, getSabores, postSabor, putSabor } from '../../services/sabor.service'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals'

const ths = (
  <tr>
    <th>Nome</th>
    <th>Ativo</th>
    <th>Ações</th>
  </tr>
);



const SaborPage = () => {
  const [sabor, setSabor] = useState<ISaborType[]>();

  const fetchUsuario = async () => {
    try {
      const response = await getSabores();
      console.log("🚀 ~ file: index.tsx:37 ~ fetchUsuario ~ response:", response)
      setSabor(response);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  const rows = sabor?.map((element) => (
    <tr key={element.id}>
      <td>{element.descricao}</td>
      <td>   <Switch
        checked={element.ativo}
        onChange={(value) => handleToggle(element.id, value)}
      /></td>
    
      <td >
        <ActionIcon onClick={() => modalUpdate(element)} size={20} color="blue">
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          onClick={() => openDeleteModal(element.id, element.descricao)}
          size={20}
          color="red"
        >
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  ));

  const handleToggle = (id, value) => {
   console.log("🚀 ~ file: index.tsx:63 ~ handleToggle ~ id, value:", id, value)
   
  };
  
  const addUsuario = async (data: ISabor) => {
    console.log("🚀 ~ file: index.tsx:32 ~ addUsuario ~ data:", data)
    try {
      await postSabor(data);
      showNotification({
        title: 'Sucesso',
        message: 'Usuário cadastrado com sucesso',
      })
      closeAllModals();
      // const response = await getUsuario();
      // setUsuario(response);
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
  children: <AddSabor onClose={closeAllModals} onSubmit={addUsuario} />,
});

const updateDeliveryMan = async (data: ISaborType) => {
  console.log("🚀 ~ file: index.tsx:100 ~ updateDeliveryMan ~ data:", data)
  console.log("🚀 ~ file: index.tsx:106 ~ updateDeliveryMan ~ data.id:", data.id)
  try {
    await putSabor({
      ...data,
      
    },data.id);
    
    closeAllModals();
    const response = await getSabores();
    setSabor(response);
  } catch (error) {
    console.log(error);
  }
};

const modalUpdate = (data: ISaborType) => {
  console.log("🚀 ~ file: index.tsx:115 ~ modalUpdate ~ data:", data)
  
  openModal({
    title: "Editar Entregador",
    centered: true,
    radius: "md",
    children: (
      <AddSabor
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
    await deleteSabor(id);
    const response = await getSabores();
    closeAllModals();
    setSabor(response);
  } catch (error) {
    console.log(error);
  }
};

const openDeleteModal = (id: number, name: string) =>

openConfirmModal({
  title: "Excluir Entregador",
  centered: true,
  children: <Text size="sm">Deletar o sabor "{name}" ?</Text>,
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
        <div className={styles.containerModal}>

      
        <Button onClick={modalAdd} color="blue" size="md">Adcionar Sabor</Button>
          <Table striped highlightOnHover  withColumnBorders  className={styles.table}>
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
          </Table>
        </div>
   
       
      </Layout>
    </React.Fragment>
  )
}

export default SaborPage
