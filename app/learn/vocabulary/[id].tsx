import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import LearnProgressBar from "~/components/LearnProgressBar";
import useBackHandler from "~/hooks/useBackHandler";
import Popover from "react-native-popover-view";
import { contentWidth } from "~/lib/constants/sizes";
import { Text } from "~/components/ui/text";

const LearnVocabularyPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const handleBack = useBackHandler(`/units/${id}/vocabulary`);

    return (
        <View className="flex-1 bg-background" style={{ width: contentWidth }}>
            <LearnProgressBar handleBack={handleBack} health={8} progress={20} />

            {/* <GuessTheSentenceMean
        question={{
          type: 'GUESS_THE_SENTENCE_MEAN',
          data: {
            answer: {
              en: 'I',
              id: 'Saya',
            },
            options: [
              {
                en: 'I',
                id: 'Saya',
              },
              {
                en: 'de',
                id: 'de',
              },
              {
                en: 'Ifw',
                id: 'Sfwaya',
              },
            ],
            question: [
              {
                value: 'わたし',
                mean: {
                  en: 'I',
                  id: 'Saya',
                },
                alternative: {
                  romaji: 'watashi',
                },
              },
            ],
          },
        }}
      /> */}
            <Popover
                from={
                    <TouchableOpacity>
                        <View className="h-12 w-12 bg-red-500"></View>
                    </TouchableOpacity>
                }
            >
                <Text>This is the contents of the popover</Text>
            </Popover>
        </View>
    );
};

export default LearnVocabularyPage;
