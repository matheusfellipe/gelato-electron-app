import React from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../../components/Layout'
import { SaborModal } from '../../components/SaborModal'


const SaborPage= () => {
  

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
    <Layout >
      <div>
      <SaborModal descricao={''} ativo={false}/>
      </div>
    </Layout>
    </React.Fragment>
  )
}

export default SaborPage
