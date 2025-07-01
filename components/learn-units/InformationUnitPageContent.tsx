import { View } from "react-native";
import { Button } from "../ui/button";
import Information from "../Information";
import useScreenSize from "~/helpers/useScreenSize";
import { Text } from "../ui/text";
import React from "react";

export type InformationUnitPageContentProps = {
  onPressOk: () => void;
};

const InformationUnitPageContent: React.FunctionComponent<InformationUnitPageContentProps> = ({ onPressOk }) => {
  const { screenHeight } = useScreenSize();

  return (
    <View className="bg-background flex-1 flex-col">
      <Information style={{ height: screenHeight - 24 * 4 }}>dee</Information>

      <View className="h-24 justify-center items-center w-full">
        <Button onPress={onPressOk} className="w-full">
          <Text>Ok</Text>
        </Button>
      </View>
    </View>
  );
};

export default InformationUnitPageContent;
