import React from "react";
import { Group, Paper, ActionIcon, Tooltip, Divider } from "@mantine/core";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconSettings,
  IconPhone,
  IconDeviceImacUp,
} from "@tabler/icons-react";
import { Conditional } from "src/components";

interface ControlBarProps {
  isMuted: boolean;
  toggleMute: () => void;
  isVideoOn: boolean;
  toggleVideo: () => void;
  isScreenSharing: boolean;
  toggleScreenShare: () => void;
  endCall: () => void;
  localStream?: MediaStream | null;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  isMuted,
  toggleMute,
  isVideoOn,
  toggleVideo,
  isScreenSharing,
  toggleScreenShare,
  endCall,
  localStream,
}) => {
  return (
    <Paper
      shadow="md"
      radius="md"
      p={isScreenSharing ? "xs" : "sm"}
      style={
        isScreenSharing
          ? {
              position: "absolute",
              bottom: 10,
              left: 10,
              right: 10,
              width: "auto",
              background: "rgba(30,30,30,0.85)",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
            }
          : {}
      }
    >
      <Group justify="center" gap="md">
        <Tooltip label={isMuted ? "Unmute" : "Mute"}>
          <ActionIcon
            size={isScreenSharing ? "md" : "xl"}
            variant={isMuted ? "filled" : "light"}
            color={isMuted ? "red" : "blue"}
            onClick={toggleMute}
            radius="xl"
          >
            {isMuted ? (
              <IconMicrophoneOff size={isScreenSharing ? 18 : 24} />
            ) : (
              <IconMicrophone size={isScreenSharing ? 18 : 24} />
            )}
          </ActionIcon>
        </Tooltip>

        <Tooltip label={isVideoOn ? "Turn off camera" : "Turn on camera"}>
          <ActionIcon
            size={isScreenSharing ? "md" : "xl"}
            variant={isVideoOn ? "light" : "filled"}
            color={isVideoOn ? "blue" : "red"}
            onClick={toggleVideo}
            radius="xl"
          >
            <Conditional
              condition={Boolean(
                isVideoOn && localStream?.getVideoTracks().length
              )}
            >
              <IconVideo size={isScreenSharing ? 18 : 24} />
            </Conditional>
            <Conditional
              condition={!isVideoOn || !localStream?.getVideoTracks().length}
            >
              <IconVideoOff size={isScreenSharing ? 18 : 24} />
            </Conditional>
          </ActionIcon>
        </Tooltip>

        <Tooltip label={isScreenSharing ? "Stop sharing" : "Share screen"}>
          <ActionIcon
            size={isScreenSharing ? "md" : "xl"}
            variant={isScreenSharing ? "filled" : "light"}
            color={isScreenSharing ? "green" : "blue"}
            onClick={toggleScreenShare}
            radius="xl"
          >
            <IconDeviceImacUp size={isScreenSharing ? 18 : 24} />
          </ActionIcon>
        </Tooltip>

        <Divider orientation="vertical" />

        <Tooltip label="Settings">
          <ActionIcon
            size={isScreenSharing ? "md" : "xl"}
            variant="light"
            color="gray"
            radius="xl"
          >
            <IconSettings size={isScreenSharing ? 18 : 24} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="End call">
          <ActionIcon
            size={isScreenSharing ? "md" : "xl"}
            variant="filled"
            color="red.9"
            onClick={endCall}
            radius="xl"
            w={70}
          >
            <IconPhone
              size={isScreenSharing ? 18 : 24}
              style={{ transform: "rotate(135deg)" }}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Paper>
  );
};
