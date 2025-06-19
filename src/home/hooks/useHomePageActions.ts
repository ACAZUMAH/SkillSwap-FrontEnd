import { useEffect, useState } from "react";
import { useGetUsersQuery } from "src/home/hooks/useGetUsersQuery";
import { useAppAuthentication } from "../../hooks/useAppAuthentication";

export const useHomeActions = () => {
  const { user } = useAppAuthentication();
  const [opened, setOpened] = useState(false);

  const { users, pageInfo, loading, fetchMore } = useGetUsersQuery({ page: 1, limit: 9 });

  const showData = !loading && users?.length > 0;

  useEffect(() => {
    if (
      (user && !user.skillsProficientAt?.length) ||
      !user?.skillsToLearn?.length
    ) {
      setOpened(true);
    }
  }, [user]);


  return {
    opened,
    setOpened,
    users,
    pageInfo,
    loading,
    fetchMore,
    showData,
  };
};
