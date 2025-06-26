import { useState } from "react";
import { initialState } from "../constant";

export const useHomeActions = () => {
  const [state, setState] = useState(initialState)

  const updateState = (newState: Partial<typeof initialState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const onPageChange = (page: number) => {
    updateState({ page });
  }

  return {
    state,
    actions: {
      onPageChange,
      updateState
    }
  };
};
