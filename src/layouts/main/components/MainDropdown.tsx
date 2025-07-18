import { Anchor, Avatar, Divider, Group, Menu, Text } from "@mantine/core";
import {
  IconChalkboard,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { routerEndPoints } from "src/constants";
import { getInitialsNameLatter } from "src/helpers";
import {
  useAppAuthentication,
  useAppSettings,
  useRouteNavigation,
} from "src/hooks";

export const MainDropdown: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  const { user, logoutUser } = useAppAuthentication();
  const navigateToLanding = useRouteNavigation(routerEndPoints.ROOT);
  const navigateToProfile = useRouteNavigation(routerEndPoints.PROFILE);
  const navigateToSettings = useRouteNavigation(routerEndPoints.SETTINGS);
  const navigateToWhiteBoard = useRouteNavigation(routerEndPoints.WHITEBOARD);

  return (
    <Menu trigger="hover" width={230} offset={10}>
      <Menu.Target>
        <Anchor component="div" style={{ textDecoration: "none" }}>
          <Group
            gap={4}
            align="center"
            justify="center"
            style={{ cursor: "pointer" }}
          >
            <Avatar
              src={user?.profile_img}
              style={{
                background: "#1f5de5",
                borderRadius: "var(--mantine-radius-xl)",
                cursor: "pointer",
              }}
              size="md"
            >
              <Text c="white" fw="bold" size="xl">
                {getInitialsNameLatter(user?.firstName!)}
              </Text>
            </Avatar>
            <IconChevronDown
              stroke={1.5}
              color={isDarkMode ? "white" : "black"}
            />
          </Group>
        </Anchor>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconUser stroke={1.5} />}
          p="xs"
          onClick={navigateToProfile}
        >
          Profile
        </Menu.Item>
        <Divider />
        <Menu.Item
          leftSection={<IconSettings stroke={1.5} />}
          p="xs"
          onClick={navigateToSettings}
        >
          Settings
        </Menu.Item>
        <Divider />
        <Menu.Item
          leftSection={<IconChalkboard stroke={1.5} />}
          p="xs"
          onClick={navigateToWhiteBoard}
        >
          WhiteBoard
        </Menu.Item>
        <Divider />
        <Menu.Item
          leftSection={<IconLogout stroke={1.5} />}
          p="xs"
          color="red"
          onClick={() => {
            logoutUser();
            navigateToLanding();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
