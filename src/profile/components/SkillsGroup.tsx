import { Chip, Group, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { Skill } from "src/interfaces";

interface SkillsGroupProps {
  skill?: Skill;
  remove: () => void
}

export const SkillsGroup: React.FC<SkillsGroupProps> = ({ skill, remove }) => {

  return (
    <>
      <Chip
        defaultChecked
        variant="outline"
        size="md"
        icon={<IconX size={15} />}
        onClick={remove}
      >
        <Group gap="xs">
          <Text fw="bold">name: {skill?.name}</Text>
          <Text fw="bold">level: {skill?.level}</Text>
        </Group>
      </Chip>
    </>
  );
};
