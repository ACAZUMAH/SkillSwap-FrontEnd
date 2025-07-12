import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Mutation, MutationUpdateUserArgs, UpdateUserInput } from "src/interfaces";

const updateSkillsMutationGql = gql`
  mutation UpdateUser($data: UpdateUserInput) {
    updateUser(data: $data) {
      id
      profile_img
      firstName
      lastName
      phoneNumber
      email
      portfolio
      linkedIn
      gitHub
      bio
      availability
      averageRating
      education {
        institution
        degree
        fieldOfStudy
        level
        endDate
      }
      skillsProficientAt {
        id
        level
        name
      }
      skillsToLearn {
        id
        level
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const useUpdateSkillsMutation = () => {
  const [mutate, result] = useMutation<
    { updateUser: Mutation["updateUser"] },
    MutationUpdateUserArgs
  >(updateSkillsMutationGql, { refetchQueries: ["Recommendation", "Search"] });

  const updateUser = async (data: UpdateUserInput) => {
    try {
      const response = await mutate({
        variables: {
          data,
        },
      });

      showNotification({
        message: "Skills updated successfully",
        color: "blue",
        title: "Success",
      });

      return response.data?.updateUser;
    } catch (error) {
      console.error("Error updating skills:", error);
      showNotification({
        title: "Error",
        message: "Failed to update skills. Please try again.",
        color: "red",
      });
    }
  };

  return { updateUser, ...result };
};
