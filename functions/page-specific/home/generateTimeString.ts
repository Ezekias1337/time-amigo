const generateTimeString = (translate: (key: string) => string) => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const timeString = `${translate("theTimeIs")} ${hours}:${minutesStr} ${ampm}`;

  return timeString;
};

export default generateTimeString;