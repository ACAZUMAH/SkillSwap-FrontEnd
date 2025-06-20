import {
  ActionIcon,
  Anchor,
  Box,
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
import React, { useMemo } from "react";
import { Conditional } from "src/components";
import { useAppSettings, useRouteNavigation } from "src/hooks";
import classes from "../styles/index.module.css";
import { HeaderTabs } from "./HeaderTabs";
import { MainDrawer } from "./MainDrawer";
import { SearchDropdown } from "./SearchDropdown";
import { MainDropdown } from "./MainDropdown";
import { useLocation } from "react-router-dom";
import { routerEndPoints } from "src/constants";

export const MainHeader: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const [openedSearch, SetOpenedSearch] = React.useState(false);
  const navigateToChats = useRouteNavigation(routerEndPoints.CHAT);
  const settings = useAppSettings();
  const location = useLocation();

  const showTabs = useMemo(() => {
    const currentPath = location.pathname;
    return (
      currentPath !== routerEndPoints.PROFILE &&
      currentPath !== routerEndPoints.CHAT && 
      !currentPath.startsWith(routerEndPoints.USER.replace(":id", ""))
    );
  }, [location.pathname]);

  return (
    <div className={classes.header}>
      <Container w="100%" maw={1400} h="100%">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" align="center" gap="xl">
            <Burger
              hiddenFrom="md"
              size="md"
              lineSize={2}
              onClick={() => setOpened(true)}
            />
            <Anchor underline="never" href="/home">
              <Title c="brand" fs="italic" order={1} size={35}>
                SkillSwap
              </Title>
            </Anchor>
            <TextInput
              flex={1}
              w={500}
              size="md"
              radius="xl"
              visibleFrom="md"
              placeholder="Search for skills, users, or topics..."
              rightSection={<IconSearch stroke={1.5} />}
            />
          </Group>

          <Group justify="space-between" align="center" gap="lg">
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
            <ActionIcon
              variant="light"
              radius="xl"
              size="md"
              onClick={navigateToChats}
            >
              <IconBrandMessenger size={50} stroke={1.5} />
            </ActionIcon>
            <Tooltip label="Search" position="bottom" withArrow>
              <ActionIcon hiddenFrom="md" variant="light" radius="xl" size="md">
                <IconSearch
                  stroke={1.5}
                  onClick={() => SetOpenedSearch(true)}
                />
              </ActionIcon>
            </Tooltip>
            <Box visibleFrom="md">
              <MainDropdown />
            </Box>
          </Group>
        </Group>
        <Conditional
          condition={showTabs}
        >
          <HeaderTabs />
        </Conditional>
        <MainDrawer opened={opened} onClose={() => setOpened(!opened)} />
        <SearchDropdown
          opened={openedSearch}
          onClose={() => SetOpenedSearch(!openedSearch)}
        />
      </Container>
    </div>
  );
};
