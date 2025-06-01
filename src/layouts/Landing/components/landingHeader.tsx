import { ActionIcon, Button, Container, Group, Title } from "@mantine/core";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { useAppSettings } from "src/hooks";

export const AuthHeader: React.FC = () => {
  const settings = useAppSettings();

  return (
    <>
      <Container h={70} size="75%">
        <Group justify="space-between" h="100%">
          <Title c="brand" fs="italic" order={1}>SkillSwap</Title>
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
            <Group>
              <Button radius="xl">sign in</Button>
              <Button variant="outline" radius="xl">sign up</Button>
            </Group>
          </Group>
        </Group>
      </Container>
    </>
  );
};
