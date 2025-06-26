import { Container, SimpleGrid, Space } from "@mantine/core";
import { UpdateSkills } from "src/profile/UpdateSkills";
//import { HomeHeader } from "./components/HomeHeader";
import { Recommended } from "./components/Recommended";
import { Others } from "./components/Others";
import { useHomeActions } from "src/home/hooks/useHomePageActions";
import { useGetUsersQuery } from "./hooks/useGetUsersQuery";
import { useEffect, useState } from "react";
import { useAppAuthentication } from "src/hooks";
import { Conditional, UserCard, UserCardSkeleton } from "src/components";
import { useSearchParams } from "react-router-dom";

export const Home: React.FC = () => {
  const { user } = useAppAuthentication();
  const [opened, setOpened] = useState(false);
  const { state, actions } = useHomeActions();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const { users, pageInfo, loading, error } = useGetUsersQuery({
    ...state,
    search: searchQuery,
  });

  const showData = !loading && !error && users?.length > 0;
  const showLoading = !error && loading;

  const showOthers = showData || showLoading;

  useEffect(() => {
    if (
      (user && !user.skillsProficientAt?.length) ||
      !user?.skillsToLearn?.length
    ) {
      setOpened(true);
    }
  }, [user]);

  return (
    <Container w="100%" maw={1400}>
      <Conditional condition={Boolean(searchQuery)}>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="2rem" my="xl">
          <Conditional condition={showLoading!}>
            {Array.from({ length: 9 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </Conditional>
          <Conditional condition={showData!}>
            {users?.map((user, index) => (
              <UserCard key={index} user={user!} />
            ))}
          </Conditional>
        </SimpleGrid>
      </Conditional>
      <Conditional condition={!searchQuery}>
        <Recommended />

        <Space h="md" />

        <Conditional condition={showOthers}>
          <Others
            showData={showData}
            showLoading={showLoading}
            users={users}
            pageInfo={pageInfo!}
            onPageChange={actions.onPageChange}
          />
        </Conditional>
      </Conditional>
      <UpdateSkills opened={opened} onClose={() => setOpened(!opened)} />
    </Container>
  );
};
