import React from 'react'
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app'
import '../styles/globals.scss'


import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";



const theme = createTheme({

});

export default function MyApp({ Component, pageProps }: AppProps) {


  return (

    <MantineProvider theme={theme}>
       
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
      
    </MantineProvider>

  )
}
