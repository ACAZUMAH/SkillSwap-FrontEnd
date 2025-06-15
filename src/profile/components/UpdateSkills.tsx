import {
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useUpdateSkillForm } from "../hooks/useUpdateSkillForm";
import { useAppAuthentication } from "src/hooks";
import { SkillsGroup } from "./SkillsGroup";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const UpdateSkills: React.FC<Props> = ({ opened, onClose }) => {
  const { user } = useAppAuthentication();
  const form = useUpdateSkillForm(user);
  const [proficientSkills, setProficientSkills] = React.useState("");
  const [proficientSkillLevel, setProficientSkillLevel] = React.useState(1);
  const [skillsToLearn, setSkillsToLearn] = React.useState("");
  const [skillsToLearnLevel, setSkillsToLearnLevel] = React.useState(1);

  const addProficientSkills = () => {
    if (proficientSkills.trim() === "") return;

    form.setFieldValue("skillsProficientAt", [
      ...form.values.skillsProficientAt,
      { name: proficientSkills, level: proficientSkillLevel },
    ]);
    setProficientSkills("");
  };

  const addSkillsToLearn = () => {
    if (skillsToLearn.trim() === "") return;

    form.setFieldValue("skillsToLearn", [
      ...form.values.skillsToLearn,
      { name: skillsToLearn, level: skillsToLearnLevel },
    ]);
    setSkillsToLearn("");
  };

  const removeProficientSkills = (index: number) => {
    const update = form.values.skillsProficientAt.filter((_, i) => i !== index);
    form.setFieldValue("skillsProficientAt", update)
  };

  const removeSkillsToLearn = (index: number) => {
    const update = form.values.skillsToLearn.filter((_, i) => i !== index);
    form.setFieldValue("skillsToLearn", update)
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update Your Skills"
      size="70%"
    >
      <Group align="flex-start" grow>
        <Paper p="xs" withBorder>
          <Text>List the skills you are proficient in.</Text>
          <Group my="md" gap="sm">
            {form.values.skillsProficientAt.map((skill, index) => (
              <SkillsGroup
                key={index}
                skill={skill!}
                remove={() => removeProficientSkills(index)}
              />
            ))}
          </Group>
          <Group align="flex-end" gap="xs" mt="md">
            <TextInput
              flex={3}
              label="Skill"
              placeholder="Enter skill name e.g Java"
              value={proficientSkills}
              onChange={(e) => setProficientSkills(e.target.value)}
            />
            <NumberInput
              min={1}
              max={3}
              flex={1}
              label="Level"
              placeholder="Enter skill level e.g 1-3"
              value={proficientSkillLevel}
              onChange={(value) => setProficientSkillLevel(Number(value))}
            />
            <Button onClick={addProficientSkills} flex={1} radius="xl">
              Add
            </Button>
          </Group>
        </Paper>
        <Paper p="xs" withBorder>
          <Text>List the skills you are interested in learning.</Text>
          <Group my="md" gap="sm">
            {form.values.skillsToLearn.map((skill, index) => (
              <SkillsGroup
                key={index}
                skill={skill!}
                remove={() => removeSkillsToLearn(index)}
              />
            ))}
          </Group>
          <Group align="flex-end" gap="sm" mt="md">
            <TextInput
              flex={3}
              label="Skill"
              placeholder="Enter skill name e.g Java"
              value={skillsToLearn}
              onChange={(e) => setSkillsToLearn(e.target.value)}
            />
            <NumberInput
              min={1}
              max={3}
              flex={1}
              label="Level"
              placeholder="Enter skill level e.g 1-3"
              value={skillsToLearnLevel}
              onChange={(value) => setSkillsToLearnLevel(Number(value))}
            />
            <Button flex={1} onClick={addSkillsToLearn} radius="xl">
              Add
            </Button>
          </Group>
        </Paper>
      </Group>
      <Flex justify="flex-end" mt="lg">
        <Button radius="xl">Save</Button>
      </Flex>
    </Modal>
  );
};
