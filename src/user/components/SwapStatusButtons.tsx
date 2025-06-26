import { Button } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { Swap } from "src/interfaces";

interface SwapStatusButtonsProps {
  swapData?: Swap | null;
}

export const SwapStatusButtons: React.FC<SwapStatusButtonsProps> = ({
  swapData,
}) => {
  return (
    <>
      {" "}
      <Conditional condition={swapData?.status! === "PENDING"}>
        <Button
          leftSection={<IconClock stroke={1.5} />}
          radius="xl"
          variant="outline"
          color="yellow"
          w="40%"
        >
          Pending
        </Button>
      </Conditional>
      <Conditional condition={swapData?.status! === "ACCEPTED"}>
        <Button variant="filled" color="green" radius="xl" w="40%">
          Cancel Swap
        </Button>
      </Conditional>
      <Conditional condition={swapData?.status! === "DECLINED"}>
        <Button variant="outline" color="red" radius="xl" disabled w="40%">
          Rejected
        </Button>
      </Conditional>
      <Conditional condition={swapData?.status! === "COMPLETED"}>
        <Button variant="filled" radius="xl" w="40%">
          Completed
        </Button>
      </Conditional>
    </>
  );
};
