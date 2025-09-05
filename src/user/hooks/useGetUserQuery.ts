import { gql, useQuery } from "@apollo/client";
import { Query, QueryUserArgs } from "src/interfaces";

const userQueryGql = gql`
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
        startDate
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
  const { data, ...result } = useQuery<Pick<Query, "user">, QueryUserArgs>(
    userQueryGql,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      variables: { id },
    }
  );

    const user = data?.user;

    return { user, ...result }
};
