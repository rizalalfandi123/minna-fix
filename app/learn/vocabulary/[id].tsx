import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import LearnProgressBar from "~/components/LearnProgressBar";
import useBackHandler from "~/hooks/useBackHandler";
import { contentWidth } from "~/lib/constants/sizes";
import { Text } from "~/components/ui/text";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GuessTheSentenceMean from "~/components/questions/units/GuessTheSentenceMean";
import SortTheMeans from "~/components/questions/units/SortTheMeans";
import GuessTheSymbolFromMean from "~/components/questions/units/GuessTheSymbolFromMean";
import SortTheSymbolFromMean from "~/components/questions/units/SortTheSymbolFromMean";
import GuessTheLetterSound from "~/components/questions/letters/GuessTheLetterSound";

const LearnVocabularyPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleBack = useBackHandler(`/units/${id}/vocabulary`);

  return (
    <View className="flex-1 bg-background" style={{ width: contentWidth }}>
      <LearnProgressBar handleBack={handleBack} health={8} progress={20} />

      <GuessTheLetterSound
        {...{
          answer: "I",
          options: ["I", "You"],
          question: "わたし",
        }}
      />

      {/* <SortTheSymbolFromMean
        question={{
          type: "SORT_THE_SYMBOLS_FROM_MEAN",
          data: {
            answer: "わたし",
            options: ["わたし", "わし"].map((value, number) => ({ number, value })),
            question: [
              {
                value: "わたし",
                mean: {
                  en: "I",
                  id: "Saya",
                },
                alternative: {
                  romaji: "watashi",
                },
              },
            ],
          },
        }}
      /> */}

      {/* <GuessTheSymbolFromMean
        question={{
          type: "GUESS_THE_SYMBOL_FROM_MEAN",
          data: {
            answer: "わたし",
            options: ["わたし", "わし"],
            question: [
              {
                value: "わたし",
                mean: {
                  en: "I",
                  id: "Saya",
                },
                alternative: {
                  romaji: "watashi",
                },
              },
            ],
          },
        }}
      /> */}
      {/* <SortTheMeans
        question={{
            type: "SORT_THE_MEANS",
            data: {
              answer: {
                en: "I",
                id: "Saya",
              },
              options: [
                {
                  en: "I",
                  id: "Saya",
                },
                {
                  en: "de",
                  id: "de",
                },
                {
                  en: "Ifw",
                  id: "Sfwaya",
                },
              ].map((value, number) => ({ number, value })),
              question: [
                {
                  value: "わたし",
                  mean: {
                    en: "I",
                    id: "Saya",
                  },
                  alternative: {
                    romaji: "watashi",
                  },
                },
              ],
            },
          }}
      /> */}

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
    </View>
  );
};

export default LearnVocabularyPage;
