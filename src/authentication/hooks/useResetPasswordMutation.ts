import { gql, useMutation } from "@apollo/client";
import { ForgetPasswordInput, Mutation, MutationForgetPasswordArgs } from "src/interfaces";

const resetPasswordMutationgql = gql`
  mutation ForgetPassword($data: ForgetPasswordInput!) {
    forgetPassword(data: $data) {
      message
    }
  }
`;

export const useResetPasswordMutation = () => {
  const [mutate, result] = useMutation<
    { forgetPassword: Mutation["forgetPassword"] },
    MutationForgetPasswordArgs
  >(resetPasswordMutationgql, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const resetPasswordHandler = async (data:ForgetPasswordInput) => {
    try {
      const res = await mutate({ variables: { data } });
      return res.data?.forgetPassword;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  return { resetPasswordHandler, ...result };
};
