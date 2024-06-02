// Functions, Helpers, Utils, and Hooks
import checkIfSelected from "./checkIfSelected";

const fetchSelectedDays = async (
  daysOfWeek: string[],
  setIsSelected: React.Dispatch<React.SetStateAction<Boolean[]>>
) => {
  const selectionStatus = await Promise.all(
    daysOfWeek.map((_, index) => checkIfSelected(index))
  );
  setIsSelected(selectionStatus);
};

export default fetchSelectedDays;
