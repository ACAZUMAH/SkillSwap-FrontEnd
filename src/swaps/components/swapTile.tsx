import {
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { Status, User } from "src/interfaces";
import defaultProfile from "../../assets/images/defualt-profile.avif";
import { useAppAuthentication, useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";
import { Conditional } from "src/components";
import classes from "../styles/index.module.css";
import { IconClock } from "@tabler/icons-react";
import { Ratings } from "src/components/userCard/components/Ratings";
import { useUpdateSwapMutation } from "../hooks/useUpdateMutation";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { useCancelSwapMutation } from "../hooks/useCancelRequestMutation";

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
  const [firstButtonLoader, setFirstButtonLoader] = useState(false);
  const [secondButtonLoader, setSecondButtonLoader] = useState(false);
  const { user } = useAppAuthentication();
  const navigateToUserDetails = useRouteNavigation(
    routerEndPoints.USER.replace(":id", swapUser?.id!)
  );
  const { updateHandler } = useUpdateSwapMutation();
  const { cancelRequestHandler } = useCancelSwapMutation();

  const handleAcceptRequest = async () => {
    if (user?.id !== receiverId) return;
    setSecondButtonLoader(true);
    try {
      await Promise.resolve(
        updateHandler({
          swapId: swapId,
          status: Status.Accepted,
        })
      );
    } finally {
      setSecondButtonLoader(false);
    }
  };

  const handleCancelRequest = async () => {
    if (user?.id !== senderId) return;
    setFirstButtonLoader(true);
    try {
      await Promise.resolve(
        cancelRequestHandler({
          swapId: swapId,
        })
      );
    } finally {
      setFirstButtonLoader(false);
    }
  };

  const handleRejectRequest = async () => {
    if (user?.id !== receiverId) return;
    setFirstButtonLoader(true);
    try {
      await Promise.resolve(
        updateHandler({
          swapId: swapId,
          status: Status.Declined,
        })
      );
    } finally {
      setFirstButtonLoader(false);
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
            <DisplayAvatar
              url={swapUser?.profile_img || defaultProfile}
              name={swapUser?.firstName!}
              size="xl"
              radius="3rem"
            />

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
                onClick={(e) => {
                  e.stopPropagation();
                  if (receiverId === user?.id) {
                    handleRejectRequest();
                  }
                  if (senderId === user?.id) {
                    handleCancelRequest();
                  }
                }}
                loading={firstButtonLoader}
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
                onClick={(e) => {
                  e.stopPropagation();
                  if (receiverId === user?.id) {
                    handleAcceptRequest();
                  }
                }}
                loading={secondButtonLoader}
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
