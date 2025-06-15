import { Drawer } from "@mantine/core";
import React from "react";
import { MainDrawerProps } from "../interfaces";

export const MainDrawer: React.FC<MainDrawerProps> = ({ opened, onClose }) => {
  return (
    <Drawer opened={opened} onClose={onClose} size="100%" padding="xl" position="left">
      MainDrawer
    </Drawer>
  );
};
