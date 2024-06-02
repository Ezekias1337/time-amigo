// Library Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkIfSelected = async (index: number) => {
  
  let dayString: string;
  switch (index) {
    case 0:
      dayString = "sunday";
      break;
    case 1:
      dayString = "monday";
      break;
    case 2:
      dayString = "tuesday";
      break;
    case 3:
      dayString = "wednesday";
      break;
    case 4:
      dayString = "thursday";
      break;
    case 5:
      dayString = "friday";
      break;
    case 6:
      dayString = "saturday";
      break;
    default:
      dayString = "";
      break;
  }

  try {
    const dayValue = await AsyncStorage.getItem(dayString);
    if (!dayValue || dayValue === "false" || dayValue === "") {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error checking if day is selected", error);
    return false;
  }
};

export default checkIfSelected;
