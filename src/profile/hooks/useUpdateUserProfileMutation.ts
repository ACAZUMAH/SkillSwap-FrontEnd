import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationUpdateUserArgs, UpdateUserInput } from "src/interfaces";

const updateSkillsMutationGql = gql`
  mutation UpdateUser($data: UpdateUserInput) {
    updateUser(data: $data) {
      id
    }
  }
`;

export const useUpdateUserProfileMutation = () => {
  const [mutate, result] = useMutation<
    { updateUser: Mutation["updateUser"] },
    MutationUpdateUserArgs
  >(updateSkillsMutationGql, { refetchQueries: ["Me", "Search", "Recommendation"] });

  const updateUser = async (data: UpdateUserInput) => {
    try {
      const response = await mutate({
        variables: {
          data,
        },
      });

      showNotification({
        message: "Profile data updated successfully",
        color: "blue",
        title: "Success",
      });

      return response.data?.updateUser;
    } catch (error) {
      console.error("Error updating skills:", error);
      showNotification({
        title: "Error",
        message: "There was an error updating your profile. Please try again.",
        color: "red",
      });
    }
  };

  return { updateUser, ...result };
};
