import { Box, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import { UserCard, UserCardSkeleton } from "src/components";
import { PageInfo, User } from "src/interfaces";
import { Conditional, Paginations } from "src/components";

interface Props {
  users?: Array<User | null>;
  showData?: boolean;
  showLoading?: boolean;
  pageInfo?: PageInfo;
  onPageChange?: (page: number) => void;
}

export const Others: React.FC<Props> = ({
  users,
  showData,
  showLoading,
  pageInfo,
  onPageChange
}) => {
  return (
    <Box mb="5rem">
      <Title order={2} fw={500} mb="xl">
        Others you may know
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" mb="xl">
        <Conditional condition={showLoading!}>
          {Array.from({ length: 12 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </Conditional>
        <Conditional condition={showData!}>
          {users?.map((user, index) => (
            <UserCard key={index} user={user!} />
          ))}
        </Conditional>
      </SimpleGrid>

      <Conditional condition={showData!}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Paginations pageInfo={pageInfo!} onPageChange={onPageChange}/>
        </div>
      </Conditional>
    </Box>
  );
};
