import {
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { Conditional, UserCard, UserCardSkeleton } from "src/components";
import { useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";
import { useGetRecommendationsQuery } from "../hooks/useRecommendQuery";
import { useDisclosure } from "@mantine/hooks";

interface RecommendationProps {
  setNoRecommendations?: (value: boolean) => void;
}

export const Recommended: React.FC<RecommendationProps> = ({
  setNoRecommendations,
}) => {
  const [oponed, { open, close }] = useDisclosure(false);
  const navigateToMore = useRouteNavigation(routerEndPoints.RECOMMENDATIONS);

  const { recommendations, pageInfo, loading, error } =
    useGetRecommendationsQuery({ page: 1, limit: 6 });

  const showData = !loading && !error && recommendations.length > 0;
  const showLoading = loading && !error;
  const showRecommendations = showData || showLoading;

  useEffect(() => {
    if (!showRecommendations && setNoRecommendations) {
      setNoRecommendations(true);
    }
  }, [showRecommendations]);

  return (
    <Conditional condition={showRecommendations}>
      <Box mt="lg" mb="xl">
        <Group justify="space-between" mb="md">
          <Flex align="center">
            <IconInfoCircle
              stroke={1.5}
              size={20}
              color="blue"
              style={{ marginLeft: "2px" }}
            />
            <Title order={2} fw={500}>
              Recommended
            </Title>
          </Flex>

          <Conditional condition={pageInfo?.hasNextPage!}>
            <Button
              variant="outline"
              size="xs"
              radius="xl"
              onClick={navigateToMore}
            >
              <IconArrowRight />
            </Button>
          </Conditional>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mb="md">
          <Conditional condition={showLoading}>
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </Conditional>

          <Conditional condition={showData}>
            {recommendations?.slice(0, 3).map((rec, index) => (
              <UserCard key={index} user={rec?.user!} />
            ))}
          </Conditional>
        </SimpleGrid>
        <Collapse in={oponed} transitionDuration={300}>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="2rem"
            mt="xl"
            mb="md"
          >
            {recommendations
              ?.slice(3, recommendations.length)
              .map((rec, index) => (
                <UserCard key={index} user={rec?.user!} />
              ))}
          </SimpleGrid>
        </Collapse>
        <Group>
          <Conditional condition={!oponed && showData!}>
            <Button variant="outline" onClick={open}>
              Show More
            </Button>
          </Conditional>
          <Conditional condition={oponed && showData!}>
            <Button variant="outline" onClick={close}>
              Show Less
            </Button>
          </Conditional>
        </Group>
      </Box>
    </Conditional>
  );
};
