import { useState } from "react";
import { initialState } from "../constant";
import { Filters } from "src/interfaces";

export const useHomeActions = () => {
  const [state, setState] = useState(initialState)
  const [populerState, setPopulerState] = useState<Filters>({ page: 1, limit: 12 })
  const [recentState, setRecentState] = useState<Filters>({ page: 3, limit: 12 })
  const [othersState, setOthersState] = useState<Filters>({ page: 2, limit: 12 })

  const updateState = (newState: Partial<typeof initialState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const onPageChange = (page: number) => {
    updateState({ page });
  }

  return {
    state,
    populerState,
    recentState,
    othersState,
    actions: {
      onPageChange,
      updateState,
      setPopulerState,
      setRecentState,
      setOthersState
    }
  };
};
