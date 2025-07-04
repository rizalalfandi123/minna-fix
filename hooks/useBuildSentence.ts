import React from "react";
import { useTranslation } from "react-i18next";
import { QuestionSentenceButtonProps } from "~/components/questions/QuestionSentenceButton";
import { Language } from "~/contexts/userContext";
import { SymbolWord } from "~/types";

const useBuildSentence = ({ data, isUseTranslation = true }: { data: Array<SymbolWord>; isUseTranslation?: boolean }) => {
  const { i18n } = useTranslation();

  const activeLang = i18n.language as Language;

  const sentence = React.useMemo(() => {
    function buildSentence(lang: Language, isUseTranslation: boolean = true) {
      return data
        .sort((a, b) => {
          const aIndex = a.translation?.[lang]?.index ?? Infinity;
          const bIndex = b.translation?.[lang]?.index ?? Infinity;
          return aIndex - bIndex;
        })
        .map((item) => {
          const hintData: Array<string> = [...Object.values(item.alternative ?? {})];

          let word: string = item.translation ? item.translation[lang].translate : "";

          if (item.translation) {
            hintData.push(item.translation[lang].translate);
          }

          if (!isUseTranslation) {
            word = item.value;
          }

          const data: QuestionSentenceButtonProps["sentence"][number] = {
            word,
            hintData,
          };

          return data;
        });
    }

    const sentences: Record<Language, QuestionSentenceButtonProps["sentence"]> = {
      en: buildSentence("en", isUseTranslation),
      id: buildSentence("id", isUseTranslation),
    };

    return sentences[activeLang];
  }, [activeLang, data, isUseTranslation]);

  return sentence;
};

export default useBuildSentence;
