import { Center, Box, Image, Grid, Title, Text, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AuthTabs } from "./components/AuthTabs";
import collaborate from "../../assets/images/collaborate3.png";
import { useMediaQuery } from "@mantine/hooks";
import { Conditional } from "src/components";

export const Authentication: React.FC = () => {
  const mobileView = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <Conditional condition={mobileView}>
        <>
          <AuthTabs />
          <Stack align="center" justify="center">
            <Outlet />
          </Stack>
        </>
      </Conditional>
      <Conditional condition={!mobileView}>
        <Grid gutter={0} h="100%">
          <Grid.Col span={{ base: 12, md: 6.5 }} p="xl">
            <Box>
              <AuthTabs />
              <Center>
                <Outlet />
              </Center>
            </Box>
          </Grid.Col>
          <Grid.Col
            span={{ base: 0, md: 5.5 }}
            bg="brand"
            h="100vh"
            visibleFrom="md"
          >
            <Box p="xl" h="100%">
              <Image src={collaborate} w="100%" />
              <Title c="white" ta="center" mt="xl" order={3}>
                Connect, Learn, and Grow Together
              </Title>
              <Text c="gray.5" ta="center" mt="xs" size="md">
                Share your skills, learn from others, and build a community of
                mutual growth.
              </Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Conditional>
    </>
  );
};
