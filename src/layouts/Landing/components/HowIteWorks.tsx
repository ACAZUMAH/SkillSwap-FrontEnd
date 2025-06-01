import {
  Box,
  Card,
  Center,
  Container,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAi,
  IconDeviceDesktopSearch,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import React from "react";
import { Gasture } from "src/components";
import { useAppSettings } from "src/hooks";
import classes from '../../styles/index.module.css'

export const HowIteWorks: React.FC = () => {
  const { isDarkMode } = useAppSettings();

  return (
    <>
      <Box bg={isDarkMode ? "dark.8" : "gray.0"}>
        <Container size="75%" py={60} px={16}>
          <Title order={1} fw={700} className={classes.title} px="xs">
            Smart Skill Swapping in<span style={{ color: "#1f5de5" }}> 3 Steps </span>
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={50} spacing="xl">
            <Gasture>
              <Card withBorder>
                <Center>
                  <ThemeIcon variant="light" size={90} radius="md">
                    <IconUser />
                  </ThemeIcon>
                </Center>
                <Title order={3} mt="sm" fw={500} ta="center">
                  Create Your Profile
                </Title>
                <Text size="sm" c="dimmed" ta="center" mt="xs">
                  List the skills you offer (e.g. coding) and what you
                  want to learn.
                </Text>
              </Card>
            </Gasture>
            <Gasture>
              <Card withBorder>
                <Center>
                  <ThemeIcon variant="light" size={90} radius="md">
                    <IconAi />
                  </ThemeIcon>
                </Center>
                <Title order={3} mt="sm" fw={500} ta="center">
                  Get Smart Matches
                </Title>
                <Text size="sm" c="dimmed" ta="center" mt="xs">
                  Our AI suggests partners based on your skills and learning
                  goals.
                </Text>
              </Card>
            </Gasture>
            <Gasture>
              <Card withBorder>
                <Center>
                  <ThemeIcon variant="light" size={90} radius="md">
                    <IconDeviceDesktopSearch />
                  </ThemeIcon>
                </Center>
                <Title order={3} mt="sm" fw={500} ta="center">
                  Find a Match
                </Title>
                <Text size="sm" c="dimmed" ta="center" mt="xs">
                  Browse or search for partners with complementary skills.
                </Text>
              </Card>
            </Gasture>
            <Gasture>
              <Card withBorder>
                <Center>
                  <ThemeIcon variant="light" size={90} radius="md">
                    <IconUsersGroup />
                  </ThemeIcon>
                </Center>
                <Title order={3} mt="sm" fw={500} ta="center">
                  Start Swapping
                </Title>
                <Text size="sm" c="dimmed" ta="center" mt="xs">
                  Schedule sessions and exchange knowledge—no money needed!
                </Text>
              </Card>
            </Gasture>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};
