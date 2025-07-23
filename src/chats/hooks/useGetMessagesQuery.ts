import { gql, useQuery } from "@apollo/client";
import { Query, QueryGetMessagesArgs } from "src/interfaces";

const getMessagesQuery = gql`
  query GetMessages($data: getMessageInput!) {
    getMessages(data: $data) {
      id
      users {
        id
        receiver {
          id
          profile_img
          firstName
          lastName
        }
        sender {
          id
          profile_img
          firstName
          lastName
        }
      }
      messages {
        id
        sender {
          id
        }
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
      }
      recentMessage {
        id
        sender {
          id
        }
        messageType
        message
        mediaUrl
        status
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
    }
  }
`;

export const useGetMessagesQuery = (filters: {
  chatId: string;
  from: string;
  to: string;
}, skip = false) => {
  const { data, ...result } = useQuery<Pick<Query, "getMessages">, QueryGetMessagesArgs>(getMessagesQuery, {
    variables: { data: filters },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip,
  });

  const chat = data?.getMessages;

  return { chat, ...result };
};
