import { Group, Paper, ScrollArea } from "@mantine/core";
import React from "react";
import { headerItems } from "../constants";
import { HeaderTabsItem } from "./HeaderTabsItem";
import classes from "../styles/index.module.css";

export const HeaderTabs: React.FC = () => {
  return (
    <ScrollArea scrollbars="x" scrollbarSize={0} w="auto">
      <Paper className={classes.paper} mt="3px">
        <Group justify="flex-start" gap={20} style={{ width: "max-content" }}>
          {headerItems.map((item, index) => (
            <HeaderTabsItem {...item} key={index} />
          ))}
        </Group>
      </Paper>
    </ScrollArea>
  );
};
