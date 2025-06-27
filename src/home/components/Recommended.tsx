import {
  Alert,
  Box,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import React from "react";
import { useRecommendQuery } from "../hooks/useRecommendQuery";
import { Conditional, UserCard, UserCardSkeleton } from "src/components";
import { useRouteNavigation } from "src/hooks";
import { routerEndPoints } from "src/constants";

export const Recommended: React.FC = () => {
  const navigateToMore = useRouteNavigation(routerEndPoints.RECOMMENDATIONS);
  const { recommendations, loading, error } = useRecommendQuery();

  const showData = !loading && !error && recommendations.length > 0;
  const showLoading = loading && !error;
  const showErrorAlert = !loading && error;
  const showRecommendations = showData || showLoading;

  return (
    <Conditional condition={showRecommendations}>
      <Box mt="lg" mb="xl">
        <Group justify="space-between" mb="md">
          <Flex align="center">
            <IconInfoCircle stroke={1.5} size={20} />
            <Title order={2} fw={500}>
              Recommended
            </Title>
          </Flex>

          <Conditional condition={Boolean(recommendations.length > 6)}>
            <Button variant="outline" size="xs" radius="xl" onClick={navigateToMore}>
              <IconArrowRight />
            </Button>
          </Conditional>
        </Group>
        <Conditional condition={!!showErrorAlert}>
          <Alert
            variant="light"
            radius="md"
            mb="xl"
            title={
              <Title order={4} fw="normal">
                Error
              </Title>
            }
          >
            <Text size="md">
              Failed to load recommendations. Please try again later.
            </Text>
          </Alert>
        </Conditional>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mb="xl">
          <Conditional condition={showLoading}>
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </Conditional>

          <Conditional condition={showData}>
            {recommendations?.map((rec, index) => (
              <UserCard
                key={index}
                user={rec?.user!}
                matchedSkill={rec?.matchedSkill!}
                levelDifference={rec?.levelDifference!}
                matchScore={rec?.matchScore!}
              />
            ))}
          </Conditional>
        </SimpleGrid>
      </Box>
    </Conditional>
  );
};
