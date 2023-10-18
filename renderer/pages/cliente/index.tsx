import React from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { SaborModal } from '../../components/SaborModal'
import { AddUsuario } from '../../components/AddCliente'


const ClientePage= () => {
  

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
    <Layout >
      <div>
      <AddUsuario onSubmit={function (data: any): void {
                      throw new Error('Function not implemented.')
                  } } onClose={function (): void {
                      throw new Error('Function not implemented.')
                  } }/>
      </div>
    </Layout>
    </React.Fragment>
  )
}

export default ClientePage
