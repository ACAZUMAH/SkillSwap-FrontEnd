import { Button } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import React from "react";
import { Conditional } from "src/components";
import { useAppAuthentication } from "src/hooks";
import { Status, Swap } from "src/interfaces";
import { useUpdateSwapMutation } from "../hooks/useUpdateSwapMutation";

interface SwapStatusButtonsProps {
  swapData?: Swap | null;
}

export const SwapStatusButtons: React.FC<SwapStatusButtonsProps> = ({
  swapData,
}) => {
  const { user } = useAppAuthentication();
  const { updateHandler, loading } = useUpdateSwapMutation()

  const handleAcceptRequest = () => {
    if(user?.id === swapData?.receiverId){
      updateHandler({
        swapId: swapData?.id!,
        status: Status.Accepted
      })
    }
  }

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
          loading={loading}
          onClick={handleAcceptRequest}
        >
        { swapData?.receiverId === user?.id ? 'Accept' : 'Pending' }
        </Button>
      </Conditional>
      <Conditional condition={swapData?.status! === "ACCEPTED"}>
        <Button variant="default" c="red" radius="xl" w="40%">
          Cancel Swap
        </Button>
      </Conditional>
      <Conditional condition={swapData?.status! === "DECLINED"}>
        <Button variant="outline" color="red" radius="xl" disabled w="40%">
          {swapData?.senderId === user?.id ? 'Rejected' : 'Declined' }
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
