import { useState } from "react";
import { sentSwaps } from "./sentSwaps";
import { receivedSwaps } from "./receivedSwaps";
import { SegmentedControl, Paper, Space, Center } from "@mantine/core";

export const Swaps: React.FC = () => {
  const [view, setView] = useState<"sent" | "received">("sent")
  return (
    <Paper>
      <Space h="md"/>
      <Center>
        <SegmentedControl
          value={view}
          radius="md"
          size="md"
          onChange={(val) => setView(val as "sent" | "received")}
          data={[
            { label: "Sent Swaps", value: "sent" },
            { label: "Received Swaps", value: "received" },
          ]}
          mb="lg"
        />
      </Center>
      {view === "sent" && sentSwaps()}
      {view === "received" && receivedSwaps()}
    </Paper>
  )
};
