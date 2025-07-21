import { Container, SimpleGrid, Space } from "@mantine/core";
import { UpdateSkills } from "src/profile/modals/UpdateSkills";
//import { HomeHeader } from "./components/HomeHeader";
import { Recommended } from "./components/Recommended";
import { Popular } from "./components/Popular";
import { useHomeActions } from "src/home/hooks/useHomePageActions";
import { useGetUsersQuery } from "./hooks/useGetUsersQuery";
import { useEffect, useState } from "react";
import { useAppAuthentication } from "src/hooks";
import { Conditional, UserCard, UserCardSkeleton } from "src/components";
import { useSearchParams } from "react-router-dom";
import { Others } from "./components/Others";
import { Recent } from "./components/recent";

export const Home: React.FC = () => {
  const { user } = useAppAuthentication();
  const [opened, setOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [noRecommendations, setNoRecommendations] = useState(false);
  const { state } = useHomeActions();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const { users, loading, error } = useGetUsersQuery({
    ...state,
    search: searchQuery,
  });

  const showData = !loading && !error && users?.length > 0;
  const showLoading = !error && loading;

  useEffect(() => {
    if (
      !opened &&
      ((user && !user.skillsProficientAt?.length) ||
        !user?.skillsToLearn?.length)
    ) {
      setOpened(true);
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [searchQuery]);

  return (
    <Container w="100%" maw={1400}>
      <Conditional condition={showSearch}>
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
      <Conditional condition={!showSearch && !opened}>
        <Recommended setNoRecommendations={setNoRecommendations} />

        <Space h="lg" />
        <Popular noRecommendations={noRecommendations} />

        <Recent />

        <Others />
      </Conditional>
      <UpdateSkills
        opened={opened}
        onClose={() => setOpened((prev) => !prev)}
      />
    </Container>
  );
};
