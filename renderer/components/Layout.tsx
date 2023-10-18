import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';

import { Children, FC, ReactNode } from 'react';
import { IconClick } from '@tabler/icons-react';
import { ButtonNavigation } from './NavButton';


export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}

      padding="md"
    >
      <AppShell.Header >
        <Group h="100%" px="md" wrap='nowrap' style={{
          overflow: 'visible',
          maxWidth: '100%',
          overflowY: 'hidden',
        }}
          mx='auto'
          maw={'1024px'}
        >
          <ButtonNavigation />
        </Group>
      </AppShell.Header>

      <AppShell.Main mx='auto'
        maw={'1024px'}>{children}</AppShell.Main>
    </AppShell>
  );
}
