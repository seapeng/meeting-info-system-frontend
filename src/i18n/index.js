import { createI18n } from "vue-i18n";

// Define translations for your languages
const messages = {
  en: {
    // Months of the year
    "January": "January",
    "February": "February",
    "March": "March",
    "April": "April",
    "May": "May",
    "June": "June",
    "July": "July",
    "August": "August",
    "September": "September",
    "October": "October",
    "November": "November",
    "December": "December",
  },
  kh: {
    // Years
    "2024": "២០២៤",
    "2025": "២០២៥",
    "2026": "២០២៦",
    "2027": "២០២៧",
    "2028": "២០២៨",
    "2029": "២០២៩",
    "2030": "២០៣០",
    // Months
    "January": "មករា",
    "February": "កុម្ភៈ",
    "March": "មីនា",
    "April": "មេសា",
    "May": "ឧសភា",
    "June": "មិថុនា",
    "July": "កក្កដា",
    "August": "សីហា",
    "September": "កញ្ញា",
    "October": "តុលា",
    "November": "វិច្ឆិកា",
    "December": "ធ្នូ",
    //Days
    "1": "០១",
    "2": "០២",
    "3": "០៣",
    "4": "០៤",
    "5": "០៥",
    "6": "០៦",
    "7": "០៧",
    "8": "០៨",
    "9": "០៩",
    "01": "០១",
    "02": "០២",
    "03": "០៣",
    "04": "០៤",
    "05": "០៥",
    "06": "០៦",
    "07": "០៧",
    "08": "០៨",
    "09": "០៩",
    "10": "១០",
    "11": "១១",
    "12": "១២",
    "13": "១៣",
    "14": "១៤",
    "15": "១៥",
    "16": "១៦",
    "17": "១៧",
    "18": "១៨",
    "19": "១៩",
    "20": "២០",
    "21": "២១",
    "22": "២២",
    "23": "២៣",
    "24": "២៤",
    "25": "២៥",
    "26": "២៦",
    "27": "២៧",
    "28": "២៨",
    "29": "២៩",
    "30": "៣០",
    "31": "៣១",
  },
};

// Create the i18n instance
const i18n = createI18n({
  locale: "kh", // Default locale
  fallbackLocale: "kh", // Fallback locale
  messages, // Locale messages
});

export default i18n;
