import { Card, Skeleton } from "@mantine/core";
import React from "react";
import classes from "./styles/index.module.css"

export const UserCardSkeleton: React.FC = () => {
  return (
    <Card shadow="md" radius="lg" p={0} withBorder className={classes.card}>
      <Skeleton height={200}  w={170} />
      <div className={classes.body}>
        <Skeleton height={25} w={160} mt="xs" radius="xl"/>

        <Skeleton height={16} w={100} mt="md" radius="xl" />

        <Skeleton height={20} w={210} mt="md" radius="xl" />

        <Skeleton height={20} w={210} mt="md" radius="xl" />
      </div>
    </Card>
  );
};
