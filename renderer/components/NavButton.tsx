import { Button } from "@mantine/core";
import { IconHome, IconIceCream, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const rotas = [
  {
    label: "Dashboard",
    value: "/dashboard",
    icon: <IconHome size={14} />,
  },
  {
    label: "Produto",
    value: "/home",
    icon: <IconHome size={14} />,
  },
  {
    label: "Venda",
    value: "/venda",
    icon: <IconHome size={14} />,
  },
  {
    label: "Sabor",
    value: "/sabor",
    icon: <IconIceCream size={14} />,
  },
  {
    label: "Cliente",
    value: "/cliente",
    icon: <IconUser size={14} />,
  },
];

export const ButtonNavigation = () => {
  const { pathname } = useRouter();

  return (
    <>
      {rotas.map(({ label, value, icon }) => (
        <Link key={label} href={value}>
          <Button
            leftSection={icon}
            variant={pathname == value ? "filled" : "default"}
          >
            {label}
          </Button>
        </Link>
      ))}
    </>
  );
};
