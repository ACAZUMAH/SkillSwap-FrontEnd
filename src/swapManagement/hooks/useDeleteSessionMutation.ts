import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationDeleteSessionEntryArgs } from "src/interfaces";

const deleteSessionMutationGql = gql`
  mutation DeleteSessionEntry($sessionId: ID!) {
    deleteSessionEntry(sessionId: $sessionId) {
      id
    }
  }
`;

export const useDeleteSessionMutation = () => {
  const [mutate, result] = useMutation<
    { deleteSessionEntry: Mutation["deleteSessionEntry"] },
    MutationDeleteSessionEntryArgs
  >(deleteSessionMutationGql, {
    refetchQueries: ["GetSwapByUsers"],
    notifyOnNetworkStatusChange: true,
  });

  const handleDeleteSessionEntry = async (sessionId: string) => {
    try {
      const res = await mutate({ variables: { sessionId } });
      showNotification({
        title: "Session Deleted",
        message: "The session has been successfully deleted.",
        color: "blue",
      });

      return res.data?.deleteSessionEntry;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to delete the session. Please try again.",
        color: "red",
      });
    }
  };

  return { handleDeleteSessionEntry, ...result };
};
