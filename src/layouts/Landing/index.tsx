import { AppShell } from "@mantine/core";
import { AuthHeader } from "./components/landingHeader";
import { Outlet } from "react-router-dom";
import { Footer } from "src/components";

export const LandingLayout = () => {
  return (
    <>
      <AppShell header={{ height: 70 }}>
        <AppShell.Header>
            <AuthHeader />
        </AppShell.Header>
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
        <AppShell.Footer pos="relative">
            <Footer />
        </AppShell.Footer>
      </AppShell>
    </>
  );
};
