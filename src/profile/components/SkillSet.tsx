import {
  ActionIcon,
  Badge,
  Card,
  Flex,
  Group,
  rem,
  Title,
} from "@mantine/core";
import { IconCode, IconInfoCircle, IconPencil } from "@tabler/icons-react";
import React from "react";
import { leveldata } from "src/helpers";
import { User } from "src/interfaces";
import { UpdateProficientSkillsModal } from "../modals/UpdateProficientSkillsModal";
import { useDisclosure } from "@mantine/hooks";
import { UpdateSkillsToLearnModal } from "../modals/UpdateSkillsToLearnModall";

interface SkillSetProps {
  user?: User;
}

export const SkillSet: React.FC<SkillSetProps> = ({ user }) => {
  const [
    opennedProfficient,
    { open: openProfficient, close: closeProfficient },
  ] = useDisclosure(false);
  const [openedToLearn, { open: openToLearn, close: closeToLearn }] =
    useDisclosure(false);
  return (
    <>
      <Title order={3} mb="md">
        Skills Set
      </Title>

      <Card mb="xl" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Flex align="center">
            <Title order={4}>Proficient Skills</Title>
            <IconInfoCircle
              stroke={1.5}
              size={20}
              color="blue"
              style={{ marginLeft: "2px" }}
            />
          </Flex>
          <ActionIcon
            onClick={openProfficient}
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
        </Group>

        <Group>
          {user?.skillsProficientAt?.map((skill) => (
            <Badge
              key={skill?.id}
              c="blue"
              variant="light"
              size="lg"
              radius="xl"
              leftSection={<IconCode size={16} stroke={1.5} />}
            >
              Name: {skill?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(skill?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Card>

      <Card mb="md" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Flex align="center">
            <Title order={4}>Skills To Learn</Title>
            <IconInfoCircle
              stroke={1.5}
              size={20}
              color="blue"
              style={{ marginLeft: "2px" }}
            />
          </Flex>

          <ActionIcon
            onClick={openToLearn}
            variant="transparent"
            style={{
              position: "absolute",
              top: rem(10),
              right: rem(10),
              zIndex: 1,
            }}
            aria-label="Edit profile"
          >
            <IconPencil size={18} />
          </ActionIcon>
        </Group>

        <Group>
          {user?.skillsToLearn?.map((skill) => (
            <Badge
              key={skill?.id}
              c="green"
              variant="light"
              size="lg"
              radius="xl"
              leftSection={<IconCode size={16} stroke={1.5} />}
            >
              Name: {skill?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(skill?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Card>

      <UpdateProficientSkillsModal
        opened={opennedProfficient}
        onClose={closeProfficient}
        user={user}
      />

      <UpdateSkillsToLearnModal
        opened={openedToLearn}
        onClose={closeToLearn}
        user={user}
      />
    </>
  );
};
