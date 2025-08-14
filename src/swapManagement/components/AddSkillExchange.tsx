import { Box, Button, Group, MultiSelect, Stack, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useAppAuthentication } from "src/hooks";
import { Swap, User } from "src/interfaces";
import { useUpdateSwapMutation } from "../hooks/useUpdateSwapMutation";
import { createSelectSkillsData } from "../helpers";
import { useAddSkillsExchangeActions } from "../hooks/useSwapActions";

interface AddSkillsExchangeProps {
  swapData: Swap;
}

export const AddSkillsExchange: React.FC<AddSkillsExchangeProps> = ({
  swapData,
}) => {
  const { user } = useAppAuthentication();
  const sender = useMemo(() => swapData?.sender as User, [swapData]);
  const receiver = useMemo(() => swapData?.receiver as User, [swapData]);
  const {
    senderSkills,
    receiverSkills,
    addReceiverSkills,
    addSenderSkills,
    setReceiverSkills,
    setSenderSkills,
  } = useAddSkillsExchangeActions({ sender, receiver });
  const { handleUpdateSwap, loading } = useUpdateSwapMutation();

  const handleAddSkills = async () => {
    const skills = [...senderSkills, ...receiverSkills];
    if (skills.length === 0) return;

    const updatedSwap = await handleUpdateSwap({
      id: swapData.id,
      skills: skills,
    });

    if (updatedSwap) {
      setSenderSkills([]);
      setReceiverSkills([]);
    }
  };

  return (
    <>
      <Box>
        <Group grow>
          <Stack gap="xs">
            <Text>
              {`Skills Offered by ${
                sender.id === user?.id ? "You" : sender.firstName
              }:`}
            </Text>
            <MultiSelect
              value={senderSkills.map((skill) => skill.name)}
              onChange={addSenderSkills}
              data={createSelectSkillsData(
                (sender?.skillsProficientAt ?? []).filter((s) => s != null)
              )}
            />
          </Stack>
          <Stack gap="xs">
            <Text>
              {`Skills Offered by ${
                receiver.id === user?.id ? "You" : receiver.firstName
              }:`}
            </Text>
            <MultiSelect
              value={receiverSkills.map((skill) => skill.name)}
              onChange={addReceiverSkills}
              data={createSelectSkillsData(
                (receiver?.skillsProficientAt ?? []).filter((s) => s != null)
              )}
            />
          </Stack>
        </Group>
        <Group justify="flex-end" mt="md">
          <Button radius="xl" onClick={handleAddSkills} loading={loading}>
            Add Skills
          </Button>
        </Group>
      </Box>
    </>
  );
};
