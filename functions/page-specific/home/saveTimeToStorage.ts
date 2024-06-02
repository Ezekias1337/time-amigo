// Library Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveTimeToStorage = async (selectedTime: Date | null) => {
  try {
    if (!selectedTime) {
      throw Error("No time selected");
    }
    await AsyncStorage.setItem("announcementTime", selectedTime.toString());
  } catch (error) {
    console.error("Error saving time to storage", error);
  }
};

export default saveTimeToStorage;