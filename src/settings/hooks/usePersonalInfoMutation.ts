import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  Mutation,
  MutationUpdateUserArgs,
  UpdateUserInput,
} from "src/interfaces";

const updatePersonalInfoMutation = gql`
  mutation UpdateUser($data: UpdateUserInput) {
    updateUser(data: $data) {
      id
    }
  }
`;

export const usePersonalInfoMutation = () => {
  const [mutate, result] = useMutation<
    { updateUser: Mutation["updateUser"] },
    MutationUpdateUserArgs
  >(updatePersonalInfoMutation, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["Me"],
  });

  const updateHandler = async (data: UpdateUserInput) => {
    try {
      const res = await mutate({ variables: { data } });
      showNotification({
        message: "Personal information updated successfully",
        color: "blue",
        title: "Success",
      });

      return res.data?.updateUser;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to update personal information. Please try again.",
        color: "red",
      });
    }
  };

  return { updateHandler, ...result };
};
