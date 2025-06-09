import {
  ActionIcon,
  Anchor,
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
import { useAppSettings } from "src/hooks";
import { AuthDrawwer } from "./AuthDrawwer";

export const AuthHeader: React.FC = () => {
  const settings = useAppSettings();

  const [openned, setOpened] = useState(false);

  //const naviggateToRegister = useRouteNavigation(routerEndPoints.register);

  //const naviggateToLogin = useRouteNavigation(routerEndPoints.login);

  return (
    <>
      <Container h="100%" fluid px="3rem">
        <Group justify="space-between" h="100%">
          <Anchor underline="never" href="/">
            <Title c="brand" fs="italic" order={1}>
              SkillSwap
            </Title>
          </Anchor>
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
              <Burger onClick={() => setOpened(!openned)} />
            </Box>
            <Group visibleFrom="md">
              <Button
                component="a"
                target="_blank"
                radius="xl"
                href={routerEndPoints.SIGNUP}
                // onClick={naviggateToRegister}
              >
                Sign Up
              </Button>
              <Button
                component="a"
                target="_blank"
                variant="outline"
                radius="xl"
                href={routerEndPoints.SIGNIN}
                // onClick={naviggateToLogin}
              >
                Sign In
              </Button>
            </Group>
          </Group>
        </Group>
        <AuthDrawwer opened={openned} onClose={() => setOpened(!openned)} />
      </Container>
    </>
  );
};
