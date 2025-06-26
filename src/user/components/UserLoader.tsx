import { Box, Center, Group, Paper, Skeleton } from "@mantine/core";
import React from "react";
import classes from "../styles/index.module.css";

export const UserLoader: React.FC = () => {
  return (
    <>
      <Group align="flex-start" gap={35} className={classes.group}>
        <div className={classes.basic}>
          <Paper withBorder shadow="md" p="sm" h="100%" w="100%">
            <Center>
              <Skeleton mt="sm" height={200} w={200} circle />
            </Center>
            <Center>
              <Skeleton height={30} mt="md" w={160} radius="xl" />
            </Center>
            <Group justify="center" mt="md" gap={15}>
              <Skeleton height={35} w={120} radius="xl" />
              <Skeleton height={35} w={120} radius="xl" />
            </Group>
            <Center>
              <Skeleton ta="center" height={15} mt="lg" w={300} radius="xl" />
            </Center>
            <Center>
              <Skeleton ta="center" height={15} mt="xs" w={290} radius="xl" />
            </Center>
            <Center>
              <Skeleton ta="center" height={15} mt="xs" w={250} radius="xl" />
            </Center>
            <Center>
              <Skeleton ta="center" height={15} mt="xs" w={100} radius="xl" />
            </Center>
            <Group justify="center" mt="lg" gap={8}>
              <Skeleton height={30} w={30} radius="xl" />
              <Skeleton height={30} w={30} radius="xl" />
              <Skeleton height={30} w={30} radius="xl" />
              <Skeleton height={30} w={30} radius="xl" />
              <Skeleton height={30} w={30} radius="xl" />
            </Group>
          </Paper>
        </div>
        <div className={classes.other}>
          <Box h="100%" w="100%">
            <Paper p="xs" shadow="0" withBorder>
              <Skeleton height={25} w="25%" radius="xl" mb="md" mt="xs" />
              <Skeleton height={20} w="90%" radius="xl" mb="xs" />
              <Skeleton height={20} w="70%" radius="xl" mb="xs" />
              <Skeleton height={20} w="50%" radius="xl" mb="xs" />
            </Paper>
            <Paper p="xs" mt="lg" shadow="0" withBorder>
              <Skeleton height={25} w="25%" radius="xl" mb="md" mt="xs" />
              <Skeleton height={20} w="90%" radius="xl" mb="xs" />
              <Skeleton height={20} w="70%" radius="xl" mb="xs" />
              <Skeleton height={20} w="50%" radius="xl" mb="xs" />
            </Paper>
            <Paper p="xs" mt="lg" shadow="0" withBorder>
              <Skeleton height={25} w="25%" radius="xl" mb="md" mt="xs" />
              <Skeleton height={20} w="90%" radius="xl" mb="xs" />
            </Paper>
            <Paper p="xs" mt="lg" shadow="0" withBorder>
              <Skeleton height={25} w="25%" radius="xl" mb="md" mt="xs" />
              <Skeleton height={20} w="90%" radius="xl" mb="xs" />
            </Paper>
          </Box>
        </div>
      </Group>
    </>
  );
};
