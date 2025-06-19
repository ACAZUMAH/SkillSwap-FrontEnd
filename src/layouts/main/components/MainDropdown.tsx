import { Anchor, Avatar, Divider, Group, Menu, Text } from "@mantine/core";
import {
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
  useRouteNavigation,
} from "src/hooks";

export const MainDropdown: React.FC = () => {
  const { user, logoutUser } = useAppAuthentication();
  const navigateToLanding = useRouteNavigation(routerEndPoints.ROOT);

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
            <IconChevronDown stroke={1.5} color="white" />
          </Group>
        </Anchor>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconUser stroke={1.5} />} p="xs">
          Profile
        </Menu.Item>
        <Divider />
        <Menu.Item leftSection={<IconSettings stroke={1.5} />} p="xs">
          Settings
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
