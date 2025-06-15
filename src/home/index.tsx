import React from "react";
import { useAppAuthentication } from "src/hooks";
import { UpdateSkills } from "src/profile/components/UpdateSkills";
//import { UpdateProfileModal } from 'src/profile/updateProfileModal'

export const Home: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const { user } = useAppAuthentication();
  React.useEffect(() => {
    if (user && !user.isProfileComplete) {
      setOpened(true);
    }
  }, [user]);
  return (
    <>
      <UpdateSkills opened={opened} onClose={() => setOpened(!opened)} />
    </>
  );
};
