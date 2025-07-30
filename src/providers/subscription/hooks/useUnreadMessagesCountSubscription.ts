import { gql, useSubscription } from "@apollo/client";
import { useAppAuthentication, useAppChats } from "src/hooks";
import { Subscription } from "src/interfaces";

const unreadMessagesCountSubscriptionGql = gql`
  subscription UnreadMessagesCount($userId: ID!) {
    unreadMessagesCount(userId: $userId) {
      chatId
      unreadCount
    }
  }
`;

export const useUnreadMessagesCountSubscription = () => {
  const { user } = useAppAuthentication();
  const { updateUnreadCount } = useAppChats();
  return useSubscription<{
    unreadMessagesCount: Subscription["unreadMessagesCount"];
  }>(unreadMessagesCountSubscriptionGql, {
    variables: { userId: user?.id },
    skip: !user?.id,

    onData: ({ data }) => {
      if (data?.data?.unreadMessagesCount) {
        data.data.unreadMessagesCount.forEach((item) => {
          if (item) {
            const { chatId, unreadCount } = item;
            updateUnreadCount(chatId, unreadCount);
          }
        });
      }
    },
  });
};
