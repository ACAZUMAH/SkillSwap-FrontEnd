import { AppShell } from '@mantine/core';
import React, { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { routerEndPoints } from 'src/constants';
import { MainHeader } from '../main/components/MainHeader';

export const ChatLayout: React.FC = () => {
  const location = useLocation();

  const height = useMemo(() => {
    const currentPath = location.pathname;
    if (
      currentPath === routerEndPoints.PROFILE ||
      currentPath === routerEndPoints.CHAT ||
      currentPath === routerEndPoints.SETTINGS ||
      currentPath === routerEndPoints.WHITEBOARD ||
      currentPath.startsWith(routerEndPoints.USER.replace(":id", "")) 
      || `${currentPath}${location.search}`.startsWith(`/home/?query=`)
    ) {
      return 70;
    } else {
      return 110;
    }
  }, [location.pathname]);

  return (
    <AppShell header={{ height: height }}>
      <AppShell.Header>
        <MainHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
