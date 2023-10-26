import React from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { SaborModal } from '../../components/AddSabor'
import { CustomTable } from '../../components/Table/Table'
import styles from "./styles.module.scss";


const SaborPage = () => {


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
              array={[{
                id: 1,
                nome: 'testeasdasdasdasdasdasdadasdasdasd',
                ativo: 'Não',
                id_usuario: 1

              }]}
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
