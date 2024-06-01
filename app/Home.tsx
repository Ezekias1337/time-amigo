import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Speech from "expo-speech";
import Button from "../components/Button";
import DayOfWeekSelector from "../components/DaySelector";
import { useLocalization } from "../components/LocalizationContext";
import { colors } from "../styles/variables";

const Home: React.FC = () => {
  const { translate, locale } = useLocalization();

  const [show, setShow] = useState(false);
  const [time, setDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState(1);
  const [startAnnouncingTime, setStartAnnouncingTime] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setDate(currentDate);
    setShow(false);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const generateTimeString = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const timeString = `${translate(
      "theTimeIs"
    )} ${hours}:${minutesStr} ${ampm}`;

    return timeString;
  };

  const announceTime = () => {
    const timeString = generateTimeString();
    let languageString: string;

    switch (locale) {
      case "en":
        languageString = "en-US";
        break;
      case "es":
        languageString = "es-MX";
        break;
      default:
        languageString = "en-US";
        break;
    }

    Speech.speak(timeString, {
      language: languageString,
    });
  };

  const increaseFrequency = () => {
    if (frequency < 60) {
      setFrequency(frequency + 1);
    }
  };
  
  const decreaseFrequency = () => {
    if (frequency > 1) {
      setFrequency(frequency - 1);
    }
  };

  useEffect(() => {
    if (startAnnouncingTime === true) {
      // Announce the time immediately
      announceTime();

      // Set an interval to announce the time every minute
      const intervalId = setInterval(announceTime, frequency * 60000);

      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [frequency, startAnnouncingTime]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          variant="primary"
          text={startAnnouncingTime === true ? translate("pause") : translate("start")}
          icon={startAnnouncingTime === true ? "pause" : "play"}
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => setStartAnnouncingTime(!startAnnouncingTime)}
        />
        <Button
          variant="success"
          text={translate("increaseFrequency")}
          icon="plus"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => increaseFrequency()}
          disabled={frequency === 60 ? true : false}
        />
        <Button
          variant="error"
          text={translate("decreaseFrequency")}
          icon="minus"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => decreaseFrequency()}
          disabled={frequency > 1 ? false : true}
        />
        {/* <Button
          variant="warning"
          text={translate("Select Time")}
          icon="clock-o"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => showTimepicker()}
        /> */}
      </View>

      {/* <View style={styles.daySelectorContainer}>
        <DayOfWeekSelector />
      </View> */}

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {translate("frequency")}:{" "}
          {`${translate("every")} ${frequency} ${translate("minutes")}`}
        </Text>
        {/* <Text style={styles.text}>
          {translate("selectedTime")}:{" "}
          {time === null
            ? translate("pleaseSelect")
            : time?.toLocaleTimeString()}
        </Text> */}
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time === null ? new Date(1598051730000) : time}
          mode="time"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral800,
  },
  buttonsContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 10,
  },
  daySelectorContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: colors.neutral100,
    fontSize: 30,
  },
  textContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
});

export default Home;
