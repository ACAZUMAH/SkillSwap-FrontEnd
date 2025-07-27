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
  IconStar,
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
      <Group justify="center" mt="xl" gap={15}>
        <HoverCard withArrow shadow="md">
          <HoverCard.Target>
            <Anchor
              href={`mailto:${user?.email}`}
              target="_blank"
              size="xs"
              c="dimmed"
            >
              <IconMail size={25} stroke={1.5} />
            </Anchor>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text>{user?.firstName} email</Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <Conditional condition={Boolean(user?.phoneNumber)}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <Anchor
                href={`tel:${user?.phoneNumber}`}
                target="_blank"
                size="xs"
                c="dimmed"
              >
                <IconPhone size={25} stroke={1.5} />
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text>Call {user?.firstName}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Conditional>
        <Conditional condition={Boolean(user?.gitHub)}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <Anchor
                href={user?.gitHub || ""}
                target="_blank"
                size="xs"
                c="dimmed"
              >
                <IconBrandGithub size={25} stroke={1.5} />
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text>View {user?.firstName}'s GitHub</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Conditional>
        <Conditional condition={Boolean(user?.linkedIn)}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <Anchor
                href={user?.linkedIn || ""}
                target="_blank"
                size="xs"
                c="dimmed"
              >
                <IconBrandLinkedin size={25} stroke={1.5} />
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text>View {user?.firstName}'s LinkedIn</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Conditional>
        <Conditional condition={Boolean(user?.portfolio)}>
          <HoverCard withArrow shadow="md">
            <HoverCard.Target>
              <Anchor
                href={user?.portfolio || ""}
                target="_blank"
                size="xs"
                c="dimmed"
              >
                <IconWorld size={25} stroke={1.5} />
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">View {user?.firstName}'s Portfolio</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Conditional>
      </Group>
    </Paper>
  );
};
