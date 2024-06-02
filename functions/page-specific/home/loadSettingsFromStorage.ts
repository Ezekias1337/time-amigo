// Library Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadSettingsFromStorage = async (
  setDate: React.Dispatch<React.SetStateAction<Date | null>>,
  setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>
) => {
  try {
    const storedTime = await AsyncStorage.getItem("announcementTime");
    let storedDays: number[] = [];

    if (storedTime) {
      setDate(new Date(storedTime));
    }

    let sunday = await AsyncStorage.getItem("sunday");
    let monday = await AsyncStorage.getItem("monday");
    let tuesday = await AsyncStorage.getItem("tuesday");
    let wednesday = await AsyncStorage.getItem("wednesday");
    let thursday = await AsyncStorage.getItem("thursday");
    let friday = await AsyncStorage.getItem("friday");
    let saturday = await AsyncStorage.getItem("saturday");

    if (sunday === "true") {
      storedDays.push(0);
    }
    if (monday === "true") {
      storedDays.push(1);
    }
    if (tuesday === "true") {
      storedDays.push(2);
    }
    if (wednesday === "true") {
      storedDays.push(3);
    }
    if (thursday === "true") {
      storedDays.push(4);
    }
    if (friday === "true") {
      storedDays.push(5);
    }
    if (saturday === "true") {
      storedDays.push(6);
    }
    setSelectedDays(storedDays);
  } catch (error) {
    console.error("Error loading settings from storage", error);
  }
};

export default loadSettingsFromStorage;