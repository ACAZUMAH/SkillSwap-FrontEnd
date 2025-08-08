import React, { useState, useRef, useEffect } from "react";
import {
  Group,
  Stack,
  Paper,
  ActionIcon,
  Tooltip,
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
//import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";

export const VideoCallLayout: React.FC = () => {
  const { videoCall, resetVideoCall } = useAppVideoCall();
  const { socket } = useSocket();
  const { user, zegoToken } = useAppAuthentication();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localScreenRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteScreenRef = useRef<HTMLVideoElement>(null);

  const [zgInstance, setZgInstance] = useState<ZegoExpressEngine | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const [cameraStreamID, setCameraStreamID] = useState<string | null>(null);
  const [screenStreamID, setScreenStreamID] = useState<string | null>(null);

  // Attach streams to DOM when updated
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (screenStream && localScreenRef.current) {
      localScreenRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  // Outgoing call emit
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
      console.log(`emitting`);
    }
  }, [videoCall]);

  // Start call & join room
  useEffect(() => {
    const startCall = async () => {
      const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");
      const zego = new ZegoExpressEngine(
        parseInt(`${import.meta.env.VITE_ZEGO_APP_ID}`),
        import.meta.env.VITE_ZEGO_SERVER_SECRET
      );
      setZgInstance(zego);

      zego.on("roomStreamUpdate", async (_roomId, updateType, streamList) => {
        if (updateType === "ADD") {
          for (const streamInfo of streamList) {
            const remoteStream = await zego.startPlayingStream(
              streamInfo.streamID
            );

            // Detect if it's a screen share or camera based on streamID
            if (streamInfo.streamID.includes("-screen")) {
              if (remoteScreenRef.current) {
                remoteScreenRef.current.srcObject = remoteStream;
              }
            } else {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            }
          }
        } else if (updateType === "DELETE") {
          // If remote user stops sharing screen
          if (remoteScreenRef.current) {
            remoteScreenRef.current.srcObject = null;
          }
        }
      });

      await zego.loginRoom(
        videoCall?.roomId?.toString()!,
        zegoToken!,
        {
          userID: user?.id.toString()!,
          userName: `${user?.firstName} ${user?.lastName}`,
        },
        { userUpdate: true }
      );

      // Create camera stream
      const cameraStream = await zego.createStream({
        camera: { audio: true, video: true },
      });
      setLocalStream(cameraStream);

      const camID = `${user?.id!}-${videoCall?.roomId!}-camera`;
      setCameraStreamID(camID);
      zego.startPublishingStream(camID, cameraStream);
    };

    if (videoCall?.roomId && zegoToken) {
      startCall();
    }
  }, [zegoToken]);

  // Accept call
  useEffect(() => {
    if (videoCall?.type === "outgoing") {
      socket?.on("call-accepted", () => setCallAccepted(true));
    } else {
      setTimeout(() => setCallAccepted(true), 1000);
    }
  }, [videoCall]);

  // Toggle mic
  const toggleMute = () => {
    if (localStream) {
      localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = isMuted));
    }
    setIsMuted(!isMuted);
  };

  // Toggle camera
  const toggleVideo = () => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isVideoOn));
    }
    setIsVideoOn(!isVideoOn);
  };

  // Start / Stop screen share
  const toggleScreenShare = async () => {
    if (!zgInstance || !videoCall?.roomId) return;

    if (!isScreenSharing) {
      try {
        const sStream = await zgInstance.createStream({
          screen: { audio: false },
        });
        setScreenStream(sStream);

        const sID = `${user?.id}-${videoCall?.roomId}-screen`;
        setScreenStreamID(sID);
        zgInstance.startPublishingStream(sID, sStream);

        // Detect when user stops sharing from browser
        sStream.getVideoTracks()[0].onended = stopScreenShare;

        setIsScreenSharing(true);
      } catch (err) {
        console.error("Screen share failed:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (zgInstance && screenStreamID) {
      zgInstance.stopPublishingStream(screenStreamID);
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    setIsScreenSharing(false);
  };

  const endCall = () => {
    if (zgInstance && localStream && cameraStreamID) {
      zgInstance.stopPublishingStream(cameraStreamID);
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (zgInstance && screenStreamID) {
      zgInstance.stopPublishingStream(screenStreamID);
    }
    zgInstance?.logoutRoom(videoCall?.roomId?.toString()!);

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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              background: "#000",
            }}
          >
            {/* Remote Screen */}
            <video
              ref={remoteScreenRef}
              autoPlay
              playsInline
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {/* Remote Camera (small overlay) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: "200px",
                borderRadius: 8,
                background: "#000",
              }}
            />

            {/* Local Screen (if sharing) */}
            {isScreenSharing && (
              <video
                ref={localScreenRef}
                autoPlay
                playsInline
                muted
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  width: "200px",
                  borderRadius: 8,
                  background: "#000",
                }}
              />
            )}

            {/* Local Camera (small overlay) */}
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                width: "200px",
                borderRadius: 8,
                background: "#000",
              }}
            />
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
                onClick={toggleMute}
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
                onClick={toggleVideo}
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
                <IconPhone size={24} style={{ transform: "rotate(135deg)" }} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Paper>
      </Conditional>
    </Stack>
  );
};
