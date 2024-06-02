// Library Imports
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";

// Functions, Helpers, Utils, and Hooks
import handleToggleDay from "../functions/component-specific/day-selector/handleToggleDay";
import fetchSelectedDays from "../functions/component-specific/day-selector/fetchSelectedDays";

// Components
import { useLocalization } from "../components/LocalizationContext";
// CSS
import { fontSizes } from "../styles/variables";
import daySelectorStyles from "../styles/component-specific/day-selector";

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
  const [isSelected, setIsSelected] = useState(Array(7).fill(false));

  useEffect(() => {
    fetchSelectedDays(daysOfWeek, setIsSelected);
  }, []);

  return (
    <View style={daySelectorStyles.viewContainer}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          style={
            isSelected[index] === true
              ? daySelectorStyles.activeButton
              : daySelectorStyles.inactiveButton
          }
          key={day}
          onPress={() =>
            handleToggleDay(
              day,
              index,
              selectedDays,
              setSelectedDays,
              setIsSelected
            )
          }
        >
          <Text style={{ fontSize: fontSizes.general }}>
            {day[0].toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DayOfWeekSelector;
