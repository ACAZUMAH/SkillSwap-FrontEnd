import { Box, Button, Collapse, Group, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import { UserCard, UserCardSkeleton } from "src/components";
import { PageInfo, User } from "src/interfaces";
import { Conditional } from "src/components";
import { useDisclosure } from "@mantine/hooks";
import { useGetUsersQuery } from "../hooks/useGetUsersQuery";
import { useHomeActions } from "../hooks/useHomePageActions";

interface Props {
  users?: Array<User | null>;
  showData?: boolean;
  showLoading?: boolean;
  pageInfo?: PageInfo;
  onPageChange?: (page: number) => void;
  noRecommendations?: boolean;
}

export const Popular: React.FC<Props> = ({ noRecommendations }) => {
  const [oponed, { open, close }] = useDisclosure(false);
  const { populerState } = useHomeActions();
  const { users, loading, error } = useGetUsersQuery({ ...populerState });

  const showData = !loading && !error && users?.length > 0;
  const showLoading = !error && loading;

  return (
    <Box mb="3.5rem">
      <Conditional condition={!noRecommendations || showData}>
        <Title order={2} fw={500} mb="lg">
          Populer users you may know
        </Title>
      </Conditional>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mb="md">
        <Conditional condition={showLoading!}>
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </Conditional>
        <Conditional condition={showData!}>
          {users?.slice(0, 6).map((user, index) => (
            <UserCard key={index} user={user!} />
          ))}
        </Conditional>
      </SimpleGrid>
      <Conditional condition={showData!}>
        <Collapse in={oponed} transitionDuration={300}>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="2rem"
            mt="xl"
            mb="md"
          >
            {users?.slice(6, users.length).map((user, index) => (
              <UserCard key={index} user={user!} />
            ))}
          </SimpleGrid>
        </Collapse>
        <Group>
          <Conditional condition={!oponed && showData!}>
            <Button variant="outline" onClick={open} radius="xl">
              Show More
            </Button>
          </Conditional>
          <Conditional condition={oponed && showData!}>
            <Button variant="outline" onClick={close} radius="xl">
              Show Less
            </Button>
          </Conditional>
        </Group>
      </Conditional>
    </Box>
  );
};
