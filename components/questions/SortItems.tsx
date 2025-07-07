import React from "react";
import { View } from "react-native";
import DuoDragDrop, { DuoDragDropRef } from "../duo-drag-drop";
import Spinner from "../Spinner";
import QuestionInstructure from "./QuestionInstruction";

export type SortItemsProps = {
  answer: string;
  options: Array<string>;
  renderQuestion: (props: Pick<SortItemsProps, "answer" | "options">) => React.ReactNode;
  setSelectedItems: (newAnswer: string[]) => void;
  dndProps: Record<"wordHeight" | "lineHeight", number>;
  instruction: string;
};

const SortItems: React.FunctionComponent<SortItemsProps> = ({ answer, options, renderQuestion, setSelectedItems, dndProps, instruction }) => {
  const duoDragDropRef = React.useRef<DuoDragDropRef>(null);

  const [mounted, setMounted] = React.useState<boolean>(false);

  return (
    <View className="w-full flex-1 flex-col">
      <QuestionInstructure>{instruction}</QuestionInstructure>

      <View className="items-center justify-center w-full flex-1">{renderQuestion({ answer, options })}</View>

      <View className="flex-col justify-end">
        {!mounted && (
          <View className="w-full justify-center items-center">
            <Spinner />
          </View>
        )}

        <DuoDragDrop
          ref={duoDragDropRef}
          words={options}
          wordHeight={dndProps.wordHeight}
          lineHeight={dndProps.lineHeight}
          wordGap={4}
          wordBankOffsetY={6}
          wordBankAlignment="center"
          onDrop={() => {
            setSelectedItems(duoDragDropRef.current?.getAnsweredWords() ?? []);
          }}
          onReady={() => {
            setMounted(true);
          }}
        />
      </View>
    </View>
  );
};

export default SortItems;
