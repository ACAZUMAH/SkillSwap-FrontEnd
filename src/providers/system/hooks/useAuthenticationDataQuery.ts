import { gql, useQuery } from "@apollo/client";

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

export const useAuthenticationDataQuery = () => {
    const { data } = useQuery(authenticationDataQueryGql, {
        fetchPolicy: "network-only",
    })

    return { currentUser: data?.me }
}
