import {
  Avatar,
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Status, User } from "src/interfaces";
import defaultProfiile from "../../assets/images/defualt-profile.avif";
import { useAppAuthentication, useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";
import { Conditional } from "src/components";
import classes from "../styles/index.module.css";
import { IconClock } from "@tabler/icons-react";
import { getInitialsNameLatter } from "src/helpers";
import { Ratings } from "src/components/userCard/components/Ratings";
import { useUpdateSwapMutation } from "../hooks/useUpdateMutation";

interface SwapUserCardProps {
  swapId: string;
  swapUser?: User;
  senderId?: string;
  receiverId?: string;
  status?: Status;
}

export const SwapUserCard: React.FC<SwapUserCardProps> = ({
  swapId,
  swapUser,
  receiverId,
  senderId,
  status,
}) => {
  const { user } = useAppAuthentication();
  const navigateToUserDetails = useRouteNavigation(
    routerEndPoints.USER.replace(":id", swapUser?.id!)
  );
  const { updateHandler, loading } = useUpdateSwapMutation();

  const handleAcceptRequest = () => {
    if (user?.id === receiverId) {
      updateHandler({
        swapId: swapId,
        status: Status.Accepted,
      });
    }
  };

  const handleCancelRequest = () => {
    if (user?.id === senderId) {
      updateHandler({
        swapId: swapId,
        status: Status.Pending,
      });
    }
  };

  const handleRejectRequest = () => {
    if (user?.id === receiverId) {
      updateHandler({
        swapId: swapId,
        status: Status.Declined,
      });
    }
  };

  return (
    <>
      <Card
        radius="lg"
        shadow="sm"
        withBorder
        padding={0}
        className={classes.card}
        onClick={navigateToUserDetails}
      >
        <Card.Section className={classes.content}>
          <Group gap="md" mb="md" align="flex-start">
            <Avatar
              src={user?.profile_img || defaultProfiile}
              size="xl"
              radius="3rem"
              className={classes.avatar}
            >
              {getInitialsNameLatter(swapUser?.firstName!)}
            </Avatar>

            <Stack gap="xs" style={{ flex: 1 }}>
              <Title order={3} size="lg" className={classes.name}>
                {swapUser?.firstName} {swapUser?.lastName}
              </Title>

              <Group gap="xs">
                <Group gap={2}>
                  <Ratings rating={swapUser?.averageRating || 0} />
                </Group>
                <Text size="sm" c="dimmed">
                  ({swapUser?.averageRating?.toFixed(1) || "0.0"})
                </Text>
              </Group>

              <Conditional condition={Boolean(swapUser?.bio!)}>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {swapUser?.bio}
                </Text>
              </Conditional>
            </Stack>
          </Group>
          <Conditional
            condition={
              status !== Status.Completed && status !== Status.Accepted
            }
          >
            <Group mt="md" gap={10}>
              <Button
                w="47%"
                variant="default"
                radius="xl"
                c="red"
                onClick={() => {
                  if (receiverId === user?.id) {
                    handleRejectRequest();
                  }
                  if (senderId === user?.id) {
                    handleCancelRequest();
                  }
                }}
                loading={loading}
              >
                <Conditional
                  condition={
                    receiverId === user?.id && status === Status.Pending
                  }
                >
                  Reject
                </Conditional>
                <Conditional
                  condition={senderId === user?.id && status === Status.Pending}
                >
                  Cancel
                </Conditional>
              </Button>
              <Button
                w="47%"
                variant="default"
                radius="xl"
                c="yellow"
                leftSection={
                  <Conditional
                    condition={
                      senderId === user?.id && status === Status.Pending
                    }
                  >
                    <IconClock stroke={1.5} />
                  </Conditional>
                }
                onClick={() => {
                  if (receiverId === user?.id) {
                    handleAcceptRequest();
                  }
                }}
              >
                <Conditional
                  condition={
                    receiverId === user?.id && status === Status.Pending
                  }
                >
                  Accept
                </Conditional>
                <Conditional
                  condition={senderId === user?.id && status === Status.Pending}
                >
                  Pending
                </Conditional>
              </Button>
            </Group>
          </Conditional>
          <Conditional condition={status === Status.Accepted}>
            <Button fullWidth mt="md" variant="default" c="red" radius="xl">
              Cancel Swap
            </Button>
          </Conditional>
        </Card.Section>
      </Card>
    </>
  );
};

export const SwapUserCardSkeleton: React.FC = () => {
  return (
    <Card radius="lg" padding={0} withBorder className={classes.card}>
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

        <Skeleton height={36} radius="xl" />
      </Card.Section>
    </Card>
  );
};
