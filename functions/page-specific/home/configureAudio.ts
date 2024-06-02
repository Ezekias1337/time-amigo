// Library Imports
import { Audio } from "expo-av";

const configureAudio = async () => {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    interruptionModeIOS: 1,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
    interruptionModeAndroid: 1,
  });
};

export default configureAudio;
