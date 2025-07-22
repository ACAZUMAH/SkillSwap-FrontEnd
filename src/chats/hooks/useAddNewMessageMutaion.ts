import { gql, useMutation } from "@apollo/client";
import {
  Mutation,
  MutationUpsertMessageArgs,
  NewMessageInput,
} from "src/interfaces";

const addNewMessageMutationGql = gql`
  mutation UpsertMessage($data: newMessageInput!) {
    upsertMessage(data: $data) {
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
          profile_img
          firstName
          lastName
        }
        messageType
        message
        mediaUrl
        status
        updatedAt
      }
      recentMessage {
        id
        sender {
          id
          profile_img
          firstName
          lastName
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

export const useAddNewMessageMutation = () => {
  const [mutate, result] = useMutation<
    { upsertMessage: Mutation["upsertMessage"] },
    MutationUpsertMessageArgs
  >(addNewMessageMutationGql, {
    refetchQueries: ["AllChats"],
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const addNewMessage = async (data: NewMessageInput) => {
    try {
      const res = await mutate({
        variables: { data },
      });

      return res.data?.upsertMessage;
    } catch (error) {
      console.error("Error adding new message:", error);
    }
  };

  return { addNewMessage, ...result };
};
