import { Badge, Center, Paper, Stack, Text, Title } from "@mantine/core";
import React from "react";

export const FeatureResponsive: React.FC = () => {
  return (
    <>
      <Paper withBorder w="100%" hiddenFrom="xl" mt={80} mb={30} p="xl">
        <Stack>
          <Center>
            <Badge variant="filled" size="lg" ta="center">
              Smart Skill Matching
            </Badge>
          </Center>
          <Title order={1} fw={700} ta="center" mt="xs">
            AI-Driven Personalized Skill Matching System For Optimal Partner
            Selection
          </Title>
          <Text size="md" c="dimmed" ta="center" mt="xs">
            Our intelligent algorithm analyzes your expertise, learning style,
            and availability to connect you with the most compatible skill swap
            partners in our community.
          </Text>
        </Stack>
      </Paper>
      <Paper withBorder w="100%" hiddenFrom="xl" mt={80} mb={30} p="xl">
        <Stack>
          <Center>
            <Badge size="lg">Seamless Communication Tools</Badge>
          </Center>
          <Title order={1} fw={700} ta="center" mt="xs">
            Communication Platform With File Sharing And Real-Time Collaboration
          </Title>
          <Text size="md" c="dimmed" ta="center" mt="xs">
            Message, share files, or start HD video calls without ever leaving
            the platform - all designed specifically for effective skill
            exchange sessions.
          </Text>
        </Stack>
      </Paper>
      <Paper withBorder w="100%" hiddenFrom="xl" mt={80} mb={30} p="xl">
        <Stack>
          <Center>
            <Badge size="lg">Smart Session Scheduling</Badge>
          </Center>
          <Title order={1} fw={700} ta="center" mt="xs">
            Intelligent Scheduling System With Automated Timezone Conversion
          </Title>
          <Text size="md" c="dimmed" ta="center" mt="xs">
            Sync your calendar, set available hours, and automatically
            coordinate meeting times with built-in timezone conversion and
            reminder notifications.
          </Text>
        </Stack>
      </Paper>
      <Paper withBorder w="100%" hiddenFrom="xl" mt={80} mb={30} p="xl">
        <Stack>
          <Center>
            <Badge size="lg">Interactive Whiteboard</Badge>
          </Center>
          <Title order={1} fw={700} ta="center" mt="xs">
            Interactive Digital Whiteboard With Multi-User Editing And Screen
            Sharing Capabilities
          </Title>
          <Text size="md" c="dimmed" ta="center" mt="xs">
            Collaborate in real-time with drawing tools, text editors, and
            screen sharing to demonstrate complex concepts during your learning
            sessions.
          </Text>
        </Stack>
      </Paper>
      <Paper withBorder w="100%" hiddenFrom="xl" mt={80} mb={30} p="xl">
        <Stack>
          <Center>
            <Badge variant="filled" size="lg">
              Community
            </Badge>
          </Center>
          <Title order={1} fw={700} ta="center" mt="xs">
            Engage With A Thriving Community Of Skill Swappers And Enthusiasts
          </Title>
          <Text size="md" c="dimmed" ta="center" mt="xs">
            Join a vibrant community of learners and teachers. Share your
            experiences, ask questions, and find inspiration from others on
            their skill-swapping journeys.
          </Text>
        </Stack>
      </Paper>
    </>
  );
};
