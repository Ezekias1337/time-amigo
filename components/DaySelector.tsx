import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, borderRadius, fontSizes } from "../styles/variables";
import { useLocalization } from "../components/LocalizationContext";

const DayOfWeekSelector: React.FC = () => {
  const { translate } = useLocalization();

  const daysOfWeek: string[] = [
    translate("sunday"),
    translate("monday"),
    translate("tuesday"),
    translate("wednesday"),
    translate("thursday"),
    translate("friday"),
    translate("saturday"),
  ];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = async (day: string, index: number) => {
    let dayString: string;
    switch (index) {
      case 0:
        dayString = "sunday";
        break;
      case 1:
        dayString = "monday";
        break;
      case 2:
        dayString = "tuesday";
        break;
      case 3:
        dayString = "wednesday";
        break;
      case 4:
        dayString = "thursday";
        break;
      case 5:
        dayString = "friday";
        break;
      case 6:
        dayString = "saturday";
        break;
      default:
        dayString = "";
        break;
    }

    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
      await AsyncStorage.setItem(dayString, "false");
    } else {
      setSelectedDays([...selectedDays, day]);
      await AsyncStorage.setItem(dayString, "true");
    }
  };

  return (
    <View style={styles.viewContainer}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          style={[
            styles.inactiveButton,
            selectedDays.includes(day) ? styles.activeButton : null,
          ]}
          key={day}
          onPress={() => toggleDay(day, index)}
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
  },
});

export default DayOfWeekSelector;
