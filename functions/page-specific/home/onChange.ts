// Library Imports
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

// Functions, Helpers, Utils, and Hooks
import saveTimeToStorage from "./saveTimeToStorage";

const onChange = (
  event: DateTimePickerEvent,
  time: Date | null,
  setDate: React.Dispatch<React.SetStateAction<Date | null>>,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  selectedDate?: Date
) => {
  const currentDate = selectedDate || time;
  setDate(currentDate);
  setShow(false);
  saveTimeToStorage(currentDate);
};

export default onChange;