// Library Imports
import { Audio } from "expo-av";

const handleAppStateChange = async (nextAppState: string) => {
  if (nextAppState === "background" || nextAppState === "inactive") {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }
};

export default handleAppStateChange;
