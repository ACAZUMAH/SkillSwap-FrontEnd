import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import chat from "../../../assets/images/chat.jpg";
import recommendation from "../../../assets/images/recommendation.jpg";
import community from "../../../assets/images/community.jpg";
import session from "../../../assets/images/session.jpg";
import whiteboard from "../../../assets/images/whiteboard.jpg";
import { IconArrowRight } from "@tabler/icons-react";
import classes from "../../styles/index.module.css";
import { FeatureResponsive } from "./FeatureResponsive";

export const Features: React.FC = () => {
  return (
    <>
      <Container size="75%" py={60}>
        <Title order={1} fw={700} className={classes.feature} px="xs" ta="end">
          <span style={{ color: "#1f5de5" }}> Core Features</span> of Our Skill
          Swapping Platform
        </Title>
        <Group justify="space-between" mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={500}>
            <Stack>
              <Badge variant="filled" size="lg">
                Smart Skill Matching
              </Badge>
              <Title order={1} fw={700}>
                AI-Driven Personalized Skill Matching System For Optimal Partner
                Selection
              </Title>
              <Text size="md" maw={500} c="dimmed">
                Our intelligent algorithm analyzes your expertise, learning
                style, and availability to connect you with the most compatible
                skill swap partners in our community.
              </Text>
            </Stack>
          </Box>
          <Box w="50%" maw={500}>
            <Image src={recommendation} h={400} w={500} radius="lg" />
          </Box>
        </Group>
        <Group justify="space-between" mt={60} mb={30} visibleFrom="xl">
          <Box w="50%" maw={500}>
            <Image src={chat} h={400} w={500} radius="lg" />
          </Box>
          <Box w="50%" maw={500}>
            <Stack>
              <Badge size="lg">Seamless Communication Tools</Badge>
              <Title order={1} fw={700}>
                Communication Platform With File Sharing And Real-Time
                Collaboration
              </Title>
              <Text size="md" maw={500} c="dimmed">
                Message, share files, or start HD video calls without ever
                leaving the platform - all designed specifically for effective
                skill exchange sessions.
              </Text>
            </Stack>
          </Box>
        </Group>
        <Group justify="space-between" mt={60} mb={30} visibleFrom="xl">
          <Box w="50%" maw={500}>
            <Stack>
              <Badge size="lg">Smart Session Scheduling</Badge>
              <Title order={1} fw={700}>
                Intelligent Scheduling System With Automated Timezone Conversion
              </Title>
              <Text size="md" maw={500} c="dimmed">
                Sync your calendar, set available hours, and automatically
                coordinate meeting times with built-in timezone conversion and
                reminder notifications.
              </Text>
            </Stack>
          </Box>
          <Box w="50%" maw={500} visibleFrom="lg">
            <Image src={session} h={400} w={500} radius="lg" />
          </Box>
        </Group>
        <Group justify="space-between" mt={60} mb={30} visibleFrom="xl">
          <Box w="50%" maw={500} visibleFrom="lg">
            <Image src={whiteboard} h={400} w={500} radius="lg" />
          </Box>
          <Box w="50%" maw={500}>
            <Stack>
              <Badge size="lg">Interactive Whiteboard</Badge>
              <Title order={1} fw={700}>
                Interactive Digital Whiteboard With Multi-User Editing And
                Screen Sharing Capabilities
              </Title>
              <Text size="md" maw={500} c="dimmed">
                Collaborate in real-time with drawing tools, text editors, and
                screen sharing to demonstrate complex concepts during your
                learning sessions.
              </Text>
            </Stack>
          </Box>
        </Group>
        <Group justify="space-between" mt={60} mb={30} visibleFrom="xl">
          <Box w="50%" maw={500}>
            <Stack>
              <Badge variant="filled" size="lg">
                Community
              </Badge>
              <Title order={1} fw={700}>
                Engage With A Thriving Community Of Skill Swappers And
                Enthusiasts
              </Title>
              <Text size="md" maw={500} c="dimmed">
                Join a vibrant community of learners and teachers. Share your
                experiences, ask questions, and find inspiration from others on
                their skill-swapping journeys.
              </Text>
            </Stack>
          </Box>
          <Box visibleFrom="lg">
            <Image src={community} h={400} w={500} radius="lg" />
          </Box>
        </Group>

        <FeatureResponsive />

        <Box ta="center" mt={80}>
          <Button size="md" radius="xl" rightSection={<IconArrowRight />}>
            Join Now
          </Button>
        </Box>
      </Container>
    </>
  );
};
