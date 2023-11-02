import React, { useState } from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { SaborModal } from '../../components/AddSabor'
import { AddCliente } from '../../components/AddCliente'
import { GetServerSidePropsContext } from 'next'
import { IUsuario, IUsuarioType,  postUsuario } from '../../services/cliente.service'
import { closeAllModals, openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

const ths = (
  <tr>
    <th>Nome</th>
    <th>Telefone</th>
    <th>Endereço</th>
    <th>E-mail</th>
    <th>Ações</th>
  </tr>
);


const ClientePage= ({allUsuario}) => {
  console.log("🚀 ~ file: index.tsx:28 ~ ClientePage ~ allUsuario:", allUsuario)
  const [usuario, setUsuario] = useState<IUsuarioType[]>(allUsuario);

  const addUsuario = async (data: IUsuario) => {
    console.log("🚀 ~ file: index.tsx:32 ~ addUsuario ~ data:", data)
    try {
      await postUsuario(data);
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
  children: <AddCliente onClose={closeAllModals} onSubmit={addUsuario} />,
});

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
    <Layout >
      <div>
      <Button onClick={modalAdd} color="blue" size="md">Adcionar Cliente</Button>
      </div>
    </Layout>
    </React.Fragment>
  )
}





export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const response = await getUsuario();

    return {
      props: {
        allUsuario: response,
      },
    };
  } catch {
    return {
      props: {
        allUsuario: [],
      },
    };
  }
}

export default ClientePage
