// Functions, Helpers, Utils, and Hooks
import toggleDay from "./toggleDay";

// This function is only needed to force a re-render when a selected day changes.
const handleToggleDay = (
  day: string,
  index: number,
  selectedDays: string[],
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>,
  setIsSelected: React.Dispatch<React.SetStateAction<Boolean[]>>
) => {
  toggleDay(day, index, selectedDays, setSelectedDays);
  setIsSelected((prevState) => {
    const newState = [...prevState];
    newState[index] = !newState[index];
    return newState;
  });
};

export default handleToggleDay;
