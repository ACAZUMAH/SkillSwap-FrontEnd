import { Paper, ScrollArea, Tabs } from "@mantine/core";
import React from "react";
import { headerItems } from "../constants";
import { HeaderTabsItem } from "./HeaderTabsItem";
import classes from "../styles/index.module.css";

export const HeaderTabs: React.FC = () => {
  return (
    <ScrollArea scrollbars="x" scrollbarSize={0}>
      <Paper className={classes.paper}>
        <Tabs defaultValue={headerItems[0].route} classNames={{ list: classes.tabsList }}>
          <Tabs.List>
            {headerItems.map((item, i) => (
              <HeaderTabsItem {...item} key={i} />
            ))}
          </Tabs.List>
        </Tabs>
      </Paper>
    </ScrollArea>
  );
};
