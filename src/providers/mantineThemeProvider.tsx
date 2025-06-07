import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { useAppSettings } from "src/hooks";

interface Props {
  children: React.ReactNode;
}

export const MantineThemeProvider: React.FC<Props> = ({ children }) => {
  const settings = useAppSettings();

  const theme = createTheme(settings.themeObject);

  return (
    <>
      <MantineProvider theme={theme} forceColorScheme={settings.colorScheme}>
        <Notifications position="top-right"/>
        {children}
      </MantineProvider>
    </>
  );
};
