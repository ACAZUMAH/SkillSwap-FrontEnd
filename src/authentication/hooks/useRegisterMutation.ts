import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CreateUserInput, Mutation, MutationCreateAccountArgs } from "src/interfaces";

const registerMutationGql = gql`
  mutation CreateAccount($data: createUserInput!) {
    createAccount(data: $data) {
      message
    }
  }
`;

export const useRegisterMutation = () => {
  const [mutate, result] = useMutation<
    { createAccount: Mutation["createAccount"] },
    MutationCreateAccountArgs
  >(registerMutationGql, { fetchPolicy: "network-only", notifyOnNetworkStatusChange: true });

  const register = async (data: CreateUserInput) => {
    try {
      await mutate({
        variables: {
          data,
        },
      })

      showNotification({
        title: "Success",
        message: "OTP sent successfully",
        color: "blue"
      })
      return true;
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: "Failed to create account. Please try again.",
        color: "red"
      })
    }
  };

  return { register, ...result }
};
