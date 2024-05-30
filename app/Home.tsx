import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import DayOfWeekSelector from "../components/DaySelector";

import { colors } from "../styles/variables";

// https://github.com/react-native-datetimepicker/datetimepicker

interface UpdateEvent {
  target: {
    name: string;
    value: string;
  };
}

type InputMode = "date" | "time" | "datetime" | "countdown";

const Home: React.FC = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode: InputMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  /*return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );*/

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the home page</Text>
      <Button
        variant="primary"
        text="Preferences"
        url="Preferences"
        icon="gear"
        leftIcon={true}
        iconSize={32}
      />

      <Button
        variant="success"
        text="Select Dates"
        icon="calendar"
        leftIcon={true}
        iconSize={32}
        onClickHandler={() => showDatepicker()}
      />
      <Button
        variant="warning"
        text="Select Time"
        icon="clock-o"
        leftIcon={true}
        iconSize={32}
        onClickHandler={() => showTimepicker()}
      />
      <DayOfWeekSelector />
      <Text style={styles.text}>selectedS: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={
            mode === "date" ? "date" : mode === "time" ? "time" : "datetime"
          }
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
  text: {
    color: colors.neutral100,
  },
});

export default Home;
