import { Divider, Modal, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Conditional } from "src/components";
import { SkillsForm } from "./SkillsForm";
import { SkillsTable } from "./SkillsTable";
import { useSkillsActions } from "../hooks/useSkillsActions";
import { useUpdateSkillForm } from "../hooks/useUpdateSkillForm";
import { User } from "src/interfaces";

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

  return (
    <Modal onClose={onClose} opened={opened} title="Proficient Skills" size="lg">
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
    </Modal>
  );
};
