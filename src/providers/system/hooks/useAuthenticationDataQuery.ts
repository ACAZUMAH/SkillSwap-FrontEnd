import { gql, useQuery } from "@apollo/client";
import { Query } from "src/interfaces";

const authenticationDataQueryGql = gql`
  query Me {
    me {
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

export const useAuthenticationDataQuery = (isAuthenticated: boolean) => {
    const { data } = useQuery<Pick<Query, "me">>(authenticationDataQueryGql, {
        fetchPolicy: "network-only",
        skip: !isAuthenticated,
    })

    return { currentUser: data?.me }
}
