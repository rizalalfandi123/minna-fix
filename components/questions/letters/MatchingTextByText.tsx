import React from "react";
import { AnswerStatus, Nullable } from "~/types";
import { View } from "react-native";
import { LetterQuestionType } from "~/services/queries/letterQuestionQueries";
import AnswerButton from "../AnswerButton";
import { useTranslation } from "react-i18next";
import delay from "~/helpers/delay";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";

export type MatchingTextByTextProps = {
  question: Extract<LetterQuestionType, { type: "MATCHING_TEXT_BY_TEXT" }>;
  onCorrectAnswer?: () => void;
  onErrorAnswer?: () => void;
  onFinishAnswer?: () => void;
};

type MatchingTextData = Extract<LetterQuestionType, { type: "MATCHING_TEXT_BY_TEXT" }>["data"];

type MatchingTextValue = MatchingTextData["options"][number];

type MatchingTextSide = keyof MatchingTextValue;

type MatchingTextColumn = { answer: MatchingTextValue; value: string; side: MatchingTextSide };

const getMatchingTextColumn = ({ options, answer, side }: MatchingTextData & { side: MatchingTextSide }): Array<MatchingTextColumn> => {
  return options
    .map((option) => {
      const answerValue = answer.find((answer) => answer[side] === option[side]);
      return answerValue ? { answer: answerValue, value: option[side], side } : null;
    })
    .filter((item): item is MatchingTextColumn => item !== null);
};

const MemoizedButton = React.memo(
  ({
    cell,
    firstOption,
    pairedButtons,
    lockedButtons,
    handleSelectOption,
  }: {
    cell: MatchingTextColumn;
    firstOption: Nullable<MatchingTextColumn>;
    pairedButtons: Record<string, Nullable<"success" | "error">>;
    lockedButtons: Record<string, boolean>;
    handleSelectOption: (nextOption: MatchingTextColumn) => () => void;
  }) => {
    const isSelected = firstOption === cell;

    return (
      <Button
        variant={isSelected ? "default" : "outline"}
        className={cn("!h-16 !w-36 md:!h-20", {
          "border border-green-400": pairedButtons[cell.value] === "success" && !isSelected,
          "border border-red-400": pairedButtons[cell.value] === "error" && !isSelected,
        })}
        disabled={lockedButtons[cell.value]}
        onPress={handleSelectOption(cell)}
      >
        <Text
          className={cn({
            "text-green-400": pairedButtons[cell.value] === "success" && !isSelected,
            "text-red-400": pairedButtons[cell.value] === "error" && !isSelected,
          })}
        >
          {cell.value}
        </Text>
      </Button>
    );
  }
);

const MatchingTextByText: React.FunctionComponent<MatchingTextByTextProps> = ({ onCorrectAnswer, onErrorAnswer, onFinishAnswer, question }) => {
  const { t } = useTranslation();

  const [answerStatus, setAnswerStatus] = React.useState<AnswerStatus>(null);

  const [firstOption, setFirstOption] = React.useState<Nullable<MatchingTextColumn>>(null);

  const [lockedButtons, setLockedButtons] = React.useState<Record<string, boolean>>({});

  const [pairedButtons, setPairedButtons] = React.useState<Record<string, Nullable<"success" | "error">>>({});

  const columns = React.useMemo(
    () => [
      getMatchingTextColumn({
        answer: question.data.answer,
        options: question.data.options,
        side: "leftSide",
      }),
      getMatchingTextColumn({
        answer: question.data.answer,
        options: question.data.options,
        side: "rightSide",
      }),
    ],
    [question.data.answer, question.data.options]
  );

  const handleSelectOption = React.useCallback(
    (nextOption: MatchingTextColumn) => () => {
      if (!firstOption || firstOption.side === nextOption.side) {
        setFirstOption(nextOption);
        return;
      }

      const isAnswerCorrect =
        firstOption.side === "leftSide"
          ? firstOption.value === nextOption.answer.leftSide && nextOption.value === nextOption.answer.rightSide
          : firstOption.value === nextOption.answer.rightSide && nextOption.value === nextOption.answer.leftSide;

      setFirstOption(null);

      React.startTransition(() => {
        const nextLockedButtons = {
          ...lockedButtons,
          [nextOption.value]: isAnswerCorrect,
          [firstOption.value]: isAnswerCorrect,
        };

        setLockedButtons(nextLockedButtons);

        setPairedButtons((prev) => ({
          ...prev,
          [nextOption.value]: isAnswerCorrect ? "success" : "error",
          [firstOption.value]: isAnswerCorrect ? "success" : "error",
        }));

        const isAllOk = Object.values(nextLockedButtons).filter((isCorrect) => isCorrect).length === columns.flat().length;

        setAnswerStatus(isAllOk ? "success" : null);
      });

      if (isAnswerCorrect && onCorrectAnswer) {
        onCorrectAnswer();
      }

      if (!isAnswerCorrect && onErrorAnswer) {
        onErrorAnswer();
      }

      delay(500).then(() => {
        React.startTransition(() => {
          setPairedButtons((prev) => ({
            ...prev,
            [nextOption.value]: null,
            [firstOption.value]: null,
          }));
        });
      });
    },
    [firstOption, onCorrectAnswer, onErrorAnswer]
  );

  const handleReset = () => {
    if (onFinishAnswer) {
      onFinishAnswer?.();
    }

    React.startTransition(() => {
      setAnswerStatus(null);

      setPairedButtons({});

      setFirstOption(null);

      setLockedButtons({});
    });
  };

  return (
    <View className="flex-1 flex-col">
      <Text className="font-sans-medium w-full px-4 text-left text-lg">{t("instruction.matching_text_by_text")}</Text>

      <View className="flex-1 items-center justify-center">
        <View className="w-full flex-row justify-center gap-4">
          {columns.map((column, columnIndex) => (
            <View key={`column-${columnIndex}`} className="flex-col gap-6">
              {column.map((cell) => (
                <MemoizedButton
                  key={`cell-${cell.value}`}
                  cell={cell}
                  firstOption={firstOption}
                  pairedButtons={pairedButtons}
                  lockedButtons={lockedButtons}
                  handleSelectOption={handleSelectOption}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <AnswerButton answerStatus={answerStatus} onPress={handleReset} />
    </View>
  );
};

export default React.memo(MatchingTextByText);
