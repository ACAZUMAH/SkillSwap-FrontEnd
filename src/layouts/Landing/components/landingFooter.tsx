import {
  ActionIcon,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandFacebook, IconBrandX, IconMail } from "@tabler/icons-react";
import React from "react";
import { useAppSettings } from "src/hooks";

export const AuthFooter: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  return (
    <>
      <Container size="80%" pt={10}>
        <Group justify="space-between" mt={30} mb={20}>
          <Box maw={300}>
            <Stack gap={15}>
              <Title c="brand" fs="italic" order={1}>
                SkillSwap
              </Title>
              <Group>
                <ActionIcon
                  component="a"
                  href=""
                  target="_blank"
                  variant="outline"
                  radius="xl"
                  size="lg"
                  p={5}
                >
                  <IconBrandFacebook />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href=""
                  target="_blank"
                  variant="outline"
                  radius="xl"
                  size="lg"
                  p={5}
                >
                  <IconMail />
                </ActionIcon>
                <ActionIcon
                  component="a"
                  href=""
                  target="_blank"
                  variant="outline"
                  radius="xl"
                  size="lg"
                  p={5}
                >
                  <IconBrandX />
                </ActionIcon>
              </Group>
            </Stack>
          </Box>
          <Group justify="space-between" gap={40}>
            <Stack mt={20} mb={20} gap={5}>
              <Title order={3} mb={10} c="brand">
                Company
              </Title>
              <Text>About Us</Text>
              <Text>Blog</Text>
              <Text>Careers</Text>
            </Stack>
            <Stack mt={20} mb={20} gap={5}>
              <Title order={3} mb={10} c="brand">
                Quick Links
              </Title>
              <Text>Contact Us</Text>
              <Text>Press</Text>
              <Text>Help Center</Text>
            </Stack>
            <Stack mt={20} mb={20} gap={5}>
              <Title order={3} mb={10} c="brand">
                Resources
              </Title>
              <Text>Privacy Policy</Text>
              <Text>Terms of Service</Text>
              <Text>Community Guidelines</Text>
            </Stack>
          </Group>
        </Group>
        <Divider size="md" color={isDarkMode ? "gray.0" : "dark.8"} />
        <Group justify="space-between" mt={20} mb={30}>
          <Text>Copyright. All Right Reserved</Text>

          <Flex direction="row" gap={20}>
            <Text>Privacy Policy</Text>
            <Divider
              orientation="vertical"
              size="md"
              color={isDarkMode ? "gray.0" : "dark.8"}
            />
            <Text>Terms of Service</Text>
          </Flex>
        </Group>
      </Container>
    </>
  );
};
