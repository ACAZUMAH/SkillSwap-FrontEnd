import {
  Anchor,
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
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconWorld,
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
    <Paper withBorder shadow="0" p="sm" h="100%" w="100%">
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
      <Title order={2} mt="md" ta="center" className={classes.title}>
        {user?.firstName} {user?.lastName}
      </Title>
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
      <Group justify="center" mt="lg" gap={12}>
        <Anchor
          href={`mailto:${user?.email}`}
          target="_blank"
          size="xs"
          c="dimmed"
        >
          <IconMail size={25} stroke={1.5} />
        </Anchor>
        <Anchor
          href={`tel:${user?.phoneNumber}`}
          target="_blank"
          size="xs"
          c="dimmed"
        >
          <IconPhone size={25} stroke={1.5} />
        </Anchor>
        <Anchor href={user?.gitHub || ""} target="_blank" size="xs" c="dimmed">
          <IconBrandGithub size={25} stroke={1.5} />
        </Anchor>
        <Anchor
          href={user?.linkedIn || ""}
          target="_blank"
          size="xs"
          c="dimmed"
        >
          <IconBrandLinkedin size={25} stroke={1.5} />
        </Anchor>
        <Anchor
          href={user?.portfolio || ""}
          target="_blank"
          size="xs"
          c="dimmed"
        >
          <IconWorld size={25} stroke={1.5} />
        </Anchor>
      </Group>
    </Paper>
  );
};
