import { TDictionary } from "./en";

const id: TDictionary = {
  hiragana: {
    basic: {
      name: "Hiragana",
      desc: "Aksara fonetik Jepang untuk kata asli bahasa Jepang.",
    },
    choon: {
      name: "Chōon (Panjang vokal)",
      desc: "Tanda untuk menunjukkan bunyi vokal panjang.",
    },
    sokuon: {
      name: "Sokuon (Tsu kecil)",
      desc: "Tsu kecil (っ) yang menunjukkan konsonan ganda atau jeda.",
    },
    yoon: {
      name: "Yōon (Gabungan suku kata)",
      desc: "Gabungan suku kata menggunakan ゃ/ゅ/ょ kecil.",
    },
    dakuten: {
      name: "Dakuten (Tanda voiced)",
      desc: "Tanda diakritik (゛) yang mengubah konsonan tak bersuara menjadi bersuara.",
    },
    handakuten: {
      name: "Handakuten (Tanda 'p')",
      desc: "Tanda diakritik (゜) yang mengubah bunyi 'h' menjadi 'p'.",
    },
  },
  katakana: {
    basic: {
      name: "Katakana",
      desc: "Aksara fonetik Jepang untuk kata serapan asing dan nama asing.",
    },
    choon: {
      name: "Chōon (Panjang vokal)",
      desc: "Tanda untuk menunjukkan bunyi vokal panjang (biasanya menggunakan ー).",
    },
    sokuon: {
      name: "Sokuon (Tsu kecil)",
      desc: "Tsu kecil (ッ) yang menunjukkan konsonan ganda atau jeda.",
    },
    yoon: {
      name: "Yōon (Gabungan suku kata)",
      desc: "Gabungan suku kata menggunakan ャ/ュ/ョ kecil.",
    },
    dakuten: {
      name: "Dakuten (Tanda voiced)",
      desc: "Tanda diakritik (゛) yang mengubah konsonan tak bersuara menjadi bersuara.",
    },
    handakuten: {
      name: "Handakuten (Tanda 'p')",
      desc: "Tanda diakritik (゜) yang mengubah bunyi 'h' menjadi 'p'.",
    },
  },
  instruction: {
    guess_the_letter: "Pilih bunyi yang tepat dari huruf ini",
    guess_the_symbol: "Pilih huruf yang sesuai dengan bunyi {{sound}}",
    matching_text_by_text: "Pilih pasangan yang sesuai",
    sort_items_by_sound: "Sesuikan urutan berdasarkan bunyi",
    sort_the_mean: "Tebak arti dari kalimat ini",
    sort_the_symbol_from_mean: "Tebak kalimat ini dalam kana",
    write_the_symbol_from_sound: 'Tulis kalimat dari suara ini',
    write_the_symbol_from_mean: 'Tulis kalimat ini dalam kana'
  },
  settings: {
    name: "Pengaturan",
    desc: "Atur pengaturan aplikasi Anda.",
    dark_mode: "Mode Gelap",
    appearance: "Penampilan",
    system: "Sistem",
  },
  language: "Bahasa",
  select_your_language: "Pilih bahasa Anda",
  selectX: "Pilih {{x}}",
  start_learning: "Ayo mulai",
  save: "Simpan",
  theme: {
    name: "Tema",
    dark: "Gelap",
    dark_blue: "Biru Gelap",
    dark_green: "Hijau Gelap",
    dark_yellow: "Kuning Gelap",
    dark_red: "Merah Gelap",
    light: "Terang",
    light_blue: "Biru Terang",
    light_green: "Hijau Terang",
    light_yellow: "Kuning Terang",
    light_red: "Merah Terang",
  },
  check: "Periksa",
  continue: "Lanjut",
  correct: "Benar",
  correct_desc: "Keren! Jawabanmu benar!",
  incorrect: "Salah",
  incorrect_desc: "Jawaban yang benar adalah {{answer}}",
  select_the_matching_pairs: "Pilih pasangan yang cocok",
  select_the_correct_character_for_value: "Pilih karakter yang benar untuk {{value}}",
  unit_name: "Unit {{name}}",
};

export default id;
