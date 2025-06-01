import { settingsActions } from "src/redux/settings/slice"
import { useAppDispatch, useAppSelctor } from "./useReduxHooks"
import { themes } from "src/constants"


export const useAppSettings = () => {
    const dispatch = useAppDispatch()
    const settings = useAppSelctor((state) => state.settings)

    const toggleTheme = () => {
        if(settings.isDarkMode){
            dispatch(settingsActions.update({ isDarkMode: false }))
        }else{
            dispatch(settingsActions.update({ isDarkMode: true }))
        }
    }

    const themeObject = settings.isDarkMode ? themes.dark : themes.light
    const colorScheme: "light" | "dark" | undefined = settings.isDarkMode ? "dark" : "light"

    return { ...settings, toggleTheme, themeObject, colorScheme }
}