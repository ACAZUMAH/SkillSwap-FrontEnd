import {
  Alert,
  Container,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";
import { Conditional, UserCard, UserCardSkeleton } from "src/components";
import { useGetRecommendationsQuery } from "./hooks/useGetRecommendationsQuery";

export const Recommendations: React.FC = () => {
  const { recommendations, loading, error } = useGetRecommendationsQuery({ page: 1, limit: 12 });

  const showData = !loading && !error && recommendations.length > 0;
  const showLoading = loading && !error;
  const showErrorAlert = !loading && error;

  return (
    <Container w="100%" maw={1400}>
      <Group justify="space-between" mb="md">
        <Flex align="center">
          <IconInfoCircle stroke={1.5} size={20} />
          <Title order={2} fw={500}>
            Recommended
          </Title>
        </Flex>
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
          {Array.from({ length: 12 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </Conditional>

        <Conditional condition={showData}>
          {recommendations?.map((rec, index) => (
            <UserCard
              key={index}
              user={rec?.user!}
            />
          ))}
        </Conditional>
      </SimpleGrid>
    </Container>
  );
};
