import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Grid,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import { getStatusColor } from "../helpers";
import { IconPencil } from "@tabler/icons-react";
import { Swap } from "src/interfaces";
import { UserAvatar } from "src/components/Avatar/UserAvatar";
import { formatDate } from "src/helpers/date";
import { Conditional } from "src/components";
import { SkillPairs } from "./SkillPairs";
import { AddSkillsExchange } from "./AddSkillExchange";

interface OverViewProps {
  swapData: Swap;
}

export const OverViewTab: React.FC<OverViewProps> = ({ swapData }) => {
  const [addSkills, setAddSkills] = useState(false);

  return (
    <>
      <Stack gap="md">
        <Card withBorder>
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>
              Swap Information
            </Text>
            <Badge color={getStatusColor(swapData?.status)} variant="filled">
              {swapData?.status}
            </Badge>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <Group>
                <UserAvatar
                  url={swapData?.sender?.profile_img!}
                  name={swapData?.sender?.firstName!}
                />
                <div>
                  <Text fw={500}>
                    {swapData?.sender?.firstName} {swapData?.sender?.lastName}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Sender
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <UserAvatar
                  url={swapData?.receiver?.profile_img!}
                  name={swapData?.receiver?.firstName!}
                />
                <div>
                  <Text fw={500}>
                    {swapData?.receiver?.firstName}{" "}
                    {swapData?.receiver?.lastName}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Receiver
                  </Text>
                </div>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>

        <Card withBorder>
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={600}>
              Skills Exchange
            </Text>
            <Tooltip label="Edit">
              <ActionIcon
                variant="transparent"
                onClick={() => setAddSkills(!addSkills)}
              >
                <IconPencil size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Conditional condition={addSkills}>
            <AddSkillsExchange swapData={swapData} />
          </Conditional>
          <Conditional condition={!addSkills}>
            <Conditional condition={!Boolean(swapData?.skills?.length)}>
              <Center>
                <Text c="dimmed">
                  No skills exchanged yet. Please add skills to start the
                  exchange.
                </Text>
              </Center>
            </Conditional>
            <Stack gap="sm">
              <Conditional condition={Boolean(swapData?.skills?.length)}>
                <SkillPairs
                  skills={swapData?.skills}
                  senderId={swapData.senderId}
                  receiverId={swapData.receiverId}
                />
              </Conditional>
            </Stack>
          </Conditional>
        </Card>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Created: {formatDate(swapData?.createdAt)}
          </Text>
          <Text size="sm" c="dimmed">
            Updated: {formatDate(swapData?.updatedAt)}
          </Text>
        </Group>
      </Stack>
    </>
  );
};
