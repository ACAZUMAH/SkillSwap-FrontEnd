import { Group, Paper, Text } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import React from "react";
import { SwappedSkill } from "src/interfaces";

interface SkillPairsProps {
  skills?: Array<SwappedSkill | null> | null;
  senderId: string;
  receiverId: string;
}

export const SkillPairs: React.FC<SkillPairsProps> = ({
  skills,
  senderId,
  receiverId,
}) => {
  const senderSkills = skills?.filter((skill) => skill?.By === senderId) || [];
  const receiverSkills =
    skills?.filter((skill) => skill?.By === receiverId) || [];
  const maxLength = Math.max(senderSkills.length, receiverSkills.length);

  return (
    <>
      {Array.from({ length: maxLength }).map((_, index) => (
        <Paper key={index} p="sm" withBorder>
          <Group justify="space-between">
            <Group>
              {senderSkills[index] && (
                <>
                  <Text>{senderSkills[index]?.name}</Text>
                  <IconBook size={16} />
                </>
              )}
            </Group>
            <Text c="dimmed">↔</Text>
            <Group>
              {receiverSkills[index] && (
                <>
                  <IconBook size={16} />
                  <Text>{receiverSkills[index]?.name}</Text>
                </>
              )}
            </Group>
          </Group>
        </Paper>
      ))}
    </>
  );
};
