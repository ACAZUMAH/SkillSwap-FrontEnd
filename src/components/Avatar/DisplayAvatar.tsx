import { Avatar, Text } from "@mantine/core";
import React from "react";
import classes from "./styles/index.module.css";
import { getInitialsNameLatter } from "src/helpers";

interface DisplayAvatarProps {
  url?: string;
  name: string;
  size?: string | number;
  textSize?: string;
  textColor?: string;
  width?: string | number;
  height?: string | number;
  radius?: string;
  style?: React.CSSProperties;
}

export const DisplayAvatar: React.FC<DisplayAvatarProps> = ({
  url,
  name,
  size,
  radius,
  textSize = "md",
  textColor = "white",
  style = {},
  width,
  height,
}) => {
  return (
    <>
      <Avatar
        className={classes.avatar}
        src={url}
        size={size}
        radius={radius}
        style={{ ...style, width, height }}
        alt={name}
      >
        <Text c={textColor} fw="bold" size={textSize}>
          {getInitialsNameLatter(name)}
        </Text>
      </Avatar>
    </>
  );
};
