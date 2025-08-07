import { Avatar, Text } from "@mantine/core";
import React from "react";
import { getInitialsNameLatter } from "src/helpers";

interface UserAvatarProps {
  url?: string;
  name: string;
  size?: string | number;
  textSize?: string;
  textColor?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
  onLoad?: () => void;
  style?: React.CSSProperties;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  url,
  name,
  size,
  textSize,
  width,
  height,
  textColor = "white",
  radius = "var(--mantine-radius-xl)",
  onLoad,
  style = {},
}) => {
  return (
    <>
      <Avatar
        src={url}
        style={{
          background: "#1f5de5",
          cursor: "pointer",
          width: width || "",
          height: height || "",
          borderRadius: radius,
          ...style,
        }}
        size={size || "md"}
        onLoad={onLoad}
      >
        <Text c={textColor} fw="bold" size={textSize || "Xl"}>
          {getInitialsNameLatter(name)}
        </Text>
      </Avatar>
    </>
  );
};
