import { AudioPlayer, useAudioPlayer } from "expo-audio";

const correctAudio = require("~/assets/audio/correct.wav");

const incorrectAudio = require("~/assets/audio/incorrect.wav");

const useAnswerSound = () => {
    const successSound = useAudioPlayer(correctAudio);

    const errorSound = useAudioPlayer(incorrectAudio);

    const play = (type: "success" | "error") => {
        const sound: AudioPlayer = type === "success" ? successSound : errorSound;

        sound.seekTo(0);

        sound.play();
    };

    return { play };
};

export default useAnswerSound;
