import {
  Button,
  Group,
  Text,
} from "@mantine/core";
import React from "react";
import { UpdateSkillSetProps } from "../interfaces";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { EducationInfo } from "./EducationInfo";
import { SkillSet } from "./SkillSet";

export const OtherInfo: React.FC<UpdateSkillSetProps> = ({
  updateForm,
  handlePrevious,
  handleNext,
}) => {

  return (
    <>
      <Text fw="bold" size="lg">
        Update your educational background and skills below
      </Text>
      <Group grow align="flex-start" mt="md" gap="xl">
        <EducationInfo updateForm={updateForm} />
        <SkillSet />
      </Group>

      <Group justify="flex-end" mt="md">
        <Button
          radius="xl"
          onClick={handlePrevious}
          leftSection={<IconArrowLeft stroke={1.5} />}
        >
          Back
        </Button>
        <Button
          radius="xl"
          onClick={handleNext}
          rightSection={<IconArrowRight stroke={1.5} />}
        >
          Next
        </Button>
      </Group>
    </>
  );
};
