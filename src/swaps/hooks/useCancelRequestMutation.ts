import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  CancelSwapRequestInput,
  Mutation,
  MutationCancelSwapRequestArgs,
} from "src/interfaces";

const updateSwapMutationGql = gql`
  mutation CancelSwapRequest($input: CancelSwapRequestInput!) {
    cancelSwapRequest(input: $input) {
      id
    }
  }
`;

export const useCancelSwapMutation = () => {
  const [mutate, result] = useMutation<
    {
      cancelSwapRequest: Mutation["cancelSwapRequest"];
    },
    MutationCancelSwapRequestArgs
  >(updateSwapMutationGql, {
    refetchQueries: [
      "GetSwapByUsers",
      "User",
      "GetSwapRequests",
      "GetRequestedSwaps",
    ],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const cancelRequestHandler = async (input: CancelSwapRequestInput) => {
    try {
      const res = await mutate({ variables: { input } });
      showNotification({
        title: "Swap Request Cancelled",
        message: "Your swap request has been successfully cancelled.",
        color: "blue",
      });
      return res.data?.cancelSwapRequest;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to cancel swap request. Please try again.",
        color: "red",
      });
    }
  };

  return { cancelRequestHandler, ...result };
};
