import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TScreenMode = "light" | "dark";

export type TTheme = "default" | "catppuccin" | "perpetuity";

export type TLanguage = "en" | "id";

export type TUserSettings = {
  screenMode: TScreenMode;
  theme: TTheme;
  language: TLanguage;
};

export type TUserData = {
  settings: TUserSettings;
};

type TUserDataMutations = {
  setScreenMode: (mode: TScreenMode) => void;
  setTheme: (theme: TTheme) => void;
  setLanguage: (language: TLanguage, cb?: () => void) => void;
};

type UserDataStore = TUserData & TUserDataMutations;

const initialData: TUserData["settings"] = {
  screenMode: "dark",
  theme: "default",
  language: "en",
};

const zustandAsyncStorage: PersistStorage<UserDataStore> = {
  getItem: async (name) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useUserData = create<UserDataStore>()(
  persist(
    (set) => ({
      settings: initialData,

      setScreenMode: (mode) =>
        set((state) => ({
          settings: {
            ...state.settings,
            screenMode: mode,
          },
        })),

      setTheme: (theme) =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme,
          },
        })),

      setLanguage: (language, cb) => {
        set((state) => ({
          settings: {
            ...state.settings,
            language,
          },
        }));

        cb?.();
      },
    }),
    {
      name: "USER_DATA",

      storage: zustandAsyncStorage,
    }
  )
);
