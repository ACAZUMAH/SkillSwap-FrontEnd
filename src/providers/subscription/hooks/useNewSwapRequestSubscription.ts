import { useSubscription, gql, useApolloClient } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useAppAuthentication } from "src/hooks";
import { Subscription, SubscriptionNewSwapRequestArgs } from "src/interfaces";

const newSwapRequestSubscriptionGql = gql`
  subscription NewSwapRequest($userId: ID!) {
    newSwapRequest(userId: $userId) {
      id
      senderId
      receiverId
      status
      receiver {
        firstName
      }
      sender {
        firstName
      }
    }
  }
`;

export const useNewSwapRequestSubscription = () => {
  const { user } = useAppAuthentication();
  const client = useApolloClient();
  return useSubscription<
    Pick<Subscription, "newSwapRequest">,
    SubscriptionNewSwapRequestArgs
  >(newSwapRequestSubscriptionGql, {
    variables: { userId: user?.id! },
    skip: !user?.id,

    onData: ({ data }) => {
      if (data?.data?.newSwapRequest) {
        const newRequest = data.data.newSwapRequest;

        client.refetchQueries({
          include: [
            "GetSwapByUsers",
            "GetSwapRequests",
            "GetRequestedSwaps",
          ],
        });

        if (
          newRequest.status === "PENDING" &&
          user?.id === newRequest.receiverId
        ) {
          showNotification({
            title: "New Swap Request",
            message: `You have recieived a new swap request from ${newRequest?.sender?.firstName}.`,
            color: "blue",
          });
        }
      }
    },

    onComplete: () => {
      console.log("New swap request subscription completed");
    },

    onError: (error) => {
      console.error("Error in new swap request subscription:", error);
    },
  });
};
