import {
  ActionIcon,
  Anchor,
  Badge,
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
import React, { useEffect, useMemo } from "react";
import { Conditional } from "src/components";
import { useAppChats, useAppSettings, useRouteNavigation } from "src/hooks";
import { HeaderTabs } from "./HeaderTabs";
import { MainDrawer } from "./MainDrawer";
import { SearchDropdown } from "./SearchDropdown";
import { MainDropdown } from "./MainDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { routerEndPoints } from "src/constants";
import { useDebouncedState } from "@mantine/hooks";

export const MainHeader: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const [openedSearch, SetOpenedSearch] = React.useState(false);
  const [search, setSearch] = useDebouncedState("", 200);
  const navigateToChats = useRouteNavigation(routerEndPoints.CHAT);
  const navigateToHome = useRouteNavigation(routerEndPoints.HOME);
  const settings = useAppSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalUnreadCount, chats } = useAppChats();

  const totalCount = useMemo(() => {
    return totalUnreadCount > 10 ? "10+" : totalUnreadCount;
  }, [chats, totalUnreadCount]);

  useEffect(() => {
    if (search) {
      navigate(`/home/?query=${encodeURIComponent(search)}`);
    } else {
      navigate("/home");
    }
  }, [search]);

  const showTabs = useMemo(() => {
    const currentPath = location.pathname;
    return (
      currentPath !== routerEndPoints.PROFILE &&
      currentPath !== routerEndPoints.CHAT &&
      currentPath !== routerEndPoints.SETTINGS &&
      currentPath !== routerEndPoints.WHITEBOARD &&
      currentPath !== routerEndPoints.CODE_EDITOR &&
      !currentPath.startsWith(routerEndPoints.USER.replace(":id", "")) &&
      !`${currentPath}${location.search}`.startsWith(`/home/?query=`)
    );
  }, [location.pathname, search]);

  return (
    <Container w="100%" maw={1400} h="60%" pt={showTabs ? "3px" : "10px"}>
      <Group justify="space-between" h="100%">
        <Group justify="space-between" align="center" gap="xl">
          <Burger
            hiddenFrom="md"
            size="md"
            lineSize={2}
            onClick={() => setOpened(true)}
          />
          <Anchor underline="never" component="b" onClick={navigateToHome}>
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
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>

        <Group justify="center" align="center" gap="md">
          <ActionIcon
            aria-label="toggle theme"
            size="md"
            variant="subtle"
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
          <Tooltip label="Chats" position="bottom" withArrow>
            <Box pos="relative" style={{ cursor: "pointer" }} mt="3px">
              <ActionIcon
                variant="subtle"
                radius="xl"
                size="md"
                onClick={navigateToChats}
              >
                <IconBrandMessenger size={50} stroke={1.5} />
              </ActionIcon>
              <Conditional condition={totalUnreadCount > 0}>
                <Badge pos="absolute" top={0} right={0} size="xs" circle>
                  {totalCount}
                </Badge>
              </Conditional>
            </Box>
          </Tooltip>
          <Tooltip label="Search" position="bottom" withArrow>
            <ActionIcon hiddenFrom="md" variant="subtle" radius="xl" size="sm">
              <IconSearch stroke={1.5} onClick={() => SetOpenedSearch(true)} />
            </ActionIcon>
          </Tooltip>
          <Box visibleFrom="md">
            <MainDropdown />
          </Box>
        </Group>
      </Group>
      <Conditional condition={showTabs}>
        <HeaderTabs />
      </Conditional>
      <MainDrawer opened={opened} onClose={() => setOpened(!opened)} />
      <SearchDropdown
        opened={openedSearch}
        onClose={() => SetOpenedSearch(!openedSearch)}
        search={search}
        setSearch={setSearch}
      />
    </Container>
  );
};
