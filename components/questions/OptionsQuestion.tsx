import React from "react";
import { AnswerStatus, Nullable } from "~/types";
import { View } from "react-native";
import { ButtonProps } from "../ui/button";

export type OptionsQuestionProps = {
    data: {
        options: string[];
        answer: string;
        question: string;
    };
    onCorrectAnswer?: () => void;
    onErrorAnswer?: () => void;
    renderAnswer?: (props: Pick<OptionsQuestionProps, "data">) => React.ReactNode;
    renderInstruction?: (props: Pick<OptionsQuestionProps, "data">) => React.ReactNode;
    renderButton?: (props: Partial<ButtonProps> & { answerStatus: AnswerStatus }) => React.ReactNode;
    renderOptions?: (
        props: Pick<OptionsQuestionProps, "data"> & {
            onSelectOption: (option: string) => void;
            selectedAnswer: Nullable<string>;
            disabled: boolean;
        }
    ) => React.ReactNode;
};

const OptionsQuestion: React.FunctionComponent<OptionsQuestionProps> = ({
    data,
    onCorrectAnswer,
    onErrorAnswer,
    renderAnswer,
    renderInstruction,
    renderOptions,
    renderButton,
}) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<Nullable<string>>(null);

    const [isLocked, setIsLocked] = React.useState<boolean>(false);

    const [answerStatus, setAnswerStatus] = React.useState<AnswerStatus>(null);

    const handleResetAnswer = async () => {
        setSelectedAnswer(null);

        setIsLocked(false);

        setAnswerStatus(null);
    };

    const handleSelectAnswer = (newAnswer: string) => {
        setSelectedAnswer((prev) => (prev === newAnswer ? null : newAnswer));
    };

    const handleContinue = () => {
        if (answerStatus === "success") {
            onCorrectAnswer?.();
        } else {
            onErrorAnswer?.();
        }

        handleResetAnswer();
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;

        const isCorrect = selectedAnswer === data.answer;

        setAnswerStatus(isCorrect ? "success" : "error");

        setIsLocked(true);
    };

    const handleNext = () => {
        if (answerStatus === null) {
            handleCheckAnswer();
        } else {
            handleContinue();
        }
    };

    return (
        <View className="w-full flex-1 flex-col">
            {renderInstruction && renderInstruction({ data })}

            {renderAnswer && <View className="w-full flex-1 items-center justify-center">{renderAnswer({ data })}</View>}

            {renderOptions && (
                <View className="h-64 items-center justify-center">
                    {renderOptions({
                        data,
                        disabled: isLocked,
                        onSelectOption: handleSelectAnswer,
                        selectedAnswer,
                    })}
                </View>
            )}
            {renderButton && renderButton({ onPress: handleNext, disabled: selectedAnswer === null, answerStatus })}
        </View>
    );
};

export default OptionsQuestion;
