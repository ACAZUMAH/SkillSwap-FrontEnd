import { createSlice } from "@reduxjs/toolkit"
import type { Settings, SettingsActions } from "src/interfaces"

const initialState: Settings = {
    isDarkMode: false,
}

const slice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        update: (state: Settings, action: SettingsActions) => {
            return { ...state, ...action.payload }
        }
    }
})

export default slice.reducer

export const settingsActions = slice.actions