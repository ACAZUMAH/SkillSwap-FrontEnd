import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CancelSwapRequestInput, Mutation, MutationCancelSwapRequestArgs } from "src/interfaces";

const cancelRequestMutationGql = gql`
  mutation CancelSwapRequest($input: CancelSwapRequestInput!) {
    cancelSwapRequest(input: $input) {
      id
    }
  }
`;

export const useCancelUsersSwapMutation = () => {
  const [mutate, result] = useMutation<{
    cancelSwapRequest: Mutation["cancelSwapRequest"];
  }, MutationCancelSwapRequestArgs>(cancelRequestMutationGql, {
    refetchQueries: [
      "GetSwapByUsers",
      "User",
      "GetSwapRequests",
      "GetRequestedSwaps",
    ],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const cancelSwapHandler = async (input: CancelSwapRequestInput) => {
    try {
        const res = await mutate({ variables: { input } })

        showNotification({
            title: "Success",
            message: "Swap request cancelled successfully",
            color: "blue",
        })
        return res.data?.cancelSwapRequest;
    } catch (error) {
        showNotification({
            title: "Error",
            message: "An error occurred while processing your request.",
            color: "red",
        });
    }
  }

    return { cancelSwapHandler, ...result };
};
