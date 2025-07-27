import { Alert, Group, Paper, Text, Title } from "@mantine/core";
import { IconSchool } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { formatDate } from "src/helpers/date";
import { Education } from "src/interfaces";

interface EducationInfoProps {
  educationalInfo?: Education;
}

export const EducationInfo: React.FC<EducationInfoProps> = ({
  educationalInfo,
}) => {
  return (
    <Paper shadow="0" p="xs" mt="lg" h="100%" w="100%" withBorder radius="md">
      <Title order={2} c="dimmed" mb="sm">
        Education
      </Title>
      <Conditional condition={Boolean(educationalInfo)}>
        <Group gap="xs">
          <IconSchool size={24} stroke={1.5} />
          <Text tt="uppercase" fw={500}>
            {educationalInfo?.institution}
          </Text>
        </Group>
        <Text c="dimmed" mt="xs">
          {educationalInfo?.degree} in, {educationalInfo?.fieldOfStudy}, {educationalInfo?.level}
        </Text>
        <Text c="dimmed" mt="xs">
          {formatDate(educationalInfo?.startDate)} -{" "}
          {formatDate(educationalInfo?.endDate)}
        </Text>
      </Conditional>
      <Conditional condition={!educationalInfo}>
        <Alert>
          <Text size="md">No education information available</Text>
        </Alert>
      </Conditional>
    </Paper>
  );
};
