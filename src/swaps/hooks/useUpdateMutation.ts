import { gql, useMutation } from "@apollo/client";
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
      "GetSwapRequests",
      "GetRequestedSwaps",
    ],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const updateHandler = async (input: AcceptOrDeclineSwapInput) => {
    try {
      const res = await mutate({ variables: { input } });

      return res.data?.acceptOrDeclineSwapRequest;
    } catch (error) {}
  };

  return { updateHandler, ...result };
};
