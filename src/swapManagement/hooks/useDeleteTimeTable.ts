import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationDeleteTimeTableEntryArgs } from "src/interfaces";

const deleteTimeTableMutationGql = gql`
  mutation DeleteTimeTableEntry($entryId: ID!) {
    deleteTimeTableEntry(entryId: $entryId) {
      id
    }
  }
`;

export const useDeleteTimeTableEntryMutation = () => {
  const [mutate, result] = useMutation<
    { deleteTimetableEntry: Mutation["deleteTimeTableEntry"] },
    MutationDeleteTimeTableEntryArgs
  >(deleteTimeTableMutationGql, {
    refetchQueries: ["GetSwapByUsers"],
    notifyOnNetworkStatusChange: true,
  });

  const handelDeleteTimeTableEntry = async (entryId: string) => {
    try {
        const res = await mutate({
            variables: { entryId }
        })
        showNotification({
           title: "Success",
           message: "Time table entry deleted successfully",
           color: 'blue'
        })
        return res.data?.deleteTimetableEntry
    } catch (error) {
        showNotification({
           title: "Error",
           message: "Failed to delete time table entry. Please try again.",
           color: 'red'
        })
    }
  }

  return { handelDeleteTimeTableEntry, ...result }
};
