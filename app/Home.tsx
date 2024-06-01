import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import DayOfWeekSelector from "../components/DaySelector";
import { useLocalization } from "../components/LocalizationContext";
import { colors } from "../styles/variables";

const Home: React.FC = () => {
  const { translate, locale } = useLocalization();
  useKeepAwake();

  const [show, setShow] = useState(false);
  const [time, setDate] = useState<Date | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [frequency, setFrequency] = useState(1);
  const [startAnnouncingTime, setStartAnnouncingTime] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || time;
    setDate(currentDate);
    setShow(false);
    saveTimeToStorage(currentDate);
  };

  const saveTimeToStorage = async (selectedTime: Date | null) => {
    try {
      if (!selectedTime) {
        throw Error("No time selected");
      }
      await AsyncStorage.setItem("announcementTime", selectedTime.toString());
    } catch (error) {
      console.error("Error saving time to storage", error);
    }
  };

  const loadSettingsFromStorage = async () => {
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

  const configureAudio = async () => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      /* interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX as any, */
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      /* interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX as any, */
    });
  };

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });
    }
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
    loadSettingsFromStorage();
    configureAudio();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (startAnnouncingTime === true) {
      announceTime();
      const intervalId = setInterval(announceTime, frequency * 60000);
      return () => clearInterval(intervalId);
    }
  }, [frequency, startAnnouncingTime]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      // getDay returns a number between 0 and 6, where 0 is Sunday and 6 is Saturday
      
      console.log("selectedDays", selectedDays);
      console.log("currentDay", currentDay);
      console.log("currentTime", currentTime);
      console.log("time", time);

      if (selectedDays.includes(currentDay) && time) {
        const selectedTimeInMinutes = time.getHours() * 60 + time.getMinutes();
        if (currentTime === selectedTimeInMinutes) {
          announceTime();
          setStartAnnouncingTime(true);
        }
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [selectedDays, time]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.buttonsContainer}>
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
        <Button
          variant="warning"
          text={translate("Select Time")}
          icon="clock-o"
          leftIcon={true}
          iconSize={32}
          onClickHandler={() => showTimepicker()}
        />
      </View>

      <View style={styles.daySelectorContainer}>
        <DayOfWeekSelector />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {translate("frequency")}:{" "}
          {`${translate("every")} ${frequency} ${translate("minutes")}`}
        </Text>
        <Text style={styles.text}>
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
