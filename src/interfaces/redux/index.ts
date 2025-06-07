import type { PayloadAction } from "@reduxjs/toolkit";

export interface Authentication {
    user?: any
    token?: string | null;
    isAuthenticated: boolean;
}

export interface AuthenticationsActions extends PayloadAction<Partial<Authentication>> {}

export interface Settings {
    isDarkMode: boolean;
}

export interface SettingsActions extends PayloadAction<Partial<Settings>> {}