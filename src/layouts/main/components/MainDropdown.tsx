import { Anchor, Avatar, Divider, Menu, Text } from "@mantine/core";
import {
  IconChalkboard,
  IconCode,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { routerEndPoints } from "src/constants";
import { getInitialsNameLatter } from "src/helpers";
import {
  useAppAuthentication,
  useAppChats,
  useRouteNavigation,
} from "src/hooks";

export const MainDropdown: React.FC = () => {
  const { user, logoutUser } = useAppAuthentication();
  const { resetChats } = useAppChats();
  const navigateToLanding = useRouteNavigation(routerEndPoints.ROOT);
  const navigateToProfile = useRouteNavigation(routerEndPoints.PROFILE);
  const navigateToSettings = useRouteNavigation(routerEndPoints.SETTINGS);
  const navigateToWhiteBoard = useRouteNavigation(routerEndPoints.WHITEBOARD);
  const navigateToCodeEditor = useRouteNavigation(routerEndPoints.CODE_EDITOR);

  return (
    <Menu trigger="hover" width={230} offset={10}>
      <Menu.Target>
        <Anchor component="div" style={{ textDecoration: "none" }}>
          <Avatar
            src={user?.profile_img}
            style={{
              background: "#1f5de5",
              borderRadius: "var(--mantine-radius-xl)",
              cursor: "pointer",
            }}
            size="sm"
          >
            <Text c="white" fw="bold" size="xl">
              {getInitialsNameLatter(user?.firstName!)}
            </Text>
          </Avatar>
        </Anchor>
      </Menu.Target>
      <Menu.Dropdown p="md">
        <Menu.Item
          leftSection={<IconUser stroke={1.5} />}
          onClick={navigateToProfile}
          mb="xs"
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings stroke={1.5} />}
          onClick={navigateToSettings}
          mb="xs"
        >
          Settings
        </Menu.Item>
        <Divider />
        <Menu.Label>Tools</Menu.Label>
        <Menu.Item
          leftSection={<IconChalkboard stroke={1.5} />}
          onClick={navigateToWhiteBoard}
          mb="xs"
        >
          WhiteBoard
        </Menu.Item>
        <Menu.Item
          leftSection={<IconCode stroke={1.5} />}
          onClick={navigateToCodeEditor}
          mb="sm"
        >
          Code Editor
        </Menu.Item>
        <Divider />
        <Menu.Item
          leftSection={<IconLogout stroke={1.5} />}
          color="red"
          onClick={() => {
            logoutUser();
            resetChats();
            navigateToLanding();
          }}
          mt="xs"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
