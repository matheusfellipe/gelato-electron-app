import { Group, Button } from '@mantine/core';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const  ButtonNavigation = ()=> {

  const rotas = [
    {
      label:'Produto',
      value:'/home',
      icon:<IconDownload size={14}/>
    },
    {
      label:'Sabor',
      value:'/sabor',
      icon:<IconDownload size={14}/>
    },
    {
      label:'Cliente',
      value:'/cliente',
      icon:<IconDownload size={14}/>
    },
  ]


  const {asPath,pathname} = useRouter();
  console.log(asPath);
  console.log(pathname);
  return (
    <Group justify="center" >
      {
        rotas.map(({label,value,icon})=>(
          <Link key={label}  href={value}>
            <Button 
            leftSection={icon}
            variant={pathname==value?'filled':'default'}>
             {label}  
            </Button>
            </Link>
        )
        )
      }
     
    </Group>
  );
}