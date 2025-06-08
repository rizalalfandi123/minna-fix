import React from "react";

export type ScreenMode = "light" | "dark";

export type Theme = "default" | "catppuccin" | "perpetuity";

export type Language = "en" | "id";

export type UserData = {
    settings: UserSettings;
};

export type UserSettings = {
    screenMode: ScreenMode;
    theme: Theme;
    language: Language;
};

export type UserDataAction =
    | { type: "SET_SCREEN_MODE"; payload: ScreenMode }
    | { type: "SET_THEME"; payload: Theme }
    | { type: "SET_LANGUAGE"; payload: Language };

export type UserDataContextType = {
    state: UserData;
    dispatch: React.Dispatch<UserDataAction>;
};

export const initialUserData: UserData = {
    settings: {
        screenMode: "dark",
        theme: "default",
        language: "en",
    },
};

export function userDataReducer(state: UserData, action: UserDataAction): UserData {
    switch (action.type) {
        case "SET_SCREEN_MODE":
            return {
                ...state,
                settings: {
                    ...state.settings,
                    screenMode: action.payload,
                },
            };

        case "SET_THEME":
            return {
                ...state,
                settings: {
                    ...state.settings,
                    theme: action.payload,
                },
            };

        case "SET_LANGUAGE":
            return {
                ...state,
                settings: {
                    ...state.settings,
                    language: action.payload,
                },
            };

        default:
            return state;
    }
}

export const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(userDataReducer, initialUserData);

    return <UserDataContext.Provider value={{ state, dispatch }}>{children}</UserDataContext.Provider>;
};
