import {
  Button,
  Card,
  Group,
  Image,
  Rating,
  Skeleton,
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

interface SwapUserCardProps {
  swapUser?: User;
  senderId?: string;
  receiverId?: string;
  status?: Status;
}

export const SwapUserCard: React.FC<SwapUserCardProps> = ({
  swapUser,
  receiverId,
  senderId,
  status,
}) => {
  const { user } = useAppAuthentication();

  const navigateToUserDetails = useRouteNavigation(
    routerEndPoints.USER.replace(":id", swapUser?.id!)
  );

  return (
    <>
      <Card
        radius="lg"
        withBorder
        p={0}
        className={classes.card}
        onClick={navigateToUserDetails}
      >
        <Image
          src={swapUser?.profile_img || defaultProfiile}
          className={classes.image}
        />
        <div className={classes.body}>
          <Title order={2} className={classes.title}>
            {swapUser?.firstName} {swapUser?.lastName}
          </Title>

          <Rating
            size="sm"
            readOnly
            value={swapUser?.averageRating || 0}
            mt="xs"
          />
          <Conditional
            condition={
              status !== Status.Completed && status !== Status.Accepted
            }
          >
            <Group mt="md" gap={10}>
              <Button w="47%" variant="default" radius="xl" c="red">
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
        </div>
      </Card>
    </>
  );
};

export const SwapUserCardSkeleton: React.FC = () => {
  return (
    <Card radius="lg" p={0} withBorder className={classes.card}>
      <Skeleton height={200} w={170} />
      <div className={classes.body}>
        <Skeleton height={20} w={160} mt="md" radius="xl" />

        <Skeleton height={10} w={100} mt="md" radius="xl" />

        <Skeleton height={30} w={240} mt="md" radius="xl" />
      </div>
    </Card>
  );
};
