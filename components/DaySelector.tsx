// Library Imports
import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

// Functions, Helpers, Utils, and Hooks
import toggleDay from "../functions/component-specific/day-selector/toggleDay";

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

  return (
    <View style={daySelectorStyles.viewContainer}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          style={[
            daySelectorStyles.inactiveButton,
            selectedDays.includes(day) ? daySelectorStyles.activeButton : null,
          ]}
          key={day}
          onPress={() => toggleDay(day, index, selectedDays, setSelectedDays)}
        >
          <Text style={{ fontSize: fontSizes.general }}>{`${day[0]}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DayOfWeekSelector;
