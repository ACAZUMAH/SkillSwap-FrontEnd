import { AppShell } from "@mantine/core";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Conditional, Footer } from "src/components";
import { MainHeader } from "./components/MainHeader";
import { routerEndPoints } from "src/constants";
import { SocketClientProvider, SubscriptionProvider } from "src/providers";
import { IncomingVideoCall } from "src/videoCall/components/IncomingVideoCall";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";
import { VideoCallLayout } from "src/videoCall/videoLayout";
//import { VideoCallLayout } from "src/videoCall";
//import { VideoCallUI } from "src/videoCall/videoLayout";

export const Mainlayout: React.FC = () => {
  const location = useLocation();
  const { incomingVideoCall, videoCall } = useAppVideoCall();
  const height = useMemo(() => {
    const currentPath = location.pathname;
    if (
      currentPath === routerEndPoints.PROFILE ||
      currentPath === routerEndPoints.CHAT ||
      currentPath === routerEndPoints.SETTINGS ||
      currentPath === routerEndPoints.WHITEBOARD ||
      currentPath === routerEndPoints.CODE_EDITOR ||
      currentPath.startsWith(routerEndPoints.USER.replace(":id", "")) ||
      `${currentPath}${location.search}`.startsWith(`/home/?query=`)
    ) {
      return 70;
    } else {
      return 110;
    }
  }, [location.pathname]);

  const isChatRoute = useMemo(() => {
    return (
      location.pathname.startsWith(routerEndPoints.CHAT) ||
      location.pathname.startsWith(routerEndPoints.WHITEBOARD) ||
      location.pathname.startsWith(routerEndPoints.CODE_EDITOR)
    );
  }, [location.pathname]);

  return (
    <SocketClientProvider>
      <SubscriptionProvider>
        <AppShell header={{ height: height }}>
          <AppShell.Header>
            <MainHeader />
          </AppShell.Header>
          <AppShell.Main>
            <Conditional condition={Boolean(incomingVideoCall)}>
              <IncomingVideoCall />
            </Conditional>
            <Conditional condition={Boolean(videoCall?.roomId)}>
              <VideoCallLayout />
            </Conditional>
            <Conditional condition={!Boolean(videoCall?.roomId)}>
              <Outlet />
            </Conditional>
          </AppShell.Main>
          <Conditional condition={!isChatRoute}>
            <AppShell.Footer pos="relative">
              <Footer />
            </AppShell.Footer>
          </Conditional>
        </AppShell>
      </SubscriptionProvider>
    </SocketClientProvider>
  );
};
