import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationChangePasswordArgs, UpdatePasswordInput } from "src/interfaces";

const changePasswordMutationGql = gql`
  mutation ChangePassword($data: UpdatePasswordInput!) {
    changePassword(data: $data) {
      message
    }
  }
`;

export const useChangePasswordMutation = () => {
  const [mutate, result] = useMutation<
    { changePassword: Mutation["changePassword"] },
    MutationChangePasswordArgs
  >(changePasswordMutationGql, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const updateHandler = async (data: UpdatePasswordInput) => {
    try {
        const res = await mutate({ variables: { data } });

        showNotification({
            title: "Success",
            message: res.data?.changePassword.message || "Password changed successfully",
            color: "blue",
        })

        return res.data?.changePassword;
    } catch (error) {
        showNotification({
            title: "Error",
            message: "Failed to change password. Please try again.",
            color: "red",
        })
    }
  }

  return { updateHandler, ...result };
};
