import { Tabs, Text } from "@mantine/core";
import React from "react";
import { HeaderTabsItemProps } from "../interfaces";

export const HeaderTabsItem: React.FC<HeaderTabsItemProps> = ({ label, route }) => {
  return (
    <>
      <Tabs.Tab value={route}>
        <Text size="lg">{label}</Text>
      </Tabs.Tab>
    </>
  );
};
