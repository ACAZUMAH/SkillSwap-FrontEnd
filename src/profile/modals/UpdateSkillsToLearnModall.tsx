import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Conditional } from "src/components";
import { SkillsForm } from "./SkillsForm";
import { SkillsTable } from "./SkillsTable";
import { useUpdateSkillForm } from "../hooks/useUpdateSkillForm";
import { User } from "src/interfaces";
import { useSkillsActions } from "../hooks/useSkillsActions";
import { cleanGraphQLInput } from "../helpers";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";

interface UpdateSkillsToLearnModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdateSkillsToLearnModal: React.FC<
  UpdateSkillsToLearnModalProps
> = ({ opened, onClose, user }) => {
  const [learnForm, setLearnForm] = useState(false);
  const form = useUpdateSkillForm(user);
  const { updateUser, loading } = useUpdateUserProfileMutation();
  const {
    skillsToLearn,
    setSkillsToLearn,
    skillsToLearnLevel,
    setSkillsToLearnLevel,
    addSkillsToLearn,
    removeSkillsToLearn,
  } = useSkillsActions(form);

  useEffect(() => {
    if (!form.values.skillsToLearn?.length) {
      setLearnForm(true);
    }
  }, [form]);

  const handleUpdate = async () => {
    const update = await updateUser({
      skillsToLearn: cleanGraphQLInput(form.values.skillsToLearn),
    });

    if (update?.id) {
      form.resetForm();
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} opened={opened} title="Skills to Learn" size="lg">
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

      <Group justify="flex-end" mt="lg">
        <Button radius="xl" onClick={handleUpdate} loading={loading}>
          Save Changes
        </Button>
      </Group>
    </Modal>
  );
};
