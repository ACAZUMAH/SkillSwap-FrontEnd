import {
  ActionIcon,
  Box,
  Group,
  Paper,
  Select,
  Tooltip,
} from "@mantine/core";
import {
  IconCopy,
  IconDownload,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { Conditional } from "src/components";
import Editor from "@monaco-editor/react";
import { useAppSettings } from "src/hooks";
import { getFileExtension, SUPPORTED_LANGUAGES } from "./constants";
import { showNotification } from "@mantine/notifications";

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const ref = useRef<any>(null);
  const { isDarkMode } = useAppSettings();

  const handleEditorDidMount = (editor: any) => {
    ref.current = editor;
    //editor.focus();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
  };

  const copyCodetoClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      showNotification({
        title: "Copied!",
        message: "Code copied to clipboard",
        color: "green",
      });
    } catch (error) {
      console.error("Failed to copy code: ", error);
      showNotification({
        title: "Error",
        message: "Failed to copy code",
        color: "red",
      });
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Paper
      shadow="xs"
      radius="md"
      style={{
        position: fullscreen ? "fixed" : "relative",
        top: fullscreen ? 0 : "auto",
        left: fullscreen ? 0 : "auto",
        width: fullscreen ? "100vw" : "100%",
        height: fullscreen ? "100vh" : "auto",
        zIndex: fullscreen ? 1000 : "auto",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Group
        justify="space-between"
        p="xs"
        style={{
          borderBottom:
            "1px solid light-dark(var(--mantine-color-gray-3), var(--mark-color-dark-3))",
        }}
      >
        <Select
          size="xs"
          data={SUPPORTED_LANGUAGES}
          value={language}
          placeholder="Select langauge"
          onChange={(value) => setLanguage(value || "")}
        />

        <Group>
          <Tooltip label="copy code" withArrow>
            <ActionIcon variant="subtle" onClick={copyCodetoClipboard}>
              <IconCopy size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="download code" withArrow>
            <ActionIcon onClick={downloadCode} variant="subtle">
              <IconDownload size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip
            label={fullscreen ? "Exit fullscreen" : "fullscreen"}
            withArrow
          >
            <ActionIcon onClick={toggleFullscreen} variant="subtle">
              <Conditional condition={fullscreen}>
                <IconMinimize />
              </Conditional>
              <Conditional condition={!fullscreen}>
                <IconMaximize style={{ transform: "rotate(180deg)" }} />
              </Conditional>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <Box style={{ height: fullscreen ? "calc(100vh - 50px)" : "calc(100vh - 120px)" }}>
        <Editor
          theme={isDarkMode ? "vs-dark" : "light"}
          height="100%"
          value={code}
          language={language}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly: false,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
            folding: true,
            lineDecorationsWidth: 8,
            lineNumbersMinChars: 3,
            glyphMargin: false,
          }}
        />
      </Box>
    </Paper>
  );
};
