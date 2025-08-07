import React, { useState, useEffect } from "react";
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

export const VideoCallUI: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [zgInstance, setZgInstance] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [publishStream, setPublishStream] = useState<string | null>(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(true);
  const { videoCall, resetVideoCall } = useAppVideoCall();
  const { socket } = useSocket();
  const { user, zegoToken } = useAppAuthentication();

  console.log('instanses', zgInstance, localStream, publishStream);

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
        type: videoCall?.type,
        roomId: videoCall?.roomId,
        users: videoCall?.users,
        chatId: videoCall?.chatId,
      });
    }
  }, [videoCall]);

  useEffect(() => {
    const startCall = async () => {
      try {
        const { ZegoExpressEngine } = await import(
          "zego-express-engine-webrtc"
        );

        const zego = new ZegoExpressEngine(
          parseInt(`${import.meta.env.VITE_ZEGO_APP_ID}`),
          import.meta.env.VITE_ZEGO_SERVER_SECRET
        );

        setZgInstance(zego);

        // Handle remote stream updates
        zego.on("roomStreamUpdate", async (_roomId, updateType, streamList) => {
          if (updateType === "ADD") {
            const remotevideo = document.getElementById("remote-video");
            if (remotevideo && streamList.length > 0) {
              const vd = document.createElement("video");
              vd.id = streamList[0].streamID;
              vd.autoplay = true;
              vd.playsInline = true;
              vd.muted = false;
              vd.style.width = "100%";
              vd.style.height = "100%";
              vd.style.objectFit = "cover";
              vd.style.borderRadius = "12px";

              remotevideo.appendChild(vd);

              try {
                const stream = await zego.startPlayingStream(
                  streamList[0].streamID,
                  {
                    audio: true,
                    video: true,
                  }
                );
                vd.srcObject = stream;
              } catch (error) {
                console.error("Error playing remote stream:", error);
              }
            }
          } else if (updateType === "DELETE") {
            // Handle stream removal
            const streamElement = document.getElementById(
              streamList[0]?.streamID
            );
            if (streamElement) {
              streamElement.remove();
            }
          }
        });

        // Login to room
        await zego.loginRoom(
          videoCall?.roomId?.toString()!,
          zegoToken!,
          {
            userID: user?.id.toString()!,
            userName: `${user?.firstName} ${user?.lastName}`,
          },
          { userUpdate: true }
        );

        // Create and publish local stream
        const localStream = await zego.createStream({
          camera: {
            audio: !isMuted,
            video: isVideoOn,
          },
        });

        // Set up local video element
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
          // Clear existing video elements
          localVideo.innerHTML = "";

          const videoElement = document.createElement("video");
          videoElement.id = "local-video-zego";
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.muted = false;
          videoElement.style.width = "100%";
          videoElement.style.height = "100%";
          videoElement.style.objectFit = "cover";
          videoElement.style.borderRadius = "12px";

          localVideo.appendChild(videoElement);
          videoElement.srcObject = localStream;
        }

        // Publish the stream
        const streamID = `${user?.id}-${Date.now()}`;
        zego.startPublishingStream(streamID, localStream);

        setPublishStream(streamID);
        setLocalStream(localStream);
      } catch (error) {
        console.error("Error starting call:", error);
      }
    };

    if (videoCall?.roomId && zegoToken && callAccepted) {
      startCall();
    }
  }, [zegoToken, callAccepted, videoCall?.roomId]);

  const toggleMute = async () => {
    if (zgInstance && publishStream) {
      try {
        if (isMuted) {
          await zgInstance.mutePublishStreamAudio(publishStream, false);
        } else {
          await zgInstance.mutePublishStreamAudio(publishStream, true);
        }
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  };

  const toggleVideo = async () => {
    if (zgInstance && publishStream) {
      try {
        if (isVideoOn) {
          await zgInstance.mutePublishStreamVideo(publishStream, true);
        } else {
          await zgInstance.mutePublishStreamVideo(publishStream, false);
        }
        setIsVideoOn(!isVideoOn);
      } catch (error) {
        console.error("Error toggling video:", error);
      }
    }
  };

  const toggleScreenShare = async () => {
    if (!zgInstance || !publishStream) return;

    try {
      if (isScreenSharing) {
        // Stop screen sharing and switch back to camera
        const cameraStream = await zgInstance.createStream({
          camera: {
            audio: !isMuted,
            video: isVideoOn,
          },
        });

        await zgInstance.replaceTrack(publishStream, cameraStream);
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        const screenStream = await zgInstance.createStream({
          screen: {
            audio: true,
            video: true,
          },
        });

        await zgInstance.replaceTrack(publishStream, screenStream);
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  useEffect(() => {
    if (videoCall?.type === "outgoing") {
      socket?.on("call-accepted", () => setCallAccepted(true));
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [videoCall]);

  const endCall = async () => {
    if (zgInstance && localStream && publishStream) {
      await zgInstance.destroyStream(localStream);
      await zgInstance.stopPublishingStream(publishStream);
      await zgInstance.logoutRoom(videoCall?.roomId?.toString()!);
    }
    socket?.emit("reject-incoming-call", {
      id:
        videoCall?.users?.receiverId !== user?.id
          ? videoCall?.users?.receiverId
          : videoCall?.users?.senderId,
    });
    setCallAccepted(false);
    resetVideoCall();
  };

  return (
    <Stack
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "var(--mantine-color-body)",
        padding: "16px",
      }}
    >
      {/* Video Area */}
      <Box flex={1} pos="relative">
        <Paper
          shadow="md"
          radius="md"
          h="100%"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Remote Video Area */}
          <div
            id="remote-video"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Fallback content when no remote stream */}
            <Stack align="center" gap="md">
              <Avatar size={120} color="white" variant="light">
                AJ
              </Avatar>
              <Text c="white" size="xl" fw={500}>
                Alice Johnson
              </Text>
              <Badge color="green" variant="light">
                {isScreenSharing ? "Screen Sharing" : "Video On"}
              </Badge>
            </Stack>
          </div>

          {/* Local Video Preview */}
          <Paper
            shadow="lg"
            radius="md"
            pos="absolute"
            bottom={20}
            right={20}
            w={250}
            h={180}
            style={{
              background: "#000",
              overflow: "hidden",
            }}
          >
            <div
              id="local-video"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isVideoOn ? "transparent" : "#333",
              }}
            >
              {/* Fallback content when video is off */}
              {!isVideoOn && (
                <Stack align="center" gap="xs">
                  <IconVideoOff size={32} color="white" />
                  <Text c="white" size="xs">
                    Camera Off
                  </Text>
                </Stack>
              )}
            </div>

            {/* Local video status indicator */}
            <Badge
              pos="absolute"
              top={8}
              left={8}
              size="xs"
              color={isVideoOn ? "green" : "red"}
              variant="filled"
            >
              {isScreenSharing ? "Screen" : "You"}
            </Badge>
          </Paper>

          {/* Screen sharing indicator */}
          {isScreenSharing && (
            <Paper
              pos="absolute"
              top={20}
              left={20}
              p="xs"
              radius="md"
              bg="rgba(0, 0, 0, 0.7)"
            >
              <Group gap="xs">
                <IconScreenShare size={16} color="white" />
                <Text c="white" size="sm">
                  Screen Sharing Active
                </Text>
              </Group>
            </Paper>
          )}
        </Paper>
      </Box>

      {/* Control Bar */}
      <Paper shadow="md" radius="md" p="md">
        <Group justify="center" gap="md">
          <Tooltip label={isMuted ? "Unmute" : "Mute"}>
            <ActionIcon
              size="xl"
              variant={isMuted ? "filled" : "light"}
              color={isMuted ? "red" : "blue"}
              onClick={toggleMute}
              radius="xl"
            >
              <Conditional condition={isMuted}>
                <IconMicrophoneOff size={24} />
              </Conditional>
              <Conditional condition={!isMuted}>
                <IconMicrophone size={24} />
              </Conditional>
            </ActionIcon>
          </Tooltip>

          <Tooltip label={isVideoOn ? "Turn off camera" : "Turn on camera"}>
            <ActionIcon
              size="xl"
              variant={isVideoOn ? "light" : "filled"}
              color={isVideoOn ? "blue" : "red"}
              onClick={toggleVideo}
              radius="xl"
            >
              <Conditional condition={isVideoOn}>
                <IconVideo size={24} />
              </Conditional>
              <Conditional condition={!isVideoOn}>
                <IconVideoOff size={24} />
              </Conditional>
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
              <Conditional condition={isScreenSharing}>
                <IconScreenShareOff size={24} />
              </Conditional>
              <Conditional condition={!isScreenSharing}>
                <IconScreenShare size={24} />
              </Conditional>
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
    </Stack>
  );
};
