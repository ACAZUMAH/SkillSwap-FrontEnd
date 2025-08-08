import { ActionIcon, Box, Paper, Text, Title, Tooltip } from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import React from "react";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { User, VideoCall } from "src/interfaces";

interface OutGoingCallProps {
  user?: User;
  videoCall?: VideoCall;
  endCall: () => void;
}

export const OutGoingCall: React.FC<OutGoingCallProps> = ({
  user,
  videoCall,
  endCall,
}) => {
  return (
    <Paper
      mt="md"
      shadow="md"
      radius="md"
      p="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        height: "100%",
      }}
    >
      <Box h={150}>
        <Title fw={500}>
          {videoCall?.users?.senderId !== user?.id
            ? `${videoCall?.users?.sender?.firstName!} ${videoCall?.users
                ?.sender?.lastName!}`
            : `${videoCall?.users?.receiver?.firstName!} ${videoCall?.users
                ?.receiver?.lastName!}`}
        </Title>
        <Text mb="xl" size="lg" c="dimmed" ta="center">
          calling
        </Text>
      </Box>
      <Box h={350}>
        <DisplayAvatar
          url={
            videoCall?.users?.senderId !== user?.id
              ? videoCall?.users?.sender?.profile_img!
              : videoCall?.users?.receiver?.profile_img!
          }
          name={
            videoCall?.users?.senderId !== user?.id
              ? videoCall?.users?.sender?.firstName!
              : videoCall?.users?.receiver?.firstName!
          }
          textSize="3rem"
          height={250}
          width={250}
          style={{ marginBottom: "1rem" }}
        />
      </Box>
      <Tooltip label="End call">
        <ActionIcon
          mt="md"
          size="xl"
          variant="filled"
          color="red.9"
          onClick={endCall}
          radius="xl"
          w={70}
        >
          <IconPhone size={24} style={{ transform: "rotate(135deg" }} />
        </ActionIcon>
      </Tooltip>
    </Paper>
  );
};
