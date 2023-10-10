import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';

import { FC, ReactNode } from 'react';
import { IconClick } from '@tabler/icons-react';
import { ButtonNavigation } from './NavButton';


export const Layout:FC<{children: ReactNode}>=() => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ButtonNavigation/>
        </Group>
      </AppShell.Header>
     
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
