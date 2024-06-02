// Functions, Helpers, Utils, and Hooks
import generateTimeString from "./generateTimeString";
import * as Speech from "expo-speech";

const announceTime = (locale: string, translate: (key: string) => string) => {
  const timeString = generateTimeString(translate);
  let languageString: string;

  switch (locale) {
    case "en":
      languageString = "en-US";
      break;
    case "es":
      languageString = "es-MX";
      break;
    default:
      languageString = "en-US";
      break;
  }

  Speech.speak(timeString, {
    language: languageString,
  });
};

export default announceTime;
