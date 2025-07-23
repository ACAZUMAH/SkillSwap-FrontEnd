import { gql, useSubscription } from "@apollo/client";
import { useAppChats } from "src/hooks/useAppChats";
import { useAppAuthentication } from "src/hooks";
import { Subscription, SubscriptionGetChatByUserIdArgs } from "src/interfaces";

const CHAT_CREATED_SUBSCRIPTION = gql`
  subscription GetChatByUserId($userId: ID!) {
    getChatByUserId(userId: $userId) {
      id
      users {
        id
        sender {
          id
          firstName
          lastName
          profile_img
        }
        receiver {
          id
          firstName
          lastName
          profile_img
        }
      }
      updatedAt
      createdAt
    }
  }
`;

export const useChatsSubscription = () => {
  const { user } = useAppAuthentication();
  const { addChat } = useAppChats();

  useSubscription<Pick<Subscription, "getChatByUserId">, SubscriptionGetChatByUserIdArgs>(CHAT_CREATED_SUBSCRIPTION, {
    variables: { userId: user?.id },
    skip: !user?.id,
    onData: ({ data }) => {
      if (data?.data?.getChatByUserId) {
        // Add new chat to Redux state
        addChat(data?.data?.getChatByUserId.filter((chat) => chat !== null));
      }
    },
  });
};