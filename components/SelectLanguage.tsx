import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { TLanguage, useUserData } from "~/stores/userStore";

const availableLanguage: Array<{ label: string; value: TLanguage }> = [
  { label: "English", value: "en" },
  { label: "Indonesia", value: "id" },
];

function SelectLanguage() {
  const { t, i18n } = useTranslation();

  const insets = useSafeAreaInsets();

  const setLanguage = useUserData((state) => state.setLanguage);

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handleChangeLanguage = (lang: TLanguage) => {
    setLanguage(lang, () => {
      i18n.changeLanguage(lang);
    });
  };

  const value = availableLanguage.find((lang) => lang.value === i18n.language) ?? availableLanguage[0];

  return (
    <Select value={value} defaultValue={value} onValueChange={(option) => handleChangeLanguage(option ? (option.value as TLanguage) : value.value)}>
      <SelectTrigger className="w-full">
        <SelectValue className="text-foreground text-sm native:text-lg" placeholder={t("select_your_language")} />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-full" sideOffset={-40}>
        <SelectGroup>
          <SelectLabel>{t("language")}</SelectLabel>
          {availableLanguage.map((language) => {
            return (
              <SelectItem key={language.value} label={language.label} value={language.value}>
                {language.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectLanguage;
