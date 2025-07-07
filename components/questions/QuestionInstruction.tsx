import React from "react";
import { Text } from "~/components/ui/text";

const QuestionInstructure: React.FunctionComponent<{ children: string }> = ({ children }) => {
  return <Text className="w-full text-left font-sans-medium text-lg">{children}</Text>;
};

export default QuestionInstructure;
