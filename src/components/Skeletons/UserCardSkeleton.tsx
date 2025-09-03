import { Card, Group, Skeleton, Stack } from "@mantine/core";
import React from "react";
import classes from "./styles/index.module.css";
import { Conditional } from "../conditional/Conditional";

interface UserCardSkeletonProps {
  showMatchHeader?: boolean;
}

export const UserCardSkeleton: React.FC<UserCardSkeletonProps> = ({
  showMatchHeader,
}) => {
  return (
    <Card
      shadow="sm"
      padding={0}
      radius="lg"
      withBorder
      className={classes.card}
    >
      <Conditional condition={showMatchHeader!}>
        <div className={classes.matchHeader}>
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <Skeleton height={16} width={16} radius="sm" />
              <Skeleton height={14} width={80} />
            </Group>
            <Skeleton height={14} width={30} />
          </Group>

          <Group gap="xs">
            <Skeleton height={24} width={60} radius="sm" />
            <Skeleton height={12} width={100} />
          </Group>
        </div>
      </Conditional>

      <Card.Section className={classes.content}>
        <Group gap="md" mb="md" align="flex-start">
          <Skeleton height={64} width={64} radius="xl" />

          <Stack gap="xs" style={{ flex: 1 }}>
            <Skeleton height={20} width="70%" />

            <Group gap="xs">
              <Group gap={2}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} height={16} width={16} radius="sm" />
                ))}
              </Group>
              <Skeleton height={14} width={30} />
            </Group>

            <Stack gap={4}>
              <Skeleton height={12} width="100%" />
              <Skeleton height={12} width="80%" />
            </Stack>
          </Stack>
        </Group>

        <Stack gap="xs" mb="md">
          <Skeleton height={16} width={60} />
          <Group gap="xs">
            <Skeleton height={28} width={70} radius="xl" />
            <Skeleton height={28} width={85} radius="xl"/>
            <Skeleton height={28} width={60} radius="xl" />
            <Skeleton height={28} width={50} radius="xl" />
          </Group>
        </Stack>

        <Stack gap="xs" mb="md">
          <Skeleton height={16} width={55} />
          <Group gap="xs">
            <Skeleton height={28} width={90} radius="xl" />
            <Skeleton height={28} width={75} radius="xl" />
            <Skeleton height={28} width={65} radius="xl" />
          </Group>
        </Stack>

        {/* <Group gap="xs" mb="md">
          <Skeleton height={30} width={30} radius="xl" />
          <Skeleton height={30} width={30} radius="xl" />
          <Skeleton height={30} width={30} radius="xl" />
        </Group> */}

        <Conditional condition={showMatchHeader!}>
          <Stack gap="xs" mb="md">
            <Group justify="space-between">
              <Skeleton height={12} width={80} />
              <Skeleton height={12} width={30} />
            </Group>
            <Skeleton height={8} width="100%" radius="xl" />
          </Stack>
        </Conditional>

        <Group gap="xs">
          <Skeleton height={36} radius="xl" />
        </Group>
      </Card.Section>
    </Card>
  );
};
