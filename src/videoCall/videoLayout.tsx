import React, { useState, useRef, useEffect } from "react";
import { Stack, Paper, Box, Text } from "@mantine/core";
import { IconVideoOff } from "@tabler/icons-react";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";
import { useAppAuthentication, useSocket } from "src/hooks";
import { Conditional } from "src/components";
import { OutGoingCall } from "./components/OutGoingCall";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { ControlBar } from "./components/ControlBar";
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
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [remoteScreen, setRemoteScreen] = useState<MediaStream | null>(null);
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

  useEffect(() => {
    if (remoteScreen && remoteScreenRef.current) {
      remoteScreenRef.current.srcObject = remoteScreen;
    }
  }, [remoteScreen]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

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
            if (streamInfo.streamID.includes("-screen")) {
              setRemoteScreen(remoteStream);
            } else {
              setRemoteStream(remoteStream);
            }
          }
        } else if (updateType === "DELETE") {
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
      try {
        const cameraStream = await zego.createStream({
          camera: { audio: true, video: true },
        });
        setLocalStream(cameraStream);

        const camID = `${user?.id!}-${videoCall?.roomId!}-camera`;
        setCameraStreamID(camID);
        zego.startPublishingStream(camID, cameraStream);
      } catch (err) {
        console.warn("Camera not available, using avatar fallback:", err);
        setIsVideoOn(false);
      }
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
    console.log(
      "logging instances",
      zgInstance,
      localStream,
      cameraStreamID,
      screenStreamID
    );
    if (zgInstance) {
      zgInstance.stopPublishingStream(cameraStreamID!);
      localStream?.getTracks().forEach((track) => track.stop());
      zgInstance.stopPublishingStream(screenStreamID!);
      zgInstance?.logoutRoom(videoCall?.roomId?.toString()!);
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
      style={
        isScreenSharing && Boolean(screenStream)
          ? {
              position: "fixed",
              bottom: 20,
              left: 20,
              width: 300,
              height: 200,
              zIndex: 1000,
              backgroundColor: "var(--mantine-color-body)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              borderRadius: 12,
            }
          : {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1000,
              backgroundColor: "var(--mantine-color-body)",
            }
      }
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
            {/* 1. LOCAL SCREEN SHARING */}
            <Conditional condition={isScreenSharing && Boolean(screenStream)}>
              <video
                ref={localScreenRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: 200,
                  height: 150,
                  borderRadius: 8,
                  background: "#000",
                  objectFit: "cover",
                }}
              />
            </Conditional>
            {/* 2. REMOTE SCREEN SHARING */}
            <Conditional condition={Boolean(remoteScreen)}>
              <video
                ref={remoteScreenRef}
                autoPlay
                playsInline
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#000",
                }}
              />
              <Conditional condition={Boolean(remoteStream)}>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 180,
                    height: 135,
                    borderRadius: 8,
                    background: "#222",
                    zIndex: 2,
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                />
              </Conditional>
              <Conditional
                condition={
                  !remoteStream || !remoteStream.getVideoTracks().length
                }
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    width: 180,
                    height: 135,
                    borderRadius: 8,
                    background: "#222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
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
                      size={50}
                      variant="light"
                    />
                  </Stack>
                </Box>
              </Conditional>
            </Conditional>

            {/* 3. NO REMOTE SCREEN */}
            <Conditional condition={!remoteScreen}>
              <Conditional condition={Boolean(remoteStream)}>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 8,
                    background: "#000",
                  }}
                />
              </Conditional>
              <Conditional
                condition={
                  !remoteStream || !remoteStream.getVideoTracks().length
                }
              >
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
                </Box>
              </Conditional>
            </Conditional>

            <Conditional condition={!isScreenSharing}>
              <Conditional
                condition={Boolean(
                  isVideoOn && localStream?.getVideoTracks().length
                )}
              >
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    width: 180,
                    height: 135,
                    borderRadius: 8,
                    background: "#222",
                    zIndex: 2,
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                />
              </Conditional>
              <Conditional
                condition={!isVideoOn || !localStream?.getVideoTracks().length}
              >
                <Box
                  w={180}
                  h={135}
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    borderRadius: 8,
                    backgroundColor: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <Stack align="center" gap="xs">
                    <IconVideoOff size={32} color="white" />
                    <Text c="white" size="xs">
                      Camera Off
                    </Text>
                  </Stack>
                </Box>
              </Conditional>
            </Conditional>
          </Paper>
        </Box>

        {/* Control Bar */}
        <ControlBar
          isMuted={isMuted}
          toggleMute={toggleMute}
          isVideoOn={isVideoOn}
          toggleVideo={toggleVideo}
          isScreenSharing={isScreenSharing}
          toggleScreenShare={toggleScreenShare}
          endCall={endCall}
          localStream={localStream}
        />
      </Conditional>
    </Stack>
  );
};
