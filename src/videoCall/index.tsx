import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Group,
  Stack,
  Paper,
  ActionIcon,
  Tooltip,
  Text,
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
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";

export const VideoCallLayout: React.FC = () => {
  const { videoCall, resetVideoCall } = useAppVideoCall();
  const { socket } = useSocket();
  const { user, zegoToken } = useAppAuthentication();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [zgInstance, setZgInstance] = useState<ZegoExpressEngine | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [publishStream, setPublishStream] = useState<string | null>(null);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

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
      import("zego-express-engine-webrtc").then(
        async ({ ZegoExpressEngine }) => {
          const zego = new ZegoExpressEngine(
            parseInt(`${import.meta.env.VITE_ZEGO_APP_ID}`),
            import.meta.env.VITE_ZEGO_SERVER_SECRET
          );

          setZgInstance(zego);

          zego.on(
            "roomStreamUpdate",
            async (roomId, updateType, streamList, _extendedData) => {
              if (updateType === "ADD") {
                const remotevideo = document.getElementById("remote-video");
                const vd = document.createElement("video");
                vd.id = streamList[0].streamID;
                vd.autoplay = true;
                vd.playsInline = true;
                vd.muted = false;
                if (remotevideo) {
                  remotevideo.appendChild(vd);
                }
                zego
                  .startPlayingStream(streamList[0].streamID, {
                    audio: true,
                    video: true,
                  })
                  .then((stream) => {
                    setRemoteStream(stream);
                  });
              } else if (
                updateType === "DELETE" &&
                zego &&
                localStream &&
                streamList[0].streamID
              ) {
                zego.destroyStream(localStream);
                zego.stopPublishingStream(streamList[0].streamID);
                zego.logoutRoom(roomId.toString());
                resetVideoCall();
              }
            }
          );
          await zego.loginRoom(
            videoCall?.roomId?.toString()!,
            zegoToken!,
            {
              userID: user?.id.toString()!,
              userName: `${user?.firstName} ${user?.lastName}`,
            },
            { userUpdate: true }
          );

          const localStream = await zego.createStream({
            camera: {
              audio: !isMuted,
              video: isVideoOn,
            },
          });
          const localVideo = document.getElementById("local-video");
          const videoElement = document.createElement("video");
          videoElement.id = "local-video-zego";
          //videoElement.className = ``
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.muted = false;

          if (localVideo) {
            localVideo.appendChild(videoElement);
          }

          const td = document.getElementById("local-video-zego");

          if (td) {
            (td as HTMLVideoElement).srcObject = localStream;
          }

          const streamID = `${user?.id}-${videoCall?.roomId}`;
          setPublishStream(streamID);
          setLocalStream(localStream);
        }
      );
    };

    if (videoCall?.roomId && zegoToken) {
      startCall();
    }
  }, [zegoToken]);

  useEffect(() => {
    if (videoCall?.type === "outgoing") {
      socket?.on("call-accepted", () => setCallAccepted(true));
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [videoCall]);

  const toggleScreenShare = async () => {
    if (!zgInstance || !videoCall?.roomId) return;

    if (!isScreenSharing) {
      // Start screen sharing
      try {
        const screenStream = await zgInstance.createStream({
          screen: {
            audio: true,
          },
        });
        setLocalStream(screenStream);
        setIsScreenSharing(true);

        // Stop publishing old stream and publish the new one
        if (publishStream) {
          zgInstance.stopPublishingStream(publishStream);
        }
        const streamID = `${user?.id}-${videoCall?.roomId}-screen`;
        zgInstance.startPublishingStream(streamID, screenStream);
        setPublishStream(streamID);

        // Listen for when the user stops sharing from browser UI
        screenStream.getVideoTracks()[0].onended = () => {
          stopScreenShare();
        };
      } catch (err) {
        console.error("Screen sharing failed", err);
      }
    } else {
      // Stop screen sharing and revert to camera
      stopScreenShare();
    }
  };
  const stopScreenShare = async () => {
    if (!zgInstance || !videoCall?.roomId) return;

    if (localStream) {
      zgInstance.destroyStream(localStream);
    }
    // Recreate camera stream
    const cameraStream = await zgInstance.createStream({
      camera: {
        audio: !isMuted,
        video: isVideoOn,
      },
    });
    setLocalStream(cameraStream);
    setIsScreenSharing(false);

    // Stop publishing old stream and publish the new one
    if (publishStream) {
      zgInstance.stopPublishingStream(publishStream);
    }
    const streamID = `${user?.id}-${videoCall?.roomId}`;
    zgInstance.startPublishingStream(streamID, cameraStream);
    setPublishStream(streamID);
  };
  const endCall = () => {
    if (zgInstance && localStream && publishStream) {
      zgInstance.destroyStream(localStream);
      zgInstance.stopPublishingStream(publishStream);
      zgInstance.logoutRoom(videoCall?.roomId?.toString()!);
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

  console.log("instanses", zgInstance, localStream, publishStream);

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
            {/* <div id="remote-video">
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
            </div> */}

            <div id="remote-video">
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Conditional condition={Boolean(remoteStream)}>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#000",
                    }}
                  />
                </Conditional>
                <Conditional condition={!remoteStream}>
                  <Stack align="center" gap="md">
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
                      size={120}
                      variant="light"
                    />
                    <Text c="white" size="xl" fw={500}>
                      {videoCall?.users?.senderId !== user?.id
                        ? videoCall?.users?.sender?.firstName!
                        : videoCall?.users?.receiver?.firstName!}
                    </Text>
                  </Stack>
                </Conditional>
              </Box>
            </div>
            {/* Local Video Preview */}
            {/* <div id="local-video">
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
            </div> */}

            <div id="local-video">
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
                <Conditional condition={Boolean(isVideoOn && localStream)}>
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                      background: "#000",
                    }}
                  />
                </Conditional>
                <Conditional condition={!isVideoOn}>
                  <Stack align="center" gap="xs">
                    <IconVideoOff size={32} color="white" />
                    <Text c="white" size="xs">
                      Camera Off
                    </Text>
                  </Stack>
                </Conditional>
              </Paper>
            </div>
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
                onClick={() => setIsVideoOn(!isVideoOn)}
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
      </Conditional>
    </Stack>
  );
};
