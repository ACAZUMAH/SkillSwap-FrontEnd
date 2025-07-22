import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  AcceptOrDeclineSwapInput,
  Mutation,
  MutationAcceptOrDeclineSwapRequestArgs,
} from "src/interfaces";

const updateSwapMutationGql = gql`
  mutation AcceptOrDeclineSwapRequest($input: AcceptOrDeclineSwapInput!) {
    acceptOrDeclineSwapRequest(input: $input) {
      id
      senderId
      receiverId
      status
    }
  }
`;

export const useUpdateSwapMutation = () => {
  const [mutate, result] = useMutation<
    {
      acceptOrDeclineSwapRequest: Mutation["acceptOrDeclineSwapRequest"];
    },
    MutationAcceptOrDeclineSwapRequestArgs
  >(updateSwapMutationGql, {
    refetchQueries: [
      "GetSwapByUsers",
      "User",
      "AllChats",
      "GetSwapRequests",
      "GetRequestedSwaps",
    ],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const updateHandler = async (input: AcceptOrDeclineSwapInput) => {
    try {
      const res = await mutate({ variables: { input } });

      showNotification({
        title: "Success",
        message: "",
        color: "blue",
      });

      return res.data?.acceptOrDeclineSwapRequest;
    } catch (error) {}
  };

  return { updateHandler, ...result };
};
