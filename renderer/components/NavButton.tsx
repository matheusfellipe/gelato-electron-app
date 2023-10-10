import { Group, Button } from '@mantine/core';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export const  ButtonNavigation = ()=> {

  const rotas = [
    {
      label:'produto',
      value:'/home'
    },
    {
      label:'sabor',
      value:'/sabor'
    },
    {
      label:'cliente',
      value:'/cliente'
    },
  ]


  const {asPath,pathname} = useRouter();
  console.log(asPath);
  console.log(pathname);
  return (
    <Group justify="center">
      <Button leftSection={<IconPhoto size={14} />} >
        Produto
      </Button>

      <Button leftSection={<IconDownload size={14} />}>Sabor</Button>

      <Button
       
        leftSection={<IconPhoto size={14} />}
        
      >
        Cliente
      </Button>
    </Group>
  );
}