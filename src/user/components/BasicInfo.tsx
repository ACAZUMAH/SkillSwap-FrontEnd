import {
  Avatar,
  Button,
  Center,
  Group,
  HoverCard,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";
import { Swap, User } from "src/interfaces";
import classes from "../styles/index.module.css";
import {
  IconStar,
} from "@tabler/icons-react";
import { useSwapMutation } from "../hooks/useSwapMutation";
import { Conditional } from "src/components";
import { SwapStatusButtons } from "./SwapStatusButtons";

interface BasicInfoProps {
  user?: User;
  loading?: boolean;
  swapData?: Swap | null;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ user, swapData }) => {
  const { swap, loading } = useSwapMutation();

  const disablemessageButton =
    !swapData ||
    swapData?.status === "PENDING" ||
    swapData?.status === "DECLINED";

  const handleSendSwap = async () => {
    await swap({ receiverId: user?.id! });
  };

  return (
    <Paper withBorder shadow="0" p="sm" h="100%" w="100%" radius="md">
      <Center>
        <Avatar
          src={user?.profile_img}
          size="12rem"
          mt="sm"
          className={classes.avatar}
        >
          <Text c="white" fw="bold" size="xl">
            {getInitialsNameLatter(user?.firstName!)}
          </Text>
        </Avatar>
      </Center>
      <Group gap={5} justify="center" mt="md">
        <Title order={2} ta="center" className={classes.title}>
          {user?.firstName} {user?.lastName}
        </Title>
        <Group gap={1}>
          <IconStar
            size={20}
            style={{
              fill:
                Math.floor(user?.averageRating!) > 1
                  ? "#ffd43b"
                  : "transparent",
              color:
                Math.floor(user?.averageRating!) > 1 ? "#ffd43b" : "#ced4da",
            }}
          />
          <Text size="sm" c="dimmed">
            ({user?.averageRating?.toFixed(1) || "0.0"})
          </Text>
        </Group>
      </Group>
      <Group justify="center" mt="md" gap={15}>
        <Conditional condition={Boolean(swapData)}>
          <SwapStatusButtons swapData={swapData} />
        </Conditional>
        <Conditional condition={!swapData}>
          <Button
            variant="outline"
            radius="xl"
            w="40%"
            onClick={handleSendSwap}
            loading={loading}
          >
            Swap
          </Button>
        </Conditional>
        <HoverCard withArrow shadow="md">
          <HoverCard.Target>
            <div style={{ width: "40%" }}>
              <Button radius="xl" w="100%" disabled={disablemessageButton}>
                Message
              </Button>
            </div>
          </HoverCard.Target>
          <Conditional condition={!swapData}>
            <HoverCard.Dropdown>
              <Text>Send a swap request!</Text>
            </HoverCard.Dropdown>
          </Conditional>
        </HoverCard>
      </Group>
      <Text mt="md" ta="center" c="dimmed">
        {user?.bio || "No bio available"}
      </Text>
    </Paper>
  );
};
