import { Stack, useRouter } from "expo-router";
import React from "react";
import { useLetterChart } from "~/hooks/useLetterChart";
import LetterPage from "~/components/letters/LetterPage";
import { TLetterButtonRow } from "~/components/letters/LetterButtonRow";
import { useTranslation } from "react-i18next";
import { useNextLetterLevel } from "~/hooks/useNextLetterLevel";
import { useGetLetters } from "~/services/queries/letterQueries";

const Page = () => {


  const { data: lettersData } = useGetLetters();

  const letterTypeId = React.useMemo(() => {
    const data = lettersData?.letterTypes.find((type) => type.name === "hiragana");

    return data?.id ?? "";
  }, [lettersData]);

  const nextLevel = useNextLetterLevel({ letterTypeId });

  const letterChart = useLetterChart();

  const { t, i18n } = useTranslation();

  const router = useRouter();

  const hirganaBlocks = React.useMemo<Array<TLetterButtonRow>>(
    () => [
      {
        id: "basic",
        chart: letterChart.getLetterChart({ block: "basic", type: "hiragana" }),
        description: t("hiragana.basic.desc"),
        title: t("hiragana.basic.name"),
      },
      {
        id: "dakuten",
        chart: letterChart.getLetterChart({ block: "dakuten", type: "hiragana" }),
        description: t("hiragana.dakuten.desc"),
        title: t("hiragana.dakuten.name"),
      },

      {
        id: "handakuten",
        chart: letterChart.getLetterChart({ block: "handakuten", type: "hiragana" }),
        description: t("hiragana.handakuten.desc"),
        title: t("hiragana.handakuten.name"),
      },
      {
        id: "yoon",
        chart: letterChart.getLetterChart({ block: "yoon", type: "hiragana" }),
        description: t("hiragana.yoon.desc"),
        title: t("hiragana.yoon.name"),
      },

      {
        id: "sokuon",
        chart: letterChart.getLetterChart({ block: "sokuon", type: "hiragana" }),
        symbolClassName: "text-2xl",
        description: t("hiragana.sokuon.desc"),
        title: t("hiragana.sokuon.name"),
      },
      {
        id: "choon",
        chart: letterChart.getLetterChart({ block: "choon", type: "hiragana" }),
        symbolClassName: "text-2xl",
        description: t("hiragana.choon.desc"),
        title: t("hiragana.choon.name"),
      },
    ],
    [letterChart.letterData, i18n.language]
  );

  const handleLearn = () => {
      router.navigate({ pathname: "/learn/letters/hiragana", params: { levelId: nextLevel.id } });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LetterPage letterBlocks={hirganaBlocks} onPressLearn={handleLearn} />
    </>
  );
};

const HiraganaPageContent = React.memo(Page);

export default HiraganaPageContent;
