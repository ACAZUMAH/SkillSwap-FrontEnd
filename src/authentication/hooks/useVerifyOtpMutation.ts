import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useCallback } from "react";
import { routerEndPoints } from "src/constants";
import { useAppAuthentication, useRouteNavigation } from "src/hooks";
import {
  Authenticated,
  MutationCompleteAuthAndSignTokenArgs,
} from "src/interfaces";

const verifyOtpMutationgql = gql`
  mutation CompleteAuthAndSignToken($otp: String!) {
    completeAuthAndSignToken(otp: $otp) {
      token
      zegoToken
      user {
        id
        profile_img
        firstName
        lastName
        phoneNumber
        email
        portfolio
        linkedIn
        gitHub
        bio
        availability
        averageRating
        education {
          institution
          degree
          fieldOfStudy
          level
          endDate
        }
        skillsProficientAt {
          id
          level
          name
        }
        skillsToLearn {
          id
          level
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useVerifyOtpMutation = () => {
  const [mutate, result] = useMutation<
    { completeAuthAndSignToken: Authenticated },
    MutationCompleteAuthAndSignTokenArgs
  >(verifyOtpMutationgql, { fetchPolicy: "network-only" });

  const navigateToSignin = useRouteNavigation(routerEndPoints.SIGNIN);
  const navigateToHome = useRouteNavigation(routerEndPoints.HOME);
  const { registerUser } = useAppAuthentication();

  const verifyOtp = useCallback(
    async (data: { otp: string }) => {
      try {
        const res = await mutate({
          variables: {
            otp: data.otp,
          },
        });

        const auth = res.data?.completeAuthAndSignToken;

        console.log(auth);

        if (!auth) throw Error("Invalid token");

        registerUser(auth);

        showNotification({
          title: "Success",
          message: "Account verified successfully",
          color: "blue",
        });

        navigateToHome();
        return true;
      } catch (error: any) {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
        navigateToSignin();
      }
    },
    [registerUser, navigateToSignin, navigateToHome, mutate]
  );

  return { verifyOtp, ...result };
};
