import { Button, Card, Grid, Group, Select, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Swap, User } from "src/interfaces";
import { createSelectSkillsData } from "../helpers";
import { useAddSessionForm } from "../hooks/useAddSessionForm";
import { useUpdateSwapMutation } from "../hooks/useUpdateSwapMutation";

interface ScheduleSessionFormProps {
  swapData: Swap;
  user: User;
  close: () => void;
}

export const ScheduleSessionForm: React.FC<ScheduleSessionFormProps> = ({
  swapData,
  user,
  close,
}) => {
  const form = useAddSessionForm();
  const { handleUpdateSwap, loading } = useUpdateSwapMutation();

  const handleAddSession = async () => {
    const newSession = {
      skill: form.values.skill,
      receivedBy: form.values.receivedBy,
      date: form.values.date,
      time: form.values.time,
    };

    const updatedSwap = await handleUpdateSwap({
      id: swapData.id,
      sessions: [
        {
          taughtBy:
            swapData.senderId === newSession.receivedBy
              ? swapData.receiverId
              : swapData.senderId,
          ...newSession,
        },
      ],
    });

    if (updatedSwap) {
      form.resetForm();
      close();
    }
  };

  return (
    <>
      <Card withBorder>
        <Text size="lg" fw={600} mb="md">
          Schedule New Session
        </Text>
        <Grid>
          <Grid.Col span={6}>
            <Select
              label="Skill"
              name="skill"
              placeholder="Select skill to teach"
              data={createSelectSkillsData(
                (swapData?.skills || []).filter((s) => s !== null)
              )}
              value={form.values.skill}
              onChange={(value) => form.setFieldValue("skill", value)}
              onBlur={form.handleBlur}
              error={form.touched.skill && form.errors.skill}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Student"
              placeholder="Select student"
              data={[
                {
                  value: swapData?.senderId!,
                  label:
                    swapData?.senderId! === user?.id
                      ? `You`
                      : `${swapData?.sender?.firstName} ${swapData?.sender?.lastName}`,
                },
                {
                  value: swapData?.receiverId!,
                  label:
                    swapData?.receiverId! === user?.id
                      ? `You`
                      : `${swapData?.receiver?.firstName} ${swapData?.receiver?.lastName}`,
                },
              ]}
              value={form.values.receivedBy}
              onChange={(value) => form.setFieldValue("receivedBy", value)}
              onBlur={form.handleBlur}
              error={form.touched.receivedBy && form.errors.receivedBy}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Date"
              name="date"
              placeholder="Select date"
              value={form.values.date}
              onChange={(value) => {
                if (value) form.setFieldValue("date", new Date(value));
              }}
              onBlur={form.handleBlur}
              error={form.touched.date && (form.errors.date as string)}
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TimeInput
              label="Time"
              name="time"
              placeholder="Select time"
              value={form.values.time}
              onChange={(e) => {
                form.setFieldValue("time", e.currentTarget.value);
              }}
              onBlur={form.handleBlur}
              error={form.touched.time && form.errors.time}
              required
            />
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="lg">
          <Button variant="outline" radius="xl" onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconPlus size={16} />}
            radius="xl"
            onClick={handleAddSession}
            loading={loading}
            disabled={!form.isValid || loading}
          >
            Schedule Session
          </Button>
        </Group>
      </Card>
    </>
  );
};
