import { gql, useQuery } from "@apollo/client";
import { Query } from "src/interfaces";

const recommendQueryGql = gql`
  query Recommendation {
    recommendation {
      user {
        id
        profile_img
        firstName
        lastName
        bio
        averageRating
        availability
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
      }
      matchScore
      matchedSkill
      levelDifference
    }
  }
`;

export const useRecommendQuery = () => {
  const { data, ...result } = useQuery<Pick<Query, "recommendation">>(
    recommendQueryGql,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    }
  );

  const recommendations = data?.recommendation || [];

  return { recommendations, ...result };
};
