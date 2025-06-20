import { useState } from "react";
import { initialState } from "../constant";

export const useHomeActions = () => {
  const [state, setState] = useState(initialState)

  const updateState = (newState: Partial<typeof initialState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const onSearchChange = (search: string) => {
    updateState({ search });
  }

  const onPageChange = (page: number) => {
    updateState({ page });
  }

  return {
    state,
    actions: {
      onSearchChange,
      onPageChange,
      updateState
    }
  };
};
