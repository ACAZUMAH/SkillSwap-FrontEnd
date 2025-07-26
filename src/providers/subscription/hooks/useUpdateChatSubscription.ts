import { useSubscription, gql } from "@apollo/client";
import { useAppAuthentication } from "src/hooks";
import { useAppChats } from "src/hooks/useAppChats";
import { Subscription, SubscriptionNewChatCreatedArgs } from "src/interfaces";

const updateChatSubscriptionGql = gql`
  subscription NewChatCreated($userId: ID!) {
    newChatCreated(userId: $userId) {
      id
      users {
        id
        senderId
        receiverId
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
      messages {
        id
        sender {
          id
          firstName
          lastName
          profile_img
        }
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
        senderId
      }
      recentMessage {
        id
        sender {
          id
          firstName
          lastName
          profile_img
        }
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
        senderId
      }
      updatedAt
      createdAt
    }
  }
`;

export const useUpdateChatSubscription = () => {
  const { user } = useAppAuthentication();
  const { addNewChat } = useAppChats();

  useSubscription<
    Pick<Subscription, "newChatCreated">,
    SubscriptionNewChatCreatedArgs
  >(updateChatSubscriptionGql, {
    variables: { userId: user?.id! },
    skip: !user?.id,

    onData: ({ data }) => {
      if (data.data?.newChatCreated) {
        const newChat = data.data?.newChatCreated;
        addNewChat(newChat);
      }
    },
  });
};
