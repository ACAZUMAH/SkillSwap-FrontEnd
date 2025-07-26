import { gql, useQuery } from "@apollo/client";
import { Query, QueryGetMessagesArgs } from "src/interfaces";

const getMessagesQuery = gql`
  query GetMessages($data: getMessageInput!) {
    getMessages(data: $data) {
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
        senderId
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
        sender {
          id
          firstName
          lastName
          profile_img
        }
      }
      recentMessage {
        id
        senderId
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
        sender {
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

export const useGetMessagesQuery = (
  filters: {
    chatId: string;
    from: string;
    to: string;
  },
  skip = false
) => {
  const { data, ...result } = useQuery<
    Pick<Query, "getMessages">,
    QueryGetMessagesArgs
  >(getMessagesQuery, {
    variables: { data: filters },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip,
  });

  const chat = data?.getMessages;

  return { chat, ...result };
};
