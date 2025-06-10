import { Anchor } from "@mantine/core";
import React from "react";
import { HeaderTabsItemProps } from "../interfaces";
import { useLocation } from "react-router-dom";
import classes from "../styles/index.module.css";
import { useRouteNavigation } from "src/hooks";

export const HeaderTabsItem: React.FC<HeaderTabsItemProps> = ({
  label,
  route,
}) => {
  const location = useLocation();
  const navigateToRoute = useRouteNavigation(route)
  return (
    <>
      <Anchor<'a'>
        href={route}
        className={classes.mainLink}
        data-active={location.pathname === route || undefined}
        onClick={(e) => {
          e.preventDefault()
          navigateToRoute()
        }}
      >
        {label}
      </Anchor>
    </>
  );
};
