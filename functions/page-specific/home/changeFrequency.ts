export const increaseFrequency = (
  frequency: number,
  setFrequency: React.Dispatch<React.SetStateAction<number>>
) => {
  if (frequency < 60) {
    setFrequency(frequency + 1);
  }
};

export const decreaseFrequency = (
  frequency: number,
  setFrequency: React.Dispatch<React.SetStateAction<number>>
) => {
  if (frequency > 1) {
    setFrequency(frequency - 1);
  }
};
