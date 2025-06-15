import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../graphql/graphql";

export interface Authentication {
    user?: User
    token?: string | null;
    isAuthenticated: boolean;
}

export interface AuthenticationsActions extends PayloadAction<Partial<Authentication>> {}

export interface Settings {
    isDarkMode: boolean;
}

export interface SettingsActions extends PayloadAction<Partial<Settings>> {}