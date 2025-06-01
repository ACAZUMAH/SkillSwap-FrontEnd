import type { MantineThemeOverride } from "@mantine/core"

export * from "./redux/index"

export interface Themes {
    dark: MantineThemeOverride,
    light: MantineThemeOverride
}