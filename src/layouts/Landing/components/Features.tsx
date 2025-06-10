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
      <Container w="100%" maw={1300} py={60}>
        <Title order={1} fw={700} className={classes.feature} px="xs" ta="end">
          <span style={{ color: "#1f5de5" }}> Core Features</span> of Our Skill
          Swapping Platform
        </Title>
        <Group align="flex-start" gap={50} mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={600}>
            <Stack gap={20}>
              <Badge variant="filled" size="lg">
                Smart Skill Matching
              </Badge>
              <Title order={1} fw={700} mt="md">
                AI-Driven Personalized Matching Skills System For Partner
                Selection 
              </Title>
              <Text size="md" maw={500} c="dimmed" mt="md">
                Our intelligent algorithm analyzes your expertise, learning
                style, and availability to connect you with the most compatible
                skill swap partners in our community.
              </Text>
            </Stack>
          </Box>
          <Box w="50%" maw={600}>
            <Image src={recommendation} h={400} w={600} radius="md" />
          </Box>
        </Group>
        <Group align="flex-start" gap={50} mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={600}>
            <Image src={chat} h={400} w={600} radius="md" />
          </Box>
          <Box w="50%" maw={600}>
            <Stack gap={20} align="flex-end">
              <Badge size="lg">Seamless Communication Tools</Badge>
              <Title order={1} fw={700} mt="md" ta="end">
                Communication Platform With File Sharing And Real-Time
                Collaboration Features
              </Title>
              <Text size="md" maw={500} c="dimmed" mt="md" ta="end">
                Connect with your skill swap partners through our chat system.
                Message, share files, or start HD video calls without ever
                leaving the platform - all designed specifically for effective
                skill exchange sessions.
              </Text>
            </Stack>
          </Box>
        </Group>
        <Group align="flex-start" gap={50} mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={600}>
            <Stack gap={20}>
              <Badge size="lg">Smart Session Scheduling</Badge>
              <Title order={1} fw={700} mt="md">
                Intelligent Scheduling System With Automated Timezone Conversion
                and Reminder Notifications
              </Title>
              <Text size="md" maw={500} c="dimmed" mt="md">
                Sync your calendar, set available hours, and automatically
                coordinate meeting times with built-in timezone conversion and
                reminder notifications.
              </Text>
            </Stack>
          </Box>
          <Box w="50%" maw={600} visibleFrom="lg">
            <Image src={session} h={400} w={600} radius="md" />
          </Box>
        </Group>
        <Group gap={50} mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={600} visibleFrom="lg">
            <Image src={whiteboard} h={400} w={600} radius="md" />
          </Box>
          <Box w="50%" maw={600}>
            <Stack align="flex-end" gap={20}>
              <Badge size="lg">Interactive Whiteboard</Badge>
              <Title order={1} fw={700} mt="md" ta="end">
                Interactive Digital Whiteboard With Multi-User Editing And
                Screen Sharing Capabilities
              </Title>
              <Text size="md" maw={500} c="dimmed" mt="md" ta="end">
                Collaborate in real-time with drawing tools, text editors, and
                screen sharing to demonstrate complex concepts during your
                learning sessions.
              </Text>
            </Stack>
          </Box>
        </Group>
        <Group gap={50}  mt={80} mb={30} visibleFrom="xl">
          <Box w="50%" maw={600}>
            <Stack gap={20}>
              <Badge variant="filled" size="lg">
                Community
              </Badge>
              <Title order={1} fw={700} mt="md">
                Engage With A Thriving Community Of Skill Swappers And
                Enthusiasts
              </Title>
              <Text size="md" maw={500} c="dimmed" mt="md">
                Join a vibrant community of learners and teachers. Share your
                experiences, ask questions, and find inspiration from others on
                their skill-swapping journeys.
              </Text>
            </Stack>
          </Box>
          <Box visibleFrom="lg">
            <Image src={community} h={400} w={600} radius="md" />
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
