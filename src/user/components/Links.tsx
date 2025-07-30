import { Anchor, Group, Paper, Text } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { User } from "src/interfaces";

interface LinksProps {
  user: User;
}

export const Links: React.FC<LinksProps> = ({ user }) => {
  return (
    <Paper withBorder shadow="0" p="sm" h="100%" w="100%" radius="md" mt="lg">
      <Conditional condition={Boolean(user.phoneNumber)}>
        <Anchor underline="hover" href={user?.linkedIn!} target="_blank">
          <Group gap="xs" mb="xs">
            <IconPhone size={20} />
            <Text>phone number</Text>
          </Group>
        </Anchor>
      </Conditional>

      <Conditional condition={Boolean(user.email)}>
        <Anchor
          underline="hover"
          href={`mailto:${user?.email}`}
          target="_blank"
        >
          <Group gap="xs" mb="xs">
            <IconMail size={20} />
            <Text>Email</Text>
          </Group>
        </Anchor>
      </Conditional>

      <Conditional condition={Boolean(user?.linkedIn)}>
        <Anchor underline="hover" href={user?.linkedIn!} target="_blank">
          <Group gap="xs" mb="xs">
            <IconBrandLinkedin size={20} />
            <Text>LinkedIn</Text>
          </Group>
        </Anchor>
      </Conditional>

      <Conditional condition={Boolean(user?.gitHub)}>
        <Anchor underline="hover" href={user?.gitHub!} target="_blank">
          <Group gap="xs" mb="xs">
            <IconBrandGithub size={20} />
            <Text>GitHub</Text>
          </Group>
        </Anchor>
      </Conditional>

      <Conditional condition={Boolean(user?.portfolio)}>
        <Anchor underline="hover" href={user?.portfolio!} target="_blank">
          <Group gap="xs" mb="xs">
            <IconWorld size={20} />
            <Text>Portfolio</Text>
          </Group>
        </Anchor>
      </Conditional>
    </Paper>
  );
};
