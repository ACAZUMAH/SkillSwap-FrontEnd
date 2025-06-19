import { Divider, Drawer, NavLink, Text } from "@mantine/core";
import React from "react";
import { MainDrawerProps } from "../interfaces";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export const MainDrawer: React.FC<MainDrawerProps> = ({ opened, onClose }) => {
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
      <NavLink label="Profile" leftSection={<IconUser stroke={1.5} />} p="sm" />
      <Divider />
      <NavLink
        label="Setting"
        leftSection={<IconSettings stroke={1.5} />}
        p="sm"
      />
      <Divider />
      <NavLink
        label="Logout"
        c="red"
        leftSection={<IconLogout stroke={1.5} />}
        p="sm"
      />
    </Drawer>
  );
};
