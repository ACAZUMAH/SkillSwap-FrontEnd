import { Badge, Card, Flex, Group, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";
import { leveldata } from "src/helpers";
import { User } from "src/interfaces";

interface SkillSetProps {
  user?: User;
}

export const SkillSet: React.FC<SkillSetProps> = ({ user }) => {
  return (
    <>
      <Title order={3} mb="md">
        Skills Set
      </Title>

      <Card mb="xl" padding="md" radius="md" withBorder>
        <Flex align="center" mb="md">
          <Title order={4}>Proficient Skills</Title>
          <IconInfoCircle stroke={1.5} size={20} color="blue" style={{ marginLeft: "2px"}}/>
        </Flex>

        <Group>
          {user?.skillsProficientAt?.map((skill) => (
            <Badge key={skill?.id} variant="default" size="lg" radius="sm">
              Name: {skill?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(skill?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Card>

      <Card mb="md" padding="md" radius="md" withBorder>
        <Flex align="center" mb="md">
          <Title order={4}>Skills To Learn</Title>
          <IconInfoCircle stroke={1.5} size={20} color="blue" style={{ marginLeft: "2px"}}/>
        </Flex>

        <Group>
          {user?.skillsToLearn?.map((skill) => (
            <Badge key={skill?.id} variant="default" size="lg" radius="sm">
              Name: {skill?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(skill?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Card>
    </>
  );
};
