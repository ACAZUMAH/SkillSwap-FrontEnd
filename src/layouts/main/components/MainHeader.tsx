import {
  ActionIcon,
  Anchor,
  Container,
  Group,
  TextInput,
  Title,
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
      <Container w="100%" maw={1450} className={classes.minSection}>
        <Group justify="space-between" h="100%">
          <Group justify="space-between" align="center" gap="xl">
            <Anchor underline="never" href="/">
              <Title c="brand" fs="italic" order={1} size={30}>
                SkillSwap
              </Title>
            </Anchor>
            <TextInput
              flex={1}
              w={500}
              radius="xl"
              size="md"
              placeholder="Search for skills, users, or topics..."
              rightSection={<IconSearch stroke={1.5} />}
            />
          </Group>

          <Group justify="space-between" align="center" gap="md">
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
            <ActionIcon variant="transparent" size="lg">
              <IconBrandMessenger size={50} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
        <HeaderTabs />
      </Container>
    </div>
  );
};
