import { Button, Group, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { useSocket } from "src/hooks";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";

export const IncomingVideoCall: React.FC = () => {
  const { incomingVideoCall, setVideoCall, setIncomingVideoCall, resetVideoCall } = useAppVideoCall();
  const { socket } = useSocket();

  const handleAcceptCall = () => {
    setVideoCall({
      chatId: incomingVideoCall?.chatId,
      users: incomingVideoCall?.users,
      type: "incoming",
      roomId: incomingVideoCall?.roomId,
    });
    socket?.emit("accept-incoming-call", { id: incomingVideoCall?.from.id })
    setIncomingVideoCall(undefined);
  };

  const handleRejectCall = () => {
    socket?.emit("reject-incoming-call", { id: incomingVideoCall?.from.id });
    resetVideoCall();
  };
  
  return (
    <>
      <Paper
        withBorder
        h={180}
        w={400}
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
          minWidth: 400,
          minHeight: 180,
          maxWidth: 400,
          maxHeight: 180,
        }}
      >
        <DisplayAvatar
          url={incomingVideoCall?.from.profile_img}
          name={incomingVideoCall?.from.firstName!}
          width={120}
          height={120}
          textSize="2rem"
          radius="50%"
        />
        <div>
          <Title ta="center" order={2}>
            {`${incomingVideoCall?.from.firstName} ${incomingVideoCall?.from.lastName}`}
          </Title>
          <Text size="sm" c="dimmed" ta="center">
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
