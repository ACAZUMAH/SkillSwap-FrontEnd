import { gql, useQuery } from "@apollo/client";
import {
  QueryRecommendationArgs,
  RecomendationConnection,
  RecommendationFilters,
} from "src/interfaces";

const recommendQueryGql = gql`
  query Recommendation($filters: recommendationFilters) {
    recommendation(filters: $filters) {
      edges {
        user {
          id
          profile_img
          firstName
          lastName
          bio
          averageRating
          availability
          linkedIn
          portfolio
          gitHub
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
        matchedSkills {
          id
          level
          name
        }
        levelDifference
        matchScore
      }
      pageInfo {
        hasNextPage
        limit
        page
        total
      }
    }
  }
`;

export const useGetRecommendationsQuery = (filters?: RecommendationFilters) => {
  const { data, ...result } = useQuery<
    { recommendation: RecomendationConnection },
    QueryRecommendationArgs
  >(recommendQueryGql, {
    variables: { filters },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const recommendations = data?.recommendation.edges || [];
  const pageInfo = data?.recommendation.pageInfo;

  //console.log("recommendations", JSON.stringify(recommendations, null, 2));

  return { recommendations, pageInfo, ...result };
};
