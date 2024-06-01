import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, borderRadius } from "../styles/variables";
import { useLocalization } from "./LocalizationContext";
import { Card } from "./Card";

const usaFlag = require("../assets/usa-flag.png");
const mxFlag = require("../assets/mx-flag.png");

const LanguageSelector: React.FC = () => {
  const { translate, locale, setLocale } = useLocalization();

  return (
    <View style={styles.viewContainer}>
      <Text>{translate("Select Your Language")}</Text>

      <View style={styles.cardContainer}>
        <Card
          cardVariant="mobile"
          headerText={translate("English")}
          buttonCount={1}
          button1Text={translate("Select")}
          button1OnClick={() => setLocale("en")}
          button1Variant="primary"
          button1Icon="check"
          imageSource={usaFlag}
        />
        <Card
          cardVariant="mobile"
          headerText={translate("Spanish")}
          buttonCount={1}
          button1Text={translate("Select")}
          button1OnClick={() => setLocale("en")}
          button1Variant="primary"
          button1Icon="check"
          imageSource={mxFlag}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  }
});

export default LanguageSelector;
