import React from "react";
import {
  Badge,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import background from "../../../assets/images/backround.png";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "../../styles/index.module.css";

export const HeroSection: React.FC = () => {
  return (
    <>
      <Group justify="space-between" gap={0} visibleFrom="lg">
        <Stack ml={170} style={{ maxWidth: "50%" }} gap={5}>
          <Text size="3rem" fw={900} lh={1.1}>
            <span style={{ color: "#1f5de5" }}>Share</span> Your Expertise.
            <br />
            <span style={{ color: "#fd7e14" }}>Gain</span> New Skills.
          </Text>
          <Text size="lg" mt={20} fw={500}>
            Teach your skills, learn new ones -{" "}
            <span style={{ color: "#228be6" }}>no money needed</span>
          </Text>

          <Group mt="md" gap="sm">
            <Badge variant="filled" size="lg">
              1. Find a partner
            </Badge>
            <Badge variant="filled" size="lg">
              2. Schedule a swap
            </Badge>
            <Badge variant="filled" size="lg">
              3. Learn & Grow
            </Badge>
          </Group>

          <Group mt={20}>
            <Button radius="xl" size="md" rightSection={<IconArrowRight />}>
              Get Started
            </Button>
            <Button radius="xl" size="md" variant="light">
              How It Works
            </Button>
          </Group>
        </Stack>
        <Image
          src={background}
          h={390}
          w="42%"
          fit="cover"
          className={classes.hero}
        />
      </Group>
      <Container w="100%" maw={1450} hiddenFrom="lg" py={60}>
        <Stack gap={3}>
          <Text size="3rem" fw={700} lh={1} ta="center" mt={30}>
            <span style={{ color: "#1f5de5" }}>Share</span> Your Expertise.
            <br />
            <span style={{ color: "#fd7e14" }}>Gain</span> New Skills.
          </Text>

          <Text size="lg" mt={20} fw={300} ta="center">
            Teach your skills, learn new ones -{" "}
            <span style={{ color: "#228be6" }}>no money needed</span>
          </Text>

          <Group mt="md" gap="sm" justify="center">
            <Badge variant="filled" size="sm">
              1. Find a partner
            </Badge>
            <Badge variant="filled" size="sm">
              2. Schedule a swap
            </Badge>
            <Badge variant="filled" size="sm">
              3. Learn & Grow
            </Badge>
          </Group>

          <Group mt={20} justify="center">
            <Button radius="xl" size="sm" rightSection={<IconArrowRight />}>
              Get Started
            </Button>
            <Button radius="xl" size="sm" variant="light">
              How It Works
            </Button>
          </Group>
        </Stack>
      </Container>
    </>
  );
};
