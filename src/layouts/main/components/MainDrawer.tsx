import { Divider, Drawer, NavLink, Text } from "@mantine/core";
import React from "react";
import { MainDrawerProps } from "../interfaces";
import {
  IconChalkboard,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useAppAuthentication, useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";

export const MainDrawer: React.FC<MainDrawerProps> = ({ opened, onClose }) => {
  const navigateToProfile = useRouteNavigation(routerEndPoints.PROFILE);
  const navigateToSettings = useRouteNavigation(routerEndPoints.SETTINGS);
  const navigateToWhiteboard = useRouteNavigation(routerEndPoints.WHITEBOARD);
  const navigateToCode = useRouteNavigation(routerEndPoints.CODE_EDITOR);
  const { logoutUser } = useAppAuthentication();
  const navigateToLanding = useRouteNavigation(routerEndPoints.ROOT);

  const handleLogout = () => {
    logoutUser();
    navigateToLanding();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="60%"
      padding="xl"
      title={
        <Text c="brand" fs="italic" ta="center" size="xl" fw="bold">
          SkillSwap
        </Text>
      }
      position="left"
    >
      <Divider />
      <NavLink
        label="Profile"
        leftSection={<IconUser stroke={1.5} />}
        p="sm"
        onClick={navigateToProfile}
      />
      <Divider />
      <NavLink
        label="Setting"
        leftSection={<IconSettings stroke={1.5} />}
        p="sm"
        onClick={navigateToSettings}
      />
      <Divider />
      <NavLink
        label="WhiteBoard"
        leftSection={<IconChalkboard stroke={1.5} />}
        p="sm"
        onClick={navigateToWhiteboard}
      />
      <Divider />
      <NavLink
        label="Code Editor"
        leftSection={<IconChalkboard stroke={1.5} />}
        p="sm"
        onClick={navigateToCode}
      />
      <Divider />
      <NavLink
        label="Logout"
        c="red"
        leftSection={<IconLogout stroke={1.5} />}
        p="sm"
        onClick={handleLogout}
      />
    </Drawer>
  );
};
