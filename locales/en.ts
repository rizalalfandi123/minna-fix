const en = {
  hiragana: {
    basic: {
      name: "Hiragana",
      desc: "Japanese phonetic script for native words.",
    },
    choon: {
      name: "Chōon",
      desc: "Marks a long vowel sound.",
    },
    sokuon: {
      name: "Sokuon",
      desc: "Small tsu (っ) indicating a doubled consonant or pause.",
    },
    yoon: {
      name: "Yōon",
      desc: "Combined syllables using small ゃ/ゅ/ょ.",
    },
    dakuten: {
      name: "Dakuten",
      desc: "Diacritic (゛) that voices a consonant.",
    },
    handakuten: {
      name: "Handakuten",
      desc: "Diacritic (゜) changing 'h' to 'p' sounds.",
    },
  },
  katakana: {
    basic: {
      name: "Katakana",
      desc: "Japanese phonetic script for foreign words and loanwords.",
    },
    choon: {
      name: "Chōon",
      desc: "Marks a long vowel sound.",
    },
    sokuon: {
      name: "Sokuon",
      desc: "Small tsu (ッ) indicating a doubled consonant or pause.",
    },
    yoon: {
      name: "Yōon",
      desc: "Combined syllables using small ャ/ュ/ョ.",
    },
    dakuten: {
      name: "Dakuten",
      desc: "Diacritic (゛) that voices a consonant.",
    },
    handakuten: {
      name: "Handakuten",
      desc: "Diacritic (゜) changing 'h' to 'p' sounds.",
    },
  },
  instruction: {
    guess_the_letter: "Choose the correct sound from this letter",
    guess_the_symbol: "Choose the letter that matches the sound {{sound}}",
    matching_text_by_text: "Choose the matching pair",
    sort_items_by_sound: "Arrange the sequence based on sound",
  },
  settings: {
    name: "Settings",
    desc: "Configure your app settings.",
    dark_mode: "Dark Mode",
    appearance: "Appearance",
    system: "System",
  },
  language: "Language",
  select_your_language: "Select your language",
  selectX: "Select {{x}}",
  start_learning: "Let’s start",
  save: "Save",
  theme: {
    name: "Theme",
    dark: "Dark",
    dark_blue: "Dark Blue",
    dark_green: "Dark Green",
    dark_yellow: "Dark Yellow",
    dark_red: "Dark Red",
    light: "Light",
    light_blue: "Light Blue",
    light_green: "Light Green",
    light_yellow: "Light Yellow",
    light_red: "Light Red",
  },
  check: "Check",
  continue: "Continue",
  correct: "Correct",
  correct_desc: "Awesome! You got it right!",
  incorrect: "Incorrect",
  incorrect_desc: "The correct answer is {{answer}}",
  select_the_matching_pairs: "Select the matching pairs",
  select_the_correct_character_for_value: "Select the correct character for {{value}}",
  unit_name: "Unit {{name}}",
};

export default en;

export type TDictionary = typeof en;
