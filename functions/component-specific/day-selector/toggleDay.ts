// Library Imports
import AsyncStorage from "@react-native-async-storage/async-storage";

const toggleDay = async (
  day: string,
  index: number,
  selectedDays: string[],
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>
) => {
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

  if (selectedDays.includes(day)) {
    setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    await AsyncStorage.setItem(dayString, "false");
  } else {
    setSelectedDays([...selectedDays, day]);
    await AsyncStorage.setItem(dayString, "true");
  }
};

export default toggleDay;
