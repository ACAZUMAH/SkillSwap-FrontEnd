import { Group, Paper, ScrollArea } from "@mantine/core";
import React from "react";
import { headerItems } from "../constants";
import { HeaderTabsItem } from "./HeaderTabsItem";
import classes from "../styles/index.module.css";

export const HeaderTabs: React.FC = () => {
  return (
    <ScrollArea scrollbars="x" scrollbarSize={0}>
      <Paper className={classes.paper} mt="sm">
        <Group justify="flex-start" gap={20}>
          {headerItems.map((item, index) => (
            <HeaderTabsItem {...item} key={index} />
          ))}
        </Group>
      </Paper>
    </ScrollArea>
  );
};
