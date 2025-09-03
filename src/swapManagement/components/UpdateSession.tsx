import React from "react";
import { Button, Card, Grid, Group, Select, Text } from "@mantine/core";
import { useUpdateSessionForm } from "../hooks/useUpdateSessionForm";
import { Session, Swap, User } from "src/interfaces";
import { createSelectSkillsData } from "../helpers";
import { DateInput, TimeInput } from "@mantine/dates";
import { useUpdateSwapSessionMutation } from "../hooks/useUpdateSwapSessionMutation";

interface UpdateSessionProps {
  currentSession: Session;
  swapData: Swap;
  user: User;
  close: () => void;
}

export const UpdateSessionForm: React.FC<UpdateSessionProps> = ({
  user,
  swapData,
  close,
  currentSession
}) => {
  const form = useUpdateSessionForm(currentSession);

  const { loading, handleUpdateSwapSession } = useUpdateSwapSessionMutation()

  const handleUpdateSession = async () => {
    const res = await handleUpdateSwapSession({
        sessionId: currentSession?.id!,
        ...form.values
    })

    if(res) {
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
            radius="xl"
            onClick={handleUpdateSession}
            loading={loading}
            disabled={!form.isValid || loading}
          >
            Update Session
          </Button>
        </Group>
      </Card>
    </>
  );
};
