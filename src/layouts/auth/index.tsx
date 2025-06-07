import { Center, Box, Image, Grid, Title, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AuthTabs } from "./components/AuthTabs";
import collaborate from "../../assets/images/collaborate3.png";

export const Authentication: React.FC = () => {
  return (
    <Grid gutter={0} h="100%">
      <Grid.Col span={12} p="xl" hiddenFrom="md">
        <Box>
          <AuthTabs />
          <Center>
            <Outlet />
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col span={6.5} p="xl" visibleFrom="md">
        <Box>
          <AuthTabs />
          <Center>
            <Outlet />
          </Center>
        </Box>
      </Grid.Col>
      <Grid.Col span={5.5} bg="brand" h="100vh" visibleFrom="md">
        <Box p="xl" h="100%">
          <Image src={collaborate} w="100%" />
          <Title c="white" ta="center" mt="xl" order={3} >
            Connect, Learn, and Grow Together
          </Title>
          <Text c="gray.5" ta="center" mt="xs" size="md">
            Share your skills, learn from others, and build a community of
            mutual growth.
          </Text>
        </Box>
      </Grid.Col>
    </Grid>
  );
};
