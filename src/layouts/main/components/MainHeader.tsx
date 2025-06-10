import {
  ActionIcon,
  Anchor,
  Burger,
  Container,
  Group,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconBrandMessenger,
  IconMoon,
  IconSearch,
  IconSunHigh,
} from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { useAppSettings } from "src/hooks";
import classes from "../styles/index.module.css";
import { HeaderTabs } from "./HeaderTabs";

export const MainHeader: React.FC = () => {
  const settings = useAppSettings();
  return (
    <div className={classes.header}>
      <Container w="100%" maw={1450} h="100%">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" align="center" gap="xl">
            <Burger hiddenFrom="lg" size="md" lineSize={2} />
            <Anchor underline="never" href="/home">
              <Title c="brand" fs="italic" order={1} size={30}>
                SkillSwap
              </Title>
            </Anchor>
            <TextInput
              flex={1}
              w={500}
              radius="xl"
              visibleFrom="lg"
              placeholder="Search for skills, users, or topics..."
              rightSection={<IconSearch stroke={1.5} />}
            />
          </Group>

          <Group justify="space-between" align="center" gap="md">
            <ActionIcon
              aria-label="toggle theme"
              size="md"
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
            <ActionIcon variant="light" radius="xl" size="md" visibleFrom="lg">
              <IconBrandMessenger size={50} stroke={1.5} />
            </ActionIcon>
            <Tooltip label="Search" position="bottom" withArrow>
              <ActionIcon hiddenFrom="lg" variant="light" radius="xl" size="md">
                <IconSearch stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <HeaderTabs />
      </Container>
    </div>
  );
};
