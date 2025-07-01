import { View } from "react-native";
import Information from "~/components/Information";
import { Button } from "~/components/ui/button";
import useScreenSize from "~/helpers/useScreenSize";

export default function Home() {
  const { screenHeight } = useScreenSize();

  return (
    <>
      <View className="bg-background flex-1 flex-col">
        
      </View>
    </>
  );
}
