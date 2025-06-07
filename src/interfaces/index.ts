import type { MantineThemeOverride } from "@mantine/core"

export * from "./redux/index"
export * from "./graphql"
export * from "./graphql/graphql"

export interface Themes {
    dark: MantineThemeOverride,
    light: MantineThemeOverride
}