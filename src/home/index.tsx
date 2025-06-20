import { Container, Space } from "@mantine/core";
import { UpdateSkills } from "src/profile/UpdateSkills";
//import { HomeHeader } from "./components/HomeHeader";
import { Recommended } from "./components/Recommended";
import { Others } from "./components/Others";
import { useHomeActions } from "src/home/hooks/useHomePageActions";
import { useGetUsersQuery } from "./hooks/useGetUsersQuery";
import { useEffect, useState } from "react";
import { useAppAuthentication } from "src/hooks";

export const Home: React.FC = () => {
  const { user } = useAppAuthentication();
  const [opened, setOpened] = useState(false);
  const { state, actions } = useHomeActions();
  const { users, pageInfo, loading, error } = useGetUsersQuery(state);

  const showData = !loading && !error && users?.length > 0;
  const showLoading = !error && loading;

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
      <Recommended />

      <Space h="xl" />

      <Others
        showData={showData}
        showLoading={showLoading}
        users={users}
        pageInfo={pageInfo!}
        onPageChange={actions.onPageChange}
      />

      <UpdateSkills opened={opened} onClose={() => setOpened(!opened)} />
    </Container>
  );
};
