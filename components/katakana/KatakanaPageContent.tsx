import { Stack } from "expo-router";
import React from "react";
import { useLetterChart } from "~/hooks/useLetterChart";
import MemoizedLetterPage from "~/components/letters/LetterPage";
import { TLetterButtonRow } from "~/components/letters/LetterButtonRow";
import { useTranslation } from "react-i18next";

const KatakanaPageContent = () => {
    const letterChart = useLetterChart();

    const { t } = useTranslation();

    const katakanaBlocks = React.useMemo<Array<TLetterButtonRow>>(
        () => [
            {
                id: "basic",
                chart: letterChart.getLetterChart({ block: "basic", type: "katakana" }),
                description: t("katakana.basic.desc"),
                title: t("katakana.basic.name"),
            },
            {
                id: "dakuten",
                chart: letterChart.getLetterChart({ block: "dakuten", type: "katakana" }),
                description: t("katakana.dakuten.desc"),
                title: t("katakana.dakuten.name"),
            },

            {
                id: "handakuten",
                chart: letterChart.getLetterChart({ block: "handakuten", type: "katakana" }),
                description: t("katakana.handakuten.desc"),
                title: t("katakana.handakuten.name"),
            },
            {
                id: "yoon",
                chart: letterChart.getLetterChart({ block: "yoon", type: "katakana" }),
                description: t("katakana.yoon.desc"),
                title: t("katakana.yoon.name"),
            },

            {
                id: "sokuon",
                chart: letterChart.getLetterChart({ block: "sokuon", type: "katakana" }),
                symbolClassName: "text-2xl",
                description: t("katakana.sokuon.desc"),
                title: t("katakana.sokuon.name"),
            },
            {
                id: "choon",
                chart: letterChart.getLetterChart({ block: "choon", type: "katakana" }),
                symbolClassName: "text-2xl",
                description: t("katakana.choon.desc"),
                title: t("katakana.choon.name"),
            },
        ],
        [letterChart.letterData]
    );

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <MemoizedLetterPage onPressLearn={() => {}} letterBlocks={katakanaBlocks} />
        </>
    );
};

const MemoizedKatakanaPageContent = React.memo(KatakanaPageContent);

export default MemoizedKatakanaPageContent;
