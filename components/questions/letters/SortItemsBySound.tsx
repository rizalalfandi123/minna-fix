import React from "react";
import { AnswerStatus } from "~/types";
import { View } from "react-native";
import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import AnswerButton from "../AnswerButton";
import ItemSorter from "../ItemSorter";
import { useTranslation } from "react-i18next";
import LetterSound from "../LetterSound";
import { Text } from "~/components/ui/text";

export type SortItemsBySoundProps = {
    question: Extract<LetterQuestionType, { type: "SORT_THE_ITEMS_BY_SOUND" }>;
    onCorrectAnswer?: () => void;
    onErrorAnswer?: () => void;
};
export type SorterItemData = Record<"number" | "width" | "index", number> & { value: string };

const SortItemsBySound: React.FunctionComponent<SortItemsBySoundProps> = ({ question, onCorrectAnswer, onErrorAnswer }) => {
    const { t } = useTranslation();

    const [answerStatus, setAnswerStatus] = React.useState<AnswerStatus>(null);

    const [selectedItems, setSelectedItems] = React.useState<Array<SorterItemData>>([]);

    const [isLocked, setIsLocked] = React.useState<boolean>(true);

    const handleCekAnswer = () => {
        if (selectedItems.length <= 0) {
            return;
        }

        const isCorrectAnswer = question.data.answer === selectedItems.map((item) => item.value).join("");

        setAnswerStatus(isCorrectAnswer ? "success" : "error");
    };

    const handleReset = () => {
        setIsLocked(false);

        setSelectedItems([]);

        setAnswerStatus(null);
    };

    const handleNext = () => {
        if (answerStatus === null) {
            handleCekAnswer();
        } else {
            if (answerStatus === "success") {
                onCorrectAnswer?.();
            } else {
                onErrorAnswer?.();
            }

            React.startTransition(() => {
                handleReset();
            });
        }
    };

    React.useEffect(() => {
        if (selectedItems.length > 0 && isLocked) {
            setIsLocked(false);
        }

        if (selectedItems.length <= 0 && !isLocked) {
            setIsLocked(true);
        }
    }, [selectedItems, isLocked]);

    return (
        <View className="w-full flex-1 flex-col">
            <Text className="w-full px-4 text-left font-sans-medium text-lg">{t("instruction.sort_items_by_sound")}</Text>

            <View className="flex-1 items-center justify-center px-4">
                <LetterSound symbol={question.data.answer} />
            </View>

            <ItemSorter
                containerHeight={320}
                items={question.data.options}
                selectedItems={selectedItems}
                setSelectedItems={(newItems) => setSelectedItems(newItems)}
            />
            <AnswerButton onPress={handleNext} disabled={isLocked} answerStatus={answerStatus} />
        </View>
    );
};

export default SortItemsBySound;
