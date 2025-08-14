import {
  Button,
  Card,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import { Swap } from "src/interfaces";
import { createSelectSkillsData } from "../helpers";
import { useAddTimeTableForm } from "../hooks/useAddTimeTableForm";
import { useAppAuthentication } from "src/hooks";
import { useUpdateSwapMutation } from "../hooks/useUpdateSwapMutation";

interface TimeTableFormProps {
  swapData?: Swap;
  close: () => void;
}

export const TimeTableForm: React.FC<TimeTableFormProps> = ({
  swapData,
  close,
}) => {
  const { user } = useAppAuthentication();
  const form = useAddTimeTableForm();
  const { handleUpdateSwap, loading } = useUpdateSwapMutation();

  const handleAddTimeTable = async () => {
    const newTimeTable = {
      skill: form.values.skill,
      taughtBy: form.values.taughtBy,
      dayOfweek: form.values.dayOfweek,
      time: form.values.time,
      durationInWeeks: form.values.durationInWeeks,
      startDate: form.values.startDate,
    };

    const updatedSwap = await handleUpdateSwap({
      id: swapData?.id!,
      timeTable: [newTimeTable],
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
          Add New Timetable
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              mb="xs"
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
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              mb="xs"
              label="Taught By"
              name="taughtBy"
              placeholder="Select teacher"
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
              value={form.values.taughtBy}
              onChange={(value) => form.setFieldValue("taughtBy", value)}
              onBlur={form.handleBlur}
              error={form.touched.taughtBy && form.errors.taughtBy}
              required
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              mb="xs"
              label="Day of Week"
              name="dayOfweek"
              placeholder="Select day"
              data={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              value={form.values.dayOfweek}
              onChange={(value) => form.setFieldValue("dayOfweek", value)}
              onBlur={form.handleBlur}
              error={form.touched.dayOfweek && form.errors.dayOfweek}
              required
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TimeInput
              label="Time"
              name="time"
              value={form.values.time}
              onChange={(e) =>
                form.setFieldValue("time", e.currentTarget.value)
              }
              placeholder="Select time"
              onBlur={form.handleBlur}
              error={form.touched.time && form.errors.time}
              required
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <NumberInput
              label="Duration (weeks)"
              name="durationInWeeks"
              placeholder="Enter duration in weeks"
              min={1}
              max={52}
              value={form.values.durationInWeeks}
              onChange={(value) => form.setFieldValue("durationInWeeks", value)}
              onBlur={form.handleBlur}
              error={
                form.touched.durationInWeeks && form.errors.durationInWeeks
              }
              required
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <DateInput
              label="Start Date"
              name="startDate"
              placeholder="Select start date"
              value={form.values.startDate}
              onChange={(value) => { 
                if(value) form.setFieldValue("startDate", new Date(value))
              }}
              onBlur={form.handleBlur}
              error={form.touched.startDate && form.errors.startDate as string}
              required
            />
          </Grid.Col>
        </Grid>
        <Group justify="flex-end" mt="lg">
          <Button
            variant="outline"
            radius="xl"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<IconPlus size={16} />}
            radius="xl"
            onClick={handleAddTimeTable}
            disabled={!form.isValid || loading}
            loading={loading}
          >
            Add Timetable
          </Button>
        </Group>
      </Card>
    </>
  );
};
