import { Anchor, Divider, Menu, } from "@mantine/core";
import {
  IconChalkboard,
  IconCode,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { UserAvatar } from "src/components/Avatar/UserAvatar";
import { routerEndPoints } from "src/constants";
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
          <UserAvatar url={user?.profile_img!} name={user?.firstName!} size="sm" />
        </Anchor>
      </Menu.Target>
      <Menu.Dropdown p="md">
        <Menu.Item
          leftSection={<IconUser stroke={1.5} />}
          onClick={navigateToProfile}
          mb="4px"
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSettings stroke={1.5} />}
          onClick={navigateToSettings}
          mb="4px"
        >
          Settings
        </Menu.Item>
        <Divider />
        <Menu.Label>Tools</Menu.Label>
        <Menu.Item
          leftSection={<IconChalkboard stroke={1.5} />}
          onClick={navigateToWhiteBoard}
          mb="4px"
        >
          WhiteBoard
        </Menu.Item>
        <Menu.Item
          leftSection={<IconCode stroke={1.5} />}
          onClick={navigateToCodeEditor}
          mb="4px"
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
          mt="4px"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
