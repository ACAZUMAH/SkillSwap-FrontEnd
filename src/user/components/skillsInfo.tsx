import { Badge, Box, Group, Paper, Title } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import React from "react";
import { leveldata } from "src/helpers";
import { User } from "src/interfaces";

interface SkillsInfoProps {
  user?: User;
  loading?: boolean;
}

export const SkillsInfo: React.FC<SkillsInfoProps> = ({ user }) => {
  return (
    <Box h="100%" w="100%">
      <Paper p="xs" shadow="0" withBorder>
        <Title order={2} c="dimmed" mb="md">
          Skills Offering
        </Title>
        <Group gap="md" wrap="wrap" mb="xs">
          {user?.skillsProficientAt?.map((item) => (
            <Badge
              key={item?.id}
              c="blue"
              variant="light"
              size="lg"
              radius="xl"
              leftSection={<IconCode size={16} stroke={1.5} />}
            >
              Name: {item?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(item?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Paper>
      <Paper p="xs" mt="lg" shadow="0" withBorder>
        <Title order={2} c="dimmed" mb="md">
          Skills Seeking
        </Title>
        <Group gap="md" wrap="wrap" mb="xs">
          {user?.skillsToLearn?.map((item) => (
            <Badge
              key={item?.id}
              c="green"
              variant="light"
              size="lg"
              radius="xl"
              leftSection={<IconCode size={16} stroke={1.5} />}
            >
              Name: {item?.name} Level:{" "}
              {leveldata.find((l) => l.value === String(item?.level))?.label}
            </Badge>
          ))}
        </Group>
      </Paper>
    </Box>
  );
};
