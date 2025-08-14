import React from "react";
import { Stack, Paper, Box, Text } from "@mantine/core";
import { IconVideoOff } from "@tabler/icons-react";
import { Conditional } from "src/components";
import { OutGoingCall } from "./components/OutGoingCall";
import { DisplayAvatar } from "src/components/Avatar/DisplayAvatar";
import { ControlBar } from "./components/ControlBar";
import { useVideoCallActions } from "./hooks/useVideocallActions";
import classes from "./css/index.module.css";

export const VideoCallLayout: React.FC = () => {
  const {
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
    screenStream,
    user,
    videoCall,
    remoteScreen,
    remoteStream,
    localStream,
  } = useVideoCallActions();

  return (
    <Stack
      className={
        isScreenSharing && Boolean(screenStream)
          ? classes.floatingPriview
          : classes.videoCallContainer
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
            className={classes.videoPaper}
          >
            <Conditional condition={isScreenSharing && Boolean(screenStream)}>
              <Box
                className={classes.localScreenRefContainer}
              >
                <video
                  ref={localScreenRef}
                  autoPlay
                  playsInline
                  muted
                  className={classes.localScreenRef}
                />
              </Box>
            </Conditional>
            <Conditional condition={!isScreenSharing && !screenStream}>
              <Conditional condition={Boolean(remoteScreen)}>
                <video
                  ref={remoteScreenRef}
                  autoPlay
                  playsInline
                  className={classes.remoteScreenRef}
                />
                <Conditional condition={Boolean(remoteStream)}>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className={classes.remoteVideoOnShareRef}
                  />
                </Conditional>
                <Conditional
                  condition={
                    !remoteStream || !remoteStream.getVideoTracks().length
                  }
                >
                  <Box
                    className={classes.remoteFallbackOnShareRef}
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

              <Conditional condition={!remoteScreen}>
                <Conditional condition={Boolean(remoteStream)}>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className={classes.remoteVideoRef}
                  />
                </Conditional>
                <Conditional
                  condition={
                    !remoteStream || !remoteStream.getVideoTracks().length
                  }
                >
                  <Box
                    className={classes.remoteFallbackRef}
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
                    className={classes.localVideoRef}
                  />
                </Conditional>
                <Conditional
                  condition={
                    !isVideoOn || !localStream?.getVideoTracks().length
                  }
                >
                  <Box
                    w={180}
                    h={135}
                    className={classes.localFallbackRef}
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
            </Conditional>
          </Paper>
        </Box>

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
