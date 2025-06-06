import { Container, Center, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AuthTabs } from "./components/AuthTabs";

export const Authentication: React.FC = () => {
  return (
    <Container size="sm" px="xl" py="xl">
      <Center w="100%" h="80vh">
        <Stack gap="1" >
          <AuthTabs />
          <Outlet />
        </Stack>
      </Center>
    </Container>
  );
};
