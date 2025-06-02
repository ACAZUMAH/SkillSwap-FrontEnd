import { Drawer, NavLink } from "@mantine/core";
import React from "react";
import { routerEndPoints } from "src/constants";
import { useRouteNavigation } from "src/hooks";

interface AuthDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export const AuthDrawwer: React.FC<AuthDrawerProps> = ({ opened, onClose }) => {
  const naviggateToRegister = useRouteNavigation(routerEndPoints.register);
  const naviggateToLogin = useRouteNavigation(routerEndPoints.login);

  return (
    <>
      <Drawer opened={opened} onClose={onClose} position="right" size="xs" title="Authentication">
        <NavLink
          label="Sign Up"
          onClick={() => {
            naviggateToRegister();
            onClose();
          }}
          component="a"
        />
        <NavLink
          label="Sign In"
          onClick={() => {
            naviggateToLogin()
            onClose();
          }}
          component="a"
        />
      </Drawer>
    </>
  );
};
