import React from 'react'
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app'
import '../styles/globals.scss'


import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({

});

export default function MyApp({ Component, pageProps }: AppProps) {


  return (

    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>

  )
}
