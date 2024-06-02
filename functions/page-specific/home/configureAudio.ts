// Library Imports
import { Audio } from "expo-av";

const configureAudio = async () => {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    /* interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX as any, */
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
    /* interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX as any, */
  });
};

export default configureAudio;
