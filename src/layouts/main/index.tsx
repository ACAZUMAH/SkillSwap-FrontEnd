import { AppShell } from "@mantine/core";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "src/components";
import { MainHeader } from "./components/MainHeader";
import { routerEndPoints } from "src/constants";

export const Mainlayout: React.FC = () => {
  const location = useLocation();

  const height = useMemo(() => {
    if (location.pathname === routerEndPoints.PROFILE) {
      return 80;
    } else {
      return 125;
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
      <AppShell.Footer pos="relative">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
