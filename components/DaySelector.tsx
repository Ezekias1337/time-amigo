import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, borderRadius, fontSizes } from "../styles/variables";

const DayOfWeekSelector: React.FC = () => {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.viewContainer}>
      {daysOfWeek.map((day) => (
        <TouchableOpacity
          style={[
            styles.inactiveButton,
            selectedDays.includes(day) ? styles.activeButton : null,
          ]}
          key={day}
          onPress={() => toggleDay(day)}
        >
          <Text style={{ fontSize: fontSizes.general }}>{`${day[0]}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inactiveButton: {
    backgroundColor: colors.neutral100,
    color: colors.neutral800,
    padding: 15,
    marginTop: 20,
    borderRadius: borderRadius.borderRadius,
  },
  activeButton: {
    backgroundColor: colors.primary500,
    color: colors.neutral100,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 10,
  }
});

export default DayOfWeekSelector;
