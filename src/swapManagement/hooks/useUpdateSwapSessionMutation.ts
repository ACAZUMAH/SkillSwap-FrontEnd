import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  Mutation,
  MutationUpdateSwapSessionArgs,
  UpdateSwapSessionInput,
} from "src/interfaces";

const updateSwapSessionMutationGql = gql`
  mutation UpdateSwapSession($data: UpdateSwapSessionInput!) {
    updateSwapSession(data: $data) {
      id
    }
  }
`;

export const useUpdateSwapSessionMutation = () => {
  const [mutate, result] = useMutation<
    { updateSwapSession: Mutation["updateSwapSession"] },
    MutationUpdateSwapSessionArgs
  >(updateSwapSessionMutationGql, {
    refetchQueries: ["GetSwapByUsers"],
    notifyOnNetworkStatusChange: true,
  });

  const handleUpdateSwapSession = async (data: UpdateSwapSessionInput) => {
    try {
      const res = await mutate({
        variables: { data },
      });
      showNotification({
        title: "Session Updated",
        message: "The session has been successfully updated.",
        color: "blue",
      });
      return res.data?.updateSwapSession;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to update the session. Please try again.",
        color: "red",
      });
    }
  };

  return { handleUpdateSwapSession, ...result };
};
