import { Container, Space } from "@mantine/core";
import { UpdateSkills } from "src/profile/UpdateSkills";
//import { HomeHeader } from "./components/HomeHeader";
import { Recommended } from "./components/Recommended";
import { Others } from "./components/Others";
import { Conditional, Paginations } from "src/components";
import { useHomeActions } from "src/home/hooks/useHomePageActions";
//import { UpdateProfileModal } from 'src/profile/updateProfileModal'

export const Home: React.FC = () => {
  const { opened, setOpened, showData, users, pageInfo } = useHomeActions();

  return (
    <Container w="100%" maw={1400}>
      {/* <HomeHeader /> */}
      <Recommended />

      <Space h="xl" />
      <Conditional condition={showData}>
        <Others users={users} />

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "5rem" }}>
          <Paginations pageInfo={pageInfo!} />
        </div>
      </Conditional>

      <UpdateSkills opened={opened} onClose={() => setOpened(!opened)} />
    </Container>
  );
};
