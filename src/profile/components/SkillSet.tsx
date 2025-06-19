import {
  Fieldset,
  Group,
  NumberInput,
  Paper,
  TagsInput,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";

export const SkillSet: React.FC = () => {
//   const [proficientSkill, setProficientSkill] = React.useState({});
//   const [skillsToLearn, setSkillsToLearn] = React.useState({});

//   const addProficientSkill = () => {};
//   const addSkillsToLearn = () => {};

//   const updateProficientSkill = () => {};

//   const updateSkillsToLearn = () => {};

  return (
    <>
      <Paper p="md" withBorder>
        <Text>
          Please provide your skills and interests. This information will help
          us understand your expertise and areas you want to improve.
        </Text>
        <Fieldset legend="Skills Proficient At" mb="md" mt="md">
          <Group>
            <TextInput
              name="skillsProficientAt"
              label="Skills Proficient At"
              placeholder="Enter skills you are proficient at"
            />
            <NumberInput
              name="skillLevel"
              label="Skill Level"
              placeholder="Enter your skill level"
            />
          </Group>
        </Fieldset>

        <Fieldset legend="Skills to Learn" mb="md">
          <Group>
            <TextInput
              name="skillsToLearn"
              label="Skills to Learn"
              placeholder="Enter skills you want to learn"
            />
            <NumberInput
              name="learningPriority"
              label="Learning Priority"
              placeholder="Enter priority for learning this skill"
            />
          </Group>
        </Fieldset>

        <TagsInput
          mt="md"
          name="avilability"
          label="Availability"
          placeholder="Enter your availability"
        />
      </Paper>
    </>
  );
};
