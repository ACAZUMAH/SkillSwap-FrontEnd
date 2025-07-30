import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Group,
  rem,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconPencil,
  IconPlus,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { UpdateAditionalInfo } from "../modals/UpdateAditionalInfo";
import { AdditionalInfoProps } from "../interfaces";

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const showDetials = Boolean(
    user?.bio || user?.linkedIn || user?.gitHub || user?.portfolio
  );

  const showLinks = Boolean(user?.linkedIn || user?.gitHub || user?.portfolio);

  return (
    <>
      <Card mt="xl" padding="md" radius="md" withBorder>
        <Conditional condition={showDetials}>
          <Tooltip label="Edit" withArrow>
            <ActionIcon
              onClick={open}
              variant="transparent"
              style={{
                position: "absolute",
                top: rem(10),
                right: rem(10),
                zIndex: 1,
              }}
              aria-label="Edit profile"
              mb="sm"
            >
              <IconPencil size={18} />
            </ActionIcon>
          </Tooltip>
        </Conditional>
        <Title order={4} mb="md">
          Additional Information
        </Title>

        <Conditional condition={showDetials}>
          <Conditional condition={Boolean(user?.bio)}>
            <Text mb="md" mt="md">
              {user?.bio}
            </Text>
          </Conditional>

          <Conditional condition={showLinks}>
            <Text mb="md" mt="md">
              Links
            </Text>
            <Conditional condition={Boolean(user?.linkedIn)}>
              <Anchor
                mb="md"
                underline="hover"
                href={user?.linkedIn!}
                target="_blank"
              >
                <Group gap="xs">
                  <IconBrandLinkedin size={20} />
                  <Text>LinkedIn</Text>
                </Group>
              </Anchor>
            </Conditional>
            <Conditional condition={Boolean(user?.gitHub)}>
              <Anchor
                mb="md"
                underline="hover"
                href={user?.gitHub!}
                target="_blank"
              >
                <Group gap="xs">
                  <IconBrandGithub size={20} />
                  <Text>GitHub</Text>
                </Group>
              </Anchor>
            </Conditional>
            <Conditional condition={Boolean(user?.portfolio)}>
              <Anchor
                mb="md"
                underline="hover"
                href={user?.portfolio!}
                target="_blank"
              >
                <Group gap="xs">
                  <IconWorld size={20} />
                  <Text>Portfolio</Text>
                </Group>
              </Anchor>
            </Conditional>
          </Conditional>
        </Conditional>

        <Conditional condition={!showDetials}>
          <Text>
            Help other swappers get know you better by describing more about
            your self and sharing other links.
          </Text>
          <Button
            variant="outline"
            mt="lg"
            radius="xl"
            size="md"
            leftSection={<IconPlus size={16} />}
            onClick={open}
          >
            Add Additional info
          </Button>
        </Conditional>
      </Card>
      <UpdateAditionalInfo opened={opened} onClose={close} user={user} />
    </>
  );
};
