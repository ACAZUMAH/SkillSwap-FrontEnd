import { gql, useQuery } from "@apollo/client";
import { QueryUserArgs, User } from "src/interfaces";

const userQuerygql = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      profile_img
      firstName
      lastName
      phoneNumber
      email
      bio
      gitHub
      linkedIn
      portfolio
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
        name
        level
      }
      skillsToLearn {
        id
        name
        level
      }
      availability
    }
  }
`;

export const useGetUserQuery = (id: string) => {
  const { data, ...result } = useQuery<{ user: User }, QueryUserArgs>(
    userQuerygql,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      variables: { id },
    }
  );

    const user = data?.user;

    return { user, ...result }
};
