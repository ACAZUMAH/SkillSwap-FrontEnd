import { createTheme, MantineProvider } from "@mantine/core";
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
        {children}
      </MantineProvider>
    </>
  );
};
