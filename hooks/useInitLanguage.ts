import React from "react";
import { useTranslation } from "react-i18next";
import useUserData from "./useUserData";

const useInitLanguage = () => {
    const { i18n } = useTranslation();

    const { state } = useUserData();

    const currentLanguange = state.settings.language;

    const syncLanguage = () => {
        i18n.changeLanguage(currentLanguange);
    };

    React.useEffect(() => {
        if (currentLanguange !== i18n.language) {
            syncLanguage();
        }
    }, []);

    return null;
};

export default useInitLanguage;
