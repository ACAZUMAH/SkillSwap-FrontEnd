import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationCreateSwapRequestArgs, SwapRequestInput } from "src/interfaces";

const swapMutationGql = gql`
  mutation CreateSwapRequest($input: SwapRequestInput!) {
    createSwapRequest(input: $input) {
      id
      status
    }
  }
`;

export const useSwapMutation = () => {
  const [mutate, result] = useMutation<
    { createSwapRequest: Mutation["createSwapRequest"] },
    MutationCreateSwapRequestArgs
  >(swapMutationGql, {
    refetchQueries: ["GetSwapByUsers", "User", "GetSwapRequests", "GetRequestedSwaps"],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const swap = async (input: SwapRequestInput) => {
    try {
        const res = await mutate({ variables: { input } })

        showNotification({
            title: "Success",
            message: "Swap request send successfully",
            color: "blue",
        });

        return res.data?.createSwapRequest;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "An error occurred while processing your request.",
        color: "red",
      });
    }
  };

    return { swap, ...result }
};
