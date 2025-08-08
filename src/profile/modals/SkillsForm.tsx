import { Button, Group, Select, TextInput } from "@mantine/core";
import React from "react";
import { CapitalizeFirstLetter, leveldata } from "src/helpers";
import { SkillsFormProps } from "../interfaces";


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
        radius="xl"
        placeholder="Enter skill name e.g Java"
        value={skill}
        onChange={(e) => setSkill(CapitalizeFirstLetter(e.target.value))}
      />
      <Select
        flex={4}
        radius="xl"
        placeholder="Select skill level"
        data={leveldata}
        value={level}
        onChange={(value) => setLevel(value || "")}
      />
      <Button radius="xl" onClick={addSkill} flex={1}>
        Add
      </Button>
    </Group>
  );
};
