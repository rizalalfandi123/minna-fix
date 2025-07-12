import React from "react";
import { useTranslation } from "react-i18next";
import { useUserData } from "~/stores/userStore";

const useInitLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguange = useUserData((state) => state.settings.language);

  const syncLanguage = () => {
    i18n.changeLanguage(currentLanguange);
  };

  React.useEffect(() => {
    if (currentLanguange !== i18n.language) {
      syncLanguage();
    }
  }, [currentLanguange, i18n.language]);

  return null;
};

export default useInitLanguage;
