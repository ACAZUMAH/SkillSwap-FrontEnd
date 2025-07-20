import {
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useUpdateSkillForm } from "../hooks/useUpdateSkillForm";
import { useAppAuthentication } from "src/hooks";
import { useSkillsActions } from "../hooks/useSkillsActions";
import { useUpdateSkillsMutation } from "../hooks/useUpdateSkillsMutation";
import { SkillsForm } from "./SkillsForm";
import { SkillsTable } from "./SkillsTable";
import { Conditional } from "src/components";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const UpdateSkills: React.FC<Props> = ({ opened, onClose }) => {
  const [proficientForm, setShowProfienctForm] = useState(false);
  const [learnForm, setLearnForm] = useState(false);
  const { user } = useAppAuthentication();
  const form = useUpdateSkillForm(user);
  const {
    proficientSkills,
    setProficientSkills,
    proficientSkillLevel,
    setProficientSkillLevel,
    skillsToLearn,
    setSkillsToLearn,
    skillsToLearnLevel,
    setSkillsToLearnLevel,
    addProficientSkills,
    addSkillsToLearn,
    removeProficientSkills,
    removeSkillsToLearn,
  } = useSkillsActions(form);
  const { updateUser, loading } = useUpdateSkillsMutation();

  useEffect(() => {
    if (!user?.skillsProficientAt?.length) {
      setShowProfienctForm(true);
    }
    if (!user?.skillsToLearn?.length) {
      setLearnForm(true);
    }
  }, [user]);

  const handleUpdate = async () => {
    const update = await updateUser({
      ...form.values,
    });

    if (update?.id) {
      form.resetForm();
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update Your Skills"
      size="80%"
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
    >
      <Group align="flex-start" grow>
        <Paper w="auto" withBorder>
          <Text mt="xs" px="xs">
            List the skills you are proficient in.
          </Text>
          <Conditional condition={proficientForm}>
            <SkillsForm
              skill={proficientSkills}
              setSkill={setProficientSkills}
              level={String(proficientSkillLevel)}
              setLevel={(value: string) =>
                setProficientSkillLevel(Number(value))
              }
              addSkill={() => {
                addProficientSkills();
                setShowProfienctForm(false);
              }}
            />
          </Conditional>

          <Conditional condition={form.values.skillsProficientAt.length > 0}>
            <Divider mt="md" />
            <SkillsTable
              skills={form.values.skillsProficientAt}
              remove={removeProficientSkills}
              addSkill={() => setShowProfienctForm(true)}
            />
          </Conditional>
        </Paper>
        <Paper w="auto" withBorder>
          <Text mt="xs" px="xs">
            List the skills you are interested in learning.
          </Text>
          <Conditional condition={learnForm}>
            <SkillsForm
              skill={skillsToLearn}
              setSkill={setSkillsToLearn}
              level={String(skillsToLearnLevel)}
              setLevel={(value: string) => setSkillsToLearnLevel(Number(value))}
              addSkill={() => {
                addSkillsToLearn();
                setLearnForm(false);
              }}
            />
          </Conditional>

          <Conditional condition={form.values.skillsToLearn.length > 0}>
            <Divider mt="md" />
            <SkillsTable
              skills={form.values.skillsToLearn}
              remove={removeSkillsToLearn}
              addSkill={() => setLearnForm(true)}
            />
          </Conditional>
        </Paper>
      </Group>
      <Flex justify="flex-end" mt="lg">
        <Button radius="xl" onClick={handleUpdate} loading={loading}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};
