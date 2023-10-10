import React from 'react'
import Head from 'next/head'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Layout } from '../components/Layout'


function Home() {
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)
  const handleClick = () => setOpen(true)

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
    <Layout >
      <Button> Teste</Button>
    </Layout>
    </React.Fragment>
  )
}

export default Home
