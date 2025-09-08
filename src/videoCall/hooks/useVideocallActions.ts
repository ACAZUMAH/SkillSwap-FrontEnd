import { useEffect, useRef, useState } from "react";
import { useAppAuthentication, useSocket } from "src/hooks";
import { useAppVideoCall } from "src/hooks/useAppvideoCall";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

/**
 *
 * @returns
 */
export const useVideoCallActions = () => {
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

  const [remoteCameraStreamID, setRemoteCameraStreamID] = useState<
    string | null
  >(null);
  const [remoteScreenStreamID, setRemoteScreenStreamID] = useState<
    string | null
  >(null);

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
    }
  }, [videoCall]);

  useEffect(() => {
    if (!zgInstance) return;

    if (remoteCameraStreamID && remoteVideoRef.current) {
      // some SDK builds accept an element argument
      zgInstance
        // @ts-ignore
        .startPlayingStream(remoteCameraStreamID, remoteVideoRef.current)
        .catch(() => {});
    }

    if (remoteScreenStreamID && remoteScreenRef.current) {
      // some SDK builds accept an element argument
      zgInstance
        // @ts-ignore
        .startPlayingStream(remoteScreenStreamID, remoteScreenRef.current)
        .catch(() => {});
    }
  }, [zgInstance, remoteCameraStreamID, remoteScreenStreamID]);

  useEffect(() => {
    const startCall = async () => {
      const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");
      const zego = new ZegoExpressEngine(
        parseInt(`${import.meta.env.VITE_ZEGO_APP_ID}`),
        `${import.meta.env.VITE_ZEGO_SERVER_SECRET}`
      );
      setZgInstance(zego);

      zego.on("roomStreamUpdate", async (_roomId, updateType, streamList) => {
        if (updateType === "ADD") {
          for (const streamInfo of streamList) {
            const isScreen = streamInfo.streamID.includes("-screen");
            const targetEl = isScreen
              ? remoteScreenRef.current
              : remoteVideoRef.current;
            try {
              if (targetEl) {
                // Many Zego SDK builds accept an HTMLMediaElement to render into.
                // @ts-ignore - some typings don't include element overload
                await zego.startPlayingStream(streamInfo.streamID, targetEl);

                if (isScreen) {
                  setRemoteScreenStreamID(streamInfo.streamID);
                } else {
                  setRemoteCameraStreamID(streamInfo.streamID);
                }

                try {
                  // try to obtain the MediaStream if SDK returns one
                  // some SDKs return a MediaStream even when element provided
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const maybeStream = await zego.getPlayingStream?.(
                    streamInfo.streamID
                  );
                  if (maybeStream) {
                    if (isScreen) setRemoteScreen(maybeStream as MediaStream);
                    else setRemoteStream(maybeStream as MediaStream);
                  }
                } catch {}
              } else {
                const remoteStream = await zego.startPlayingStream(
                  streamInfo.streamID
                );
                if (isScreen) {
                  setRemoteScreen(remoteStream as MediaStream);
                  setRemoteScreenStreamID(streamInfo.streamID);
                } else {
                  setRemoteStream(remoteStream as MediaStream);
                  setRemoteCameraStreamID(streamInfo.streamID);
                }
              }

              if (isScreen && remoteCameraStreamID && remoteVideoRef.current) {
                // rebind camera explicitly to the small element
                // @ts-ignore
                await zego
                  .startPlayingStream(
                    remoteCameraStreamID,
                    remoteVideoRef.current as unknown as any
                  )
                  .catch(() => {});
              }
            } catch (error) {
              console.warn(
                "Failed to start playing stream",
                streamInfo.streamID,
                error
              );
            }
          }
        } else if (updateType === "DELETE") {
          for (const streamInfo of streamList) {
            try {
              zego.stopPlayingStream(streamInfo.streamID);
            } catch (error) {
              console.error("Error stopping stream:", error);
            }

            if (streamInfo.streamID.includes("-screen")) {
              if (remoteScreenRef.current) {
                remoteScreenRef.current.srcObject = null;
              }
              setRemoteScreen(null);
              setRemoteScreenStreamID((id) =>
                id === streamInfo.streamID ? null : id
              );

              if (
                remoteCameraStreamID &&
                remoteVideoRef.current &&
                zgInstance
              ) {
                // @ts-ignore
                zgInstance
                  .startPlayingStream(
                    remoteCameraStreamID,
                    remoteVideoRef.current as unknown as any
                  )
                  .catch(() => {});
              }
            } else {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
              }
              setRemoteStream(null);
              setRemoteCameraStreamID((id) =>
                id === streamInfo.streamID ? null : id
              );
            }
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
      setScreenStreamID(null);
    }
    setIsScreenSharing(false);
  };

  const endCall = () => {
    if (zgInstance) {
      if (cameraStreamID) zgInstance.stopPublishingStream(cameraStreamID);
      if (screenStreamID) zgInstance.stopPublishingStream(screenStreamID);

      if (localStream) localStream.getTracks().forEach((track) => track.stop());
      if (screenStream)
        screenStream.getTracks().forEach((track) => track.stop());

      zgInstance.logoutRoom(videoCall?.roomId?.toString()!);

      zgInstance.destroyEngine();

      setZgInstance(null);
    }
    socket?.emit("reject-incoming-call", {
      id:
        videoCall?.users?.receiverId !== user?.id
          ? videoCall?.users?.receiverId
          : videoCall?.users?.senderId,
    });
    setCallAccepted(false);
    resetVideoCall();
    setLocalStream(null);
    setRemoteStream(null);
    setRemoteScreen(null);
    setScreenStream(null);
    setCameraStreamID(null);
    setScreenStreamID(null);
  };

  return {
    localVideoRef,
    localScreenRef,
    remoteVideoRef,
    remoteScreenRef,
    isMuted,
    isVideoOn,
    isScreenSharing,
    callAccepted,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    endCall,
    localStream,
    remoteStream,
    remoteScreen,
    screenStream,
    user,
    videoCall,
  };
};
