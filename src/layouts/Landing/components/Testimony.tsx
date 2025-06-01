import React from "react";
import { Avatar, Box, Group, Paper, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconQuoteFilled, IconStar } from "@tabler/icons-react";
import { IconStar as EmptyStar } from "@tabler/icons-react";
import { Conditional } from "src/components";

interface Props {
  testimony: string;
  name: string;
  skill: string;
  stars: number;
  image: string;
}

export const Testimony: React.FC<Props> = ({
  testimony,
  name,
  skill,
  stars,
  image,
}) => {
  return (
    <>
      {" "}
      <Paper withBorder p="xl" mt="md">
        <ThemeIcon variant="transparent" size={60} radius="md" mb="md">
          <IconQuoteFilled size={60} />
        </ThemeIcon>
        <Text size="lg" fw="bold" c="dimmed" mb="md">
          "{testimony}"
        </Text>

        <Group mb="md">
          <Avatar src={image} size={60} />
          <Stack gap={0}>
            <Text fw={600}>{name}</Text>
            <Text c="dimmed">{skill}</Text>
            <Group mt="xs" gap={5}>
              {[...Array(5)].map((_, i) => (
                <Box key={i}>
                  <Conditional condition={i < stars}>
                    <EmptyStar fill="#ffd43b" color="none" size={16} />
                  </Conditional>
                  <Conditional condition={i >= stars}>
                    <IconStar color="gray" size={16} />
                  </Conditional>
                </Box>
              ))}
            </Group>
          </Stack>
        </Group>
      </Paper>
    </>
  );
};
