import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Conditional } from "src/components";
import { SkillsForm } from "./SkillsForm";
import { SkillsTable } from "./SkillsTable";
import { useSkillsActions } from "../hooks/useSkillsActions";
import { useUpdateSkillForm } from "../hooks/useUpdateSkillForm";
import { User } from "src/interfaces";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfileMutation";
import { cleanGraphQLInput } from "../helpers";

interface UpdateProficientSkillsModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export const UpdateProficientSkillsModal: React.FC<
  UpdateProficientSkillsModalProps
> = ({ opened, onClose, user }) => {
  const [proficientForm, setShowProfienctForm] = useState(false);
  const form = useUpdateSkillForm(user);
  const { updateUser, loading } = useUpdateUserProfileMutation();

  const {
    proficientSkills,
    setProficientSkills,
    proficientSkillLevel,
    setProficientSkillLevel,
    addProficientSkills,
    removeProficientSkills,
  } = useSkillsActions(form);

  useEffect(() => {
    if (!form.values.skillsProficientAt?.length) {
      setShowProfienctForm(true);
    }
  }, [form]);

  const handleUpdate = async () => {
    const update = await updateUser({
      skillsProficientAt: cleanGraphQLInput(form.values.skillsProficientAt),
    });

    if (update?.id) {
      form.resetForm();
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      title="Proficient Skills"
      size="lg"
    >
      <Text mt="xs" px="xs">
        List the skills you are proficient in.
      </Text>
      <Conditional condition={proficientForm}>
        <SkillsForm
          skill={proficientSkills}
          setSkill={setProficientSkills}
          level={String(proficientSkillLevel)}
          setLevel={(value: string) => setProficientSkillLevel(Number(value))}
          addSkill={() => {
            addProficientSkills();
            setShowProfienctForm(false);
          }}
        />
      </Conditional>

      <Divider mt="md" />
      <Conditional condition={form.values.skillsProficientAt.length > 0}>
        <SkillsTable
          skills={form.values.skillsProficientAt}
          remove={removeProficientSkills}
          addSkill={() => setShowProfienctForm(true)}
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
