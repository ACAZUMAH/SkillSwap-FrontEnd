import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  rem,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconPencil,
  IconPlus,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { User } from "src/interfaces";

interface AdditionalInfoProps {
  user?: User;
}
export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ user }) => {
  const showDetials = Boolean(
    user?.bio || user?.linkedIn || user?.gitHub || user?.portfolio
  );
  return (
    <Card mt="xl" padding="md" radius="md" withBorder>
      <Conditional condition={showDetials}>
        <ActionIcon
          onClick={() => {}}
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
      </Conditional>
      <Title order={4} mb="md">
        Additional Information
      </Title>

      <Conditional condition={showDetials}>
        <Text mb="md">{user?.bio}</Text>

        <Text mb="md">Links</Text>
        <Anchor
          mb="md"
          underline="hover"
          href={user?.linkedIn!}
          target="_blank"
        >
          <IconBrandLinkedin size={16} />
          {user?.linkedIn}
        </Anchor>
        <Anchor mb="md" underline="hover" href={user?.gitHub!} target="_blank">
          <IconBrandGithub size={16} />
          {user?.gitHub}
        </Anchor>
        <Anchor
          mb="md"
          underline="hover"
          href={user?.portfolio!}
          target="_blank"
        >
          <IconWorld size={16} />
          {user?.portfolio}
        </Anchor>
      </Conditional>

      <Conditional condition={!showDetials}>
        <Text>
          Help other swappers get know you better by describing more about your self and
          sharing other links.
        </Text>
        <Button
          variant="outline"
          mt="lg"
          radius="xl"
          size="md"
          leftSection={<IconPlus size={16} />}
        >
          Add Additional info
        </Button>
      </Conditional>
    </Card>
  );
};
