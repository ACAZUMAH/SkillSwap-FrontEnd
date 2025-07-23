import { useSubscription, gql, useApolloClient } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { useAppAuthentication } from "src/hooks";
import { Status, Subscription } from "src/interfaces";

const swapUpdateSubscriptionGql = gql`
  subscription SwapUpdated($userId: ID!) {
    swapUpdated(userId: $userId) {
      id
      senderId
      receiverId
      status
      receiver {
        id
        firstName
      }
      sender {
        id
        firstName
      }
    }
  }
`;

export const useSwapUpdateSubscription = () => {
  const { user } = useAppAuthentication();
  const client = useApolloClient();

  useSubscription<Pick<Subscription, "swapUpdated">>(
    swapUpdateSubscriptionGql,
    {
      variables: { userId: user?.id },
      skip: !user?.id,

      onData: ({ data }) => {
        if (data.data?.swapUpdated) {
          const update = data.data.swapUpdated;

          client.refetchQueries({
            include: [
              "GetSwapByUsers",
              "User",
              "GetSwapRequests",
              "GetRequestedSwaps",
            ],
          });

          if (
            user?.id === update.senderId &&
            update.status === Status.Accepted
          ) {
            showNotification({
              title: "Swap Accepted",
              message: `${update?.receiver?.firstName} has accepted your swap request.`,
              color: "blue",
            });
          }

          if (
            user?.id === update.receiverId &&
            update.status === Status.Accepted
          ) {
            showNotification({
              title: "Swap Accepted",
              message: `You have accepted ${update?.sender?.firstName}'s swap request.`,
              color: "blue",
            });
          }

          if (
            user?.id === update.senderId &&
            update.status === Status.Declined
          ) {
            showNotification({
              title: "Swap Declined",
              message: `${update?.receiver?.firstName} has declined your swap request.`,
              color: "red",
            });
          }

          if (
            user?.id === update.receiverId &&
            update.status === Status.Declined
          ) {
            showNotification({
              title: "Swap Declined",
              message: `You have declined ${update?.sender?.firstName}'s swap request.`,
              color: "red",
            });
          }

          if (
            user?.id === update.senderId &&
            update.status === Status.Pending
          ) {
            showNotification({
              title: "Swap Request Sent",
              message: `You have sent a swap request to ${update?.receiver?.firstName}.`,
              color: "blue",
            });
          }

          if (
            user?.id === update.receiverId &&
            update.status === Status.Pending
          ) {
            showNotification({
              title: "Swap Request Received",
              message: `${update?.sender?.firstName} has sent you a swap request.`,
              color: "blue",
            });
          }
        }
      },
    }
  );
};
