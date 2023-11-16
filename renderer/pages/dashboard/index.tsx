import {
    ActionIcon,
    Button,
   
    Input,
    PasswordInput,
    Table,
    TextInput,
  } from "@mantine/core";
  import Head from "next/head";
  import Link from "next/link";
  import styles from "./styles.module.scss";

  import {  IVendaItem, IVendaType, IVendaView, getVenda } from "../../services/venda.service";
  import { GetServerSidePropsContext } from "next/types";
  import { FC, useEffect, useState } from "react";

  import { formattedValue } from "../../utils/formatter";
  import { convertDate } from "../../utils/string";
  import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { IconEdit, IconTrash } from "@tabler/icons-react";

  const ths = (
    <tr>
      <th>Cliente</th>
      <th>Total da Venda</th>
      <th>Data da Venda</th>
      
      <th>Entregador</th>
    
      <th>Pago</th>
      <th>Forma de Pagamento</th>
   
      <th>Ações</th>
    </tr>
  );
  interface VendaProps {
    allVenda: IVendaView[];
  }
  
  const Dashboard: FC<VendaProps> = () => {
    const { push } = useRouter();
    const [venda, setVenda] = useState<IVendaView[]>();
 
   
 

    const fetchAllVendas = async () => {
      try {
        const response = await getVenda();
        
        setVenda(response);
        console.log("🚀 ~ file: index.tsx:52 ~ fetchAllVendas ~ response:", response)
      } catch (error) {
        console.error("Erro ao obter entregadores:", error);
      }
    };
  
    useEffect(() => {
      fetchAllVendas();
    }, []);


  
    const rows = venda?.map((element) => (
      <tr key={element?.id}>
        <td>{element?.cliente?.nome}</td>
        <td>{formattedValue(element?.valorTotal)}</td>
        <td>{convertDate(element?.dataVenda)}</td>
        <td>{element?.entregador?.nome ?? "Nenhum"}</td>
        <td>{element?.pago === true ? "Sim" : "Não"}</td>
        <td>{element?.formaPagamento?.descricao}</td>
      
        <td className={styles.tableFlex}>
          <ActionIcon
            onClick={() => push(`/dashboard/edit/${element.id}`)}
            size={20}
            color="blue"
          >
            
            <IconEdit />
          </ActionIcon>
          <ActionIcon size={20} color="red">
            <IconTrash />
          </ActionIcon>
        </td>
      </tr>
    ));
  
    return (
      <div>
        <Head>
          <title>Din Din Com</title>
          <meta name="description" content="Generated by Din Din Com" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Layout >
        <main className={styles.containerProduct}>
          <div className={styles.tableStyle}>
            <Button
              component={Link}
              href="/venda"
              color="blue"
              size="md"
            >
              Adicionar
            </Button>
            <Table striped highlightOnHover  withColumnBorders className={styles.table}>
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </main>
        </Layout>
      </div>
    );
  };
  
  export default Dashboard;
  
  