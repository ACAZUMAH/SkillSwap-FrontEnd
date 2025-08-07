import { Button, Group, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";

export const IncomingVideoCall: React.FC = () => {
  const { incomingVideoCall } = useAppVideoCall();

  const handleAcceptCall = () => {};

  const handleRejectCall = () => {};
  return (
    <>
      <Paper
        withBorder
        h="24%"
        w="27%"
        shadow="xl"
        p="md"
        pos="fixed"
        bottom={8}
        right={6}
        mb={0}
        radius="md"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "1rem",
          zIndex: 50,
        }}
      >
        <DisplayAvatar
          url={incomingVideoCall?.from.profile_img}
          name={incomingVideoCall?.from.firstName!}
          width={100}
          height={100}
        />
        <div>
          <Title order={2} ta="center">
            {`${incomingVideoCall?.from.firstName} ${incomingVideoCall?.from.lastName}`}
          </Title>
          <Text size="sm" color="dimmed" ta="center">
            In coming video call
          </Text>
          <Group justify="center" mt="md" grow>
            <Button color="red.9" radius="xl" onClick={handleRejectCall}>
              Reject
            </Button>
            <Button radius="xl" onClick={handleAcceptCall}>
              Accept
            </Button>
          </Group>
        </div>
      </Paper>
    </>
  );
};
