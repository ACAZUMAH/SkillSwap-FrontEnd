import React from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { Container } from "@mantine/core";
import { useAppSettings } from "src/hooks";

export const WhiteBoard: React.FC = () => {
  const settings = useAppSettings();

  const UIOptions = {
    canvasActions: {
      loadScene: false,
    }
  };

  return (
    <Container
      fluid
      px={0}
      style={{
        height: "calc(100vh - 60px)",
        maxWidth: "100%",
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <Excalidraw
          theme={settings.isDarkMode ? "dark" : "light"}
          UIOptions={UIOptions}
        />
      </div>
    </Container>
  );
};
