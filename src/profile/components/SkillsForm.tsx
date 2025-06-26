import { Button, Group, Select, TextInput } from "@mantine/core";
import React from "react";
import { leveldata } from "src/helpers";

interface SkillsFormProps {
  skill: string;
  setSkill: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  addSkill: () => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skill,
  setSkill,
  level,
  setLevel,
  addSkill,
}) => {
  return (
    <Group align="flex-end" gap="xs" mt="md" mx="4px">
      <TextInput
        flex={4}
        placeholder="Enter skill name e.g Java"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <Select
        flex={4}
        placeholder="Select skill level"
        data={leveldata}
        value={level}
        onChange={(value) => setLevel(value || "")}
      />
      <Button onClick={addSkill} flex={1}>
        Add
      </Button>
    </Group>
  );
};
