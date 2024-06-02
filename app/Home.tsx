// Library Imports
import React, { useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";

// Functions, Helpers, Utils, and Hooks
import announceTime from "../functions/page-specific/home/announceTime";
import configureAudio from "../functions/page-specific/home/configureAudio";
import handleAppStateChange from "../functions/page-specific/home/handleAppStateChange";
import loadSettingsFromStorage from "../functions/page-specific/home/loadSettingsFromStorage";
import saveTimeToStorage from "../functions/page-specific/home/saveTimeToStorage";
import showTimepicker from "../functions/page-specific/home/showTimePicker";
import {
  increaseFrequency,
  decreaseFrequency,
} from "../functions/page-specific/home/changeFrequency";

// Components
import Button from "../components/Button";
import DayOfWeekSelector from "../components/DaySelector";
import { useLocalization } from "../components/LocalizationContext";

// CSS
import homeStyles from "../styles/page-specific/home";

const Home: React.FC = () => {
  const { translate, locale } = useLocalization();
  useKeepAwake();

  const [show, setShow] = useState(false);
  const [time, setDate] = useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [frequency, setFrequency] = useState(1);
  const [startAnnouncingTime, setStartAnnouncingTime] = useState(false);

  // Handles DateTimePicker event when user selects a new time.
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setDate(currentDate);
    setShow(false);
    saveTimeToStorage(currentDate);
  };

  // Loads settings from storage and makes the app ready to announce time.
  useEffect(() => {
    loadSettingsFromStorage(setDate, setSelectedDays);
    configureAudio();

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // Announces time every interval selected by the user
  useEffect(() => {
    if (startAnnouncingTime === true) {
      announceTime(locale, translate);
      const intervalId = setInterval(announceTime, frequency * 60000);
      return () => clearInterval(intervalId);
    }
  }, [frequency, startAnnouncingTime]);

  // Handles scheduled time announcement
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      // getDay returns a number between 0 and 6, where 0 is Sunday and 6 is Saturday

      if (selectedDays.includes(currentDay) && time) {
        const selectedTimeInMinutes = time.getHours() * 60 + time.getMinutes();
        if (currentTime === selectedTimeInMinutes) {
          announceTime(locale, translate);
          setStartAnnouncingTime(true);
        }
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [selectedDays, time]);

  return (
    <View style={homeStyles.container}>
      <StatusBar style="light" />
      <View style={homeStyles.buttonsContainer}>
        <Button
          variant="primary"
          text={
            startAnnouncingTime === true
              ? translate("pause")
              : translate("start")
          }
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
          onClickHandler={() => increaseFrequency(frequency, setFrequency)}
          disabled={frequency === 60 ? true : false}
        />
        <Button
          variant="error"
          text={translate("decreaseFrequency")}
          icon="minus"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => decreaseFrequency(frequency, setFrequency)}
          disabled={frequency > 1 ? false : true}
        />
        <Button
          variant="warning"
          text={translate("Select Time")}
          icon="clock-o"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => showTimepicker(setShow)}
        />
      </View>

      <View style={homeStyles.daySelectorContainer}>
        <DayOfWeekSelector />
      </View>

      <View style={homeStyles.textContainer}>
        <Text style={homeStyles.text}>
          {translate("frequency")}:{" "}
          {`${translate("every")} ${frequency} ${translate("minutes")}`}
        </Text>
        <Text style={homeStyles.text}>
          {translate("selectedTime")}:{" "}
          {time === null
            ? translate("pleaseSelect")
            : time?.toLocaleTimeString()}
        </Text>
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

export default Home;
