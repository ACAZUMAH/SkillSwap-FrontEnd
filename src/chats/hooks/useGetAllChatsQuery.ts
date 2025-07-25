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
      }
      updatedAt
      createdAt
    }
  }
`;

export const useGetAllChatsQuery = (skip = false) => {
  const { data, ...result } = useQuery<
    Pick<Query, "allChats">,
    QueryAllChatsArgs
  >(getAllChatsQuery, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip,
  });

  const chats = data?.allChats || [];

  return { chats, ...result };
};
