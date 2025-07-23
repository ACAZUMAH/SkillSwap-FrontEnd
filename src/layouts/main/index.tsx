import { AppShell } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Conditional, Footer } from "src/components";
import { MainHeader } from "./components/MainHeader";
import { routerEndPoints } from "src/constants";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { useGetAllChatsQuery } from "src/chats/hooks/useGetAllChatsQuery";
import { SubscriptionProvider } from "src/providers";

export const Mainlayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAppAuthentication();
  const { chatsLoaded, loadInitialChats } = useAppChats();
  const { chats } = useGetAllChatsQuery(!user || chatsLoaded);
  const height = useMemo(() => {
    const currentPath = location.pathname;
    if (
      currentPath === routerEndPoints.PROFILE ||
      currentPath === routerEndPoints.CHAT ||
      currentPath === routerEndPoints.SETTINGS ||
      currentPath === routerEndPoints.WHITEBOARD ||
      currentPath.startsWith(routerEndPoints.USER.replace(":id", "")) ||
      `${currentPath}${location.search}`.startsWith(`/home/?query=`)
    ) {
      return 70;
    } else {
      return 110;
    }
  }, [location.pathname]);

  const isChatRoute = useMemo(() => {
    return location.pathname.startsWith(routerEndPoints.CHAT);
  }, [location.pathname]);

  useEffect(() => {
    if (user && !chatsLoaded && chats && Object.keys(chats).length > 0) {
      loadInitialChats(chats.filter((chat) => chat !== null));
    }
  }, [user, chats, chatsLoaded, loadInitialChats]);

  return (
    <SubscriptionProvider>
      <AppShell header={{ height: height }}>
        <AppShell.Header>
          <MainHeader />
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <Conditional condition={!isChatRoute}>
          <AppShell.Footer pos="relative">
            <Footer />
          </AppShell.Footer>
        </Conditional>
      </AppShell>
    </SubscriptionProvider>
  );
};
