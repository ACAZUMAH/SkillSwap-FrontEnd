import { gql, useQuery } from "@apollo/client";
import { Query, QueryAllChatsArgs } from "src/interfaces";

const getAllChatsQuery = gql`
  query AllChats {
    allChats {
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
      messages {
        id
        sender {
          firstName
          lastName
          profile_img
        }
        messageType
        message
        mediaUrl
        isRead
        isDeleted
        timestamp
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
        isRead
        isDeleted
        timestamp
      }
      createdAt
      updatedAt
    }
  }
`;

export const useGetAllChatsQuery = () => {

  const { data, ...result } = useQuery<
    Pick<Query, "allChats">,
    QueryAllChatsArgs
  >(getAllChatsQuery, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const chats = data?.allChats || [];

  return { chats, ...result };
};
