import { gql, useQuery } from "@apollo/client";
import { Query, QueryGetSwapByUsersArgs, SwapByUsers } from "src/interfaces";

const getSwapQueryGql = gql`
  query GetSwapByUsers($data: SwapByUsers) {
    getSwapByUsers(data: $data) {
      id
      status
      senderId
      receiverId
      skills {
        By
        level
        name
      }
      timeTable {
        skill
        taughtBy
        dayOfweek
        time
        durationInWeeks
        startDate
      }
      sessions {
        taughtBy
        receivedBy
        skill
        date
        time
        status
      }
      createdAt
      updatedAt
      sender {
        id
        profile_img
        firstName
        lastName
        email
        phoneNumber
        bio
        gitHub
        linkedIn
        portfolio
        averageRating
        availability
        education {
          level
          institution
          fieldOfStudy
          degree
          startDate
          endDate
        }
        isProfileComplete
        password
        isAuthenticated
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
        createdAt
        updatedAt
      }
      receiver {
        id
        profile_img
        firstName
        lastName
        email
        phoneNumber
        bio
        gitHub
        linkedIn
        portfolio
        averageRating
        availability
        education {
          level
          institution
          fieldOfStudy
          degree
          startDate
          endDate
        }
        isProfileComplete
        password
        isAuthenticated
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
        createdAt
        updatedAt
      }
    }
  }
`;

export const getSwapByUsersQuery = (filters: SwapByUsers) => {
  const { data, ...result } = useQuery<
    { getSwapByUsers: Query["getSwapByUsers"] },
    QueryGetSwapByUsersArgs
  >(getSwapQueryGql, {
    variables: { data: filters },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const swap = data?.getSwapByUsers ? data.getSwapByUsers : null;

  return { swap, ...result };
};
