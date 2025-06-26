import { Card, Skeleton } from "@mantine/core";
import React from "react";
import classes from "./styles/index.module.css"

export const UserCardSkeleton: React.FC = () => {
  return (
    <Card shadow="md" radius="lg" p={0} withBorder className={classes.card}>
      <Skeleton height={200}  w={170} />
      <div className={classes.body}>
        <Skeleton height={18} w={160} mt="xs" radius="xl"/>

        <Skeleton height={10} w={100} mt="xs" radius="xl" />

        <Skeleton height={15} w={210} mt="xs" radius="xl" />
        <Skeleton height={15} w={150} mt="xs" radius="xl" />

        <Skeleton height={15} w={210} mt="xs" radius="xl" />
        <Skeleton height={15} w={150} my="xs" radius="xl" />
      </div>
    </Card>
  );
};
