import { createSlice } from "@reduxjs/toolkit";
import type { Authentication, AuthenticationsActions } from "src/interfaces";

const initialState: Authentication = {
    isAuthenticated: false,
}

const slice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        update: (state, action: AuthenticationsActions) => {
            
            const newState = { ...state, ...action.payload };
            
            return newState;
        },
        reset: () => {
            return initialState;
        }
    }
})

export default slice.reducer;

export const authenticationActions = slice.actions;