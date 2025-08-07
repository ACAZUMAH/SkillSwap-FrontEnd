import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Group,
  Stack,
  Paper,
  Badge,
  ActionIcon,
  Tooltip,
  Text,
  Avatar,
  Divider,
  Box,
} from "@mantine/core";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconScreenShare,
  IconScreenShareOff,
  IconSettings,
  IconPhone,
} from "@tabler/icons-react";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";
import { useAppAuthentication, useSocket } from "src/hooks";
import { Conditional } from "src/components";
import { OutGoingCall } from "./components/OutGoingCall";

export const VideoCallLayout: React.FC = () => {
  const { videoCall, resetVideoCall } = useAppVideoCall();
  const { socket } = useSocket();
  const { user } = useAppAuthentication();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  //const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoCall?.type === "outgoing") {
      socket?.emit("outgoing-call", {
        to:
          videoCall?.users?.receiverId !== user?.id
            ? videoCall?.users?.receiverId
            : videoCall?.users?.senderId,

        from: {
          id: user?.id,
          profile_img: user?.profile_img,
          firstName: user?.firstName,
          lastName: user?.lastName,
        },
        callType: "video",
        roomId: videoCall?.roomId,
      });
    }
  }, [videoCall]);

  useEffect(() => {
    // Simulate getting user media for local video
    if (localVideoRef.current && isVideoOn) {
      // In a real app, you'd use getUserMedia here
      localVideoRef.current.src = "/placeholder.svg?height=200&width=300";
    }
  }, [isVideoOn]);

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real app, you'd handle screen sharing logic here
  };

  const endCall = () => {
    setCallAccepted(false);
    resetVideoCall();
  };

  return (
    <Stack
      // h="calc(100vh - 70px)"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Conditional condition={!callAccepted}>
        <OutGoingCall user={user} videoCall={videoCall} endCall={endCall} />
      </Conditional>
      <Conditional condition={callAccepted}>
        <Box flex={1} pos="relative" mt="md" mx="xs">
          <Paper
            shadow="md"
            radius="md"
            h="102%"
            style={{
              background: isScreenSharing
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Main Video/Screen Share Area */}
            <Box
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isScreenSharing ? (
                <Stack align="center" gap="md">
                  <IconScreenShare size={64} color="white" />
                  <Text c="white" size="xl" fw={500}>
                    Screen Sharing Active
                  </Text>
                  <Text c="white" size="sm" opacity={0.8}>
                    Sharing your entire screen with Alice Johnson
                  </Text>
                </Stack>
              ) : (
                <Stack align="center" gap="md">
                  <Avatar size={120} color="white" variant="light">
                    AJ
                  </Avatar>
                  <Text c="white" size="xl" fw={500}>
                    Alice Johnson
                  </Text>
                  <Badge color="green" variant="light">
                    Video On
                  </Badge>
                </Stack>
              )}
            </Box>

            {/* Local Video Preview */}
            <Paper
              shadow="lg"
              radius="md"
              pos="absolute"
              bottom={20}
              right={20}
              w={200}
              h={150}
              style={{
                background: isVideoOn
                  ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                  : "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isVideoOn ? (
                <Stack align="center" gap="xs">
                  <Avatar size={40} color="white" variant="light">
                    You
                  </Avatar>
                  <Text c="white" size="xs">
                    You
                  </Text>
                </Stack>
              ) : (
                <Stack align="center" gap="xs">
                  <IconVideoOff size={32} color="white" />
                  <Text c="white" size="xs">
                    Camera Off
                  </Text>
                </Stack>
              )}
            </Paper>

            {/* Maximize Chat Button */}
            {/* <ActionIcon
            pos="absolute"
            top={20}
            right={20}
            size="lg"
            variant="filled"
            color="dark"
            onClick={() => setIsChatExpanded(!isChatExpanded)}
          >
            {isChatExpanded ? (
              <IconMinimize size={18} />
            ) : (
              <IconMaximize size={18} />
            )}
          </ActionIcon> */}
          </Paper>
        </Box>

        {/* Control Bar */}
        <Paper shadow="md" radius="md" p="sm">
          <Group justify="center" gap="md">
            <Tooltip label={isMuted ? "Unmute" : "Mute"}>
              <ActionIcon
                size="xl"
                variant={isMuted ? "filled" : "light"}
                color={isMuted ? "red" : "blue"}
                onClick={() => setIsMuted(!isMuted)}
                radius="xl"
              >
                {isMuted ? (
                  <IconMicrophoneOff size={24} />
                ) : (
                  <IconMicrophone size={24} />
                )}
              </ActionIcon>
            </Tooltip>

            <Tooltip label={isVideoOn ? "Turn off camera" : "Turn on camera"}>
              <ActionIcon
                size="xl"
                variant={isVideoOn ? "light" : "filled"}
                color={isVideoOn ? "blue" : "red"}
                onClick={() => setIsVideoOn(!isVideoOn)}
                radius="xl"
              >
                {isVideoOn ? (
                  <IconVideo size={24} />
                ) : (
                  <IconVideoOff size={24} />
                )}
              </ActionIcon>
            </Tooltip>

            <Tooltip label={isScreenSharing ? "Stop sharing" : "Share screen"}>
              <ActionIcon
                size="xl"
                variant={isScreenSharing ? "filled" : "light"}
                color={isScreenSharing ? "green" : "blue"}
                onClick={toggleScreenShare}
                radius="xl"
              >
                {isScreenSharing ? (
                  <IconScreenShareOff size={24} />
                ) : (
                  <IconScreenShare size={24} />
                )}
              </ActionIcon>
            </Tooltip>

            <Divider orientation="vertical" />

            <Tooltip label="Settings">
              <ActionIcon size="xl" variant="light" color="gray" radius="xl">
                <IconSettings size={24} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="End call">
              <ActionIcon
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
          </Group>
        </Paper>
      </Conditional>
    </Stack>
  );
};
