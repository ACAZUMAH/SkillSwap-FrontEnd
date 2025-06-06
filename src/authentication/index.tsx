import { useState } from "react";
import {
  Container,
  SegmentedControl,
  Center,
  Stack,
  Title,
  Text,
  Box,
} from "@mantine/core";
import { Conditional } from "src/components";
import { Register } from "./Register";
//import { useLocation } from "react-router-dom";

export const Authentication: React.FC = () => {
  //const location = useLocation();
  const views = ["Register", "Login"];

  const [value, setValue] = useState(views[0]);
  return (
    <Container fluid px="xl" py="xl">
      <Center w="100%" h="80vh">
        <Box>
          <Stack align="center" justify="center" gap="3" mt="md">
            <Title order={2} fs="italic" ta="center" c="brand" fw={700}>
              Join SkillSwap
            </Title>
            <Text ta="center" c="dimmed" size="lg" fw="350" mb="sm">
              Connect, Learn, and Grow Together
            </Text>
          </Stack>
          <Center>
            <SegmentedControl
              data={views}
              value={value}
              onChange={setValue}
              size="md"
              radius="xl"
              color="brand"
              w="80%"
              mb="xl"
            />
          </Center>

          <Conditional condition={value === "Register"}>
            <Register />
          </Conditional>
        
        </Box>
      </Center>
    </Container>
  );
};
