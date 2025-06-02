import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Title,
} from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import React, { useState } from "react";
import { Conditional } from "src/components";
import { routerEndPoints } from "src/constants";
import { useAppSettings, useRouteNavigation } from "src/hooks";
import { AuthDrawwer } from "./AuthDrawwer";

export const AuthHeader: React.FC = () => {
  const settings = useAppSettings();

 const [openned, setOpened] = useState(false)

  const naviggateToRegister = useRouteNavigation(routerEndPoints.register);

  const naviggateToLogin = useRouteNavigation(routerEndPoints.login);

  return (
    <>
      <Container h="100%" fluid px="xl" >
        <Group justify="space-between" h="100%">
          <Title c="brand" fs="italic" order={1}>
            SkillSwap
          </Title>
          <Group justify="space-between" h="100%">
            <ActionIcon
              aria-label="toggle theme"
              size="lg"
              variant="light"
              radius="xl"
              onClick={settings.toggleTheme}
            >
              <Conditional condition={settings.isDarkMode}>
                <IconSunHigh />
              </Conditional>
              <Conditional condition={!settings.isDarkMode}>
                <IconMoon />
              </Conditional>
            </ActionIcon>
            <Box hiddenFrom="md">
              <Burger onClick={() => setOpened(!openned)}/>
            </Box>
            <Group visibleFrom="md">
              <Button radius="xl" onClick={naviggateToRegister}>
                Sign Up
              </Button>
              <Button variant="outline" radius="xl" onClick={naviggateToLogin}>
                Sign In
              </Button>
            </Group>
          </Group>
        </Group>
        <AuthDrawwer opened={openned} onClose={() => setOpened(!openned)}/>
      </Container>
    </>
  );
};
