import { Center, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { authTabs, getCurrentTab } from "../constants";
import { useRouteNavigation } from "src/hooks";
import { useLocation } from "react-router-dom";

export const AuthTabs: React.FC = () => {
  const location = useLocation();
  const views = authTabs.map((tab) => tab.label);

  const navigateToRegister = useRouteNavigation(authTabs[0].route);
  const navigateToLogin = useRouteNavigation(authTabs[1].route);

  const currentTab = getCurrentTab(authTabs, location);

  const handleTabChange = (newValue: string) => {
    if (newValue === views[0]) {
      navigateToRegister();
    } else if (newValue === views[1]) {
      navigateToLogin();
    }
  };

  return (
    <>
      <Stack align="center" justify="center" gap="3" mt="xl">
        <Title order={2} fs="italic" ta="center" c="brand" fw={700}>
          Join SkillSwap
        </Title>
        <Text ta="center" c="dimmed" size="md" fw="350" mb="sm">
          your learning journey starts here!
        </Text>
        <Center w="100%" maw={450}>
          <SegmentedControl
            data={views}
            value={currentTab}
            onChange={handleTabChange}
            size="md"
            radius="xl"
            color="brand"
            w="80%"
            mb="xl"
          />
        </Center>
      </Stack>
    </>
  );
};
