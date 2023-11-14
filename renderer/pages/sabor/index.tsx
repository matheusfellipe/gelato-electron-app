import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { SaborModal } from '../../components/AddSabor'
import { CustomTable } from '../../components/Table/Table'
import styles from "./styles.module.scss";
import { ISaborType, getSabores } from '../../services/sabor.service'


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

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <Layout >
        <div className={styles.containerModal}>
          {/* <SaborModal descricao={''} ativo={false} /> */}
          <div>
            <CustomTable
              array={sabor}
              editValue={function (id: number): void {
                console.log(id)
              }}
              removeValue={function (id: number): void {
                console.log(id)
              }}
              canview={function (id: number): void {
                console.log(id)
              }}
            />
          </div>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default SaborPage
