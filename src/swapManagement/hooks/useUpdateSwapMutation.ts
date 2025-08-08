import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { UpdateSwapInput } from "src/interfaces";

const updateSwapMutationGql = gql`
  mutation UpdateSwap($data: updateSwapInput!) {
    updateSwap(data: $data) {
      id
    }
  }
`;

export const useUpdateSwapMutation = () => {
  const [mutate, result] = useMutation(updateSwapMutationGql, {
    refetchQueries: ["GetSwapByUsers"],
    notifyOnNetworkStatusChange: true,
  });

  const handleUpdateSwap = async (data: UpdateSwapInput) => {
    try {
      const res = await mutate({
        variables: { data },
      });

      showNotification({
        title: "Swap Updated",
        message: "The swap has been successfully updated.",
        color: "blue",
      });
      return res.data?.updateSwap;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to update the swap. Please try again.",
        color: "red",
      });
    }
  };

  return { handleUpdateSwap, ...result };
};

