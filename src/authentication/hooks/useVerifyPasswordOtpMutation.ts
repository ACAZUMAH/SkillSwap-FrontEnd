import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  Mutation,
  MutationVerifyOtpAndSaveNewPasswordArgs,
} from "src/interfaces";

const verifyPasswordOtpMutationgql = gql`
  mutation VerifyOtpAndSaveNewPassword($otp: String!) {
    verifyOtpAndSaveNewPassword(otp: $otp) {
      message
    }
  }
`;

export const useVerifyPasswordOtpMutation = () => {
  const [mutate, result] = useMutation<
    {
      verifyOtpAndSaveNewPassword: Mutation["verifyOtpAndSaveNewPassword"];
    },
    MutationVerifyOtpAndSaveNewPasswordArgs
  >(verifyPasswordOtpMutationgql, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const verifyHandler = async (otp: string) => {
    try {
      const res = await mutate({ variables: { otp } });

      showNotification({
        title: "Success",
        message: "Password updated successfully. Please log in.",
        color: "blue",
      })
      return res.data?.verifyOtpAndSaveNewPassword;
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to verify OTP. Please try again.",
        color: "red",
      });
    }
  };

  return { verifyHandler, ...result };
};
