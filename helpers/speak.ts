import * as Speech from "expo-speech";

type Language = "ja" | "en";

const speak = (text: string, language: Language = "ja", options?: Speech.SpeechOptions) => {
    const languageMap: Record<Language, string> = {
        ja: "ja-JP",
        en: "en-US",
    };

    Speech.stop();

    Speech.speak(text, {
        language: languageMap[language],
        rate: 1.0,
        ...options,
    });
};

export default speak;
