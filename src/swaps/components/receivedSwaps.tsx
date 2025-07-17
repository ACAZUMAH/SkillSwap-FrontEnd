import { Alert, Group, SimpleGrid } from "@mantine/core";
import { useGetReceivedSwapsQuery } from "../hooks/useGetReceivedSwapsQuery";
import { SwapUserCard, SwapUserCardSkeleton } from "./swapTile";
import React from "react";
import { Conditional, Paginations } from "src/components";

export const ReceivedSwaps: React.FC = () => {
  const { swaps, pageInfo, loading, error } = useGetReceivedSwapsQuery();

  const showData: boolean = !!(swaps && swaps.length > 0);
  const showLoading = loading && !error;
  const showError = Boolean(error) && !loading;

  return (
    <>
      <Conditional condition={showLoading}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mt="xl">
            {Array.from({ length: 9 }).map((_, index) => (
                <SwapUserCardSkeleton key={index} />
            ))}
        </SimpleGrid>
      </Conditional>
      <Conditional condition={showData}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mt="xl">
          {swaps?.map((swap) => (
            <SwapUserCard
              key={swap.id}
              swapUser={swap?.sender!}
              senderId={swap.senderId}
              receiverId={swap.receiverId}
              status={swap.status}
            />
          ))}
        </SimpleGrid>
        <Group justify="flex-end" mt="xl">
          <Paginations pageInfo={pageInfo!} />
        </Group>
      </Conditional>
      <Conditional condition={!showData && !showLoading}>
        <Alert mt="md">You have not received any swaps yet.</Alert>
      </Conditional>
      <Conditional condition={showError}>
        <Alert color="red" mt="md">
          There was an error loading the received swaps. Please try again later.
        </Alert>
      </Conditional>
    </>
  );
};
