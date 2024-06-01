import React, { FC, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesomeIconNames from "../types/FontAwesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";

type ButtonLink = {
  name: string;
  params: undefined;
};

type CardProps = {
  cardVariant: "mobile" | "imageOnly" | "imageAndBody";
  headerText: string;
  bodyText?: string;
  buttonCount: 0 | 1 | 2;
  button1Text?: string;
  button1Variant?:
    | "primary"
    | "primary-dark"
    | "warning"
    | "info"
    | "neutral"
    | "neutral-dark"
    | "success"
    | "error";
  button1OnClick?: Function;
  button1Icon?: FontAwesomeIconNames;
  button1Link?: string;
  button2Text?: string;
  button2Type?: "button" | "reset";
  button2Variant?:
    | "primary"
    | "primary-dark"
    | "warning"
    | "info"
    | "neutral"
    | "neutral-dark"
    | "success"
    | "error";
  button2OnClick?: Function;
  button2Icon?: FontAwesomeIconNames;
  button2Link?: ButtonLink;
  buttonSize?: "small" | "medium" | "large";
  imageSource: any;
};

export const Card: FC<CardProps> = ({
  cardVariant,
  headerText,
  bodyText,
  buttonCount,
  button1Text,
  button1Variant,
  button1OnClick,
  button1Icon,
  button1Link,
  button2Text,
  button2Variant,
  button2OnClick,
  button2Icon,
  imageSource,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (cardVariant === "mobile") {
    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.headerText}>{headerText}</Text>
        {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}
      </View>
    );
  } else if (cardVariant === "imageOnly") {
    return (
      <View style={[styles.card, styles.imageOnlyCard]}>
        <Image source={imageSource} style={styles.image} />
        {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    );
  } else if (cardVariant === "imageAndBody") {
    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.cardTextWrapper}>
          <Text style={styles.headerText}>{headerText}</Text>
          {bodyText && (
            <Text style={styles.bodyText}>
              {bodyText.split("/n").map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {"\n"}
                </Fragment>
              ))}
            </Text>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          {buttonCount >= 1 && (
            <TouchableOpacity
              style={[styles.button, styles[button1Variant || "neutral"]]}
              onPress={() => {
                if (button1OnClick) {
                  button1OnClick();
                } else if (button1Link) {
                  navigation.navigate(button1Link as never);
                }
              }}
            >
              {button1Icon && (
                <FontAwesome
                  name={button1Icon}
                  style={styles.buttonIcon}
                  size={32}
                />
              )}
              <Text style={styles.buttonText}>{button1Text}</Text>
            </TouchableOpacity>
          )}
          {buttonCount === 2 && button2OnClick && (
            <TouchableOpacity
              style={[styles.button, styles[button2Variant || "error"]]}
              onPress={button2OnClick}
            >
              {button2Icon && (
                <FontAwesome
                  name={button2Icon}
                  style={styles.buttonIcon}
                  size={32}
                />
              )}
              <Text style={styles.buttonText}>{button2Text}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: 200,
  },
  imageOnlyCard: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 14,
    color: "#333",
  },
  cardTextWrapper: {
    marginVertical: 10,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primary: {
    backgroundColor: "#007bff",
  },
  "primary-dark": {
    backgroundColor: "#0056b3",
  },
  warning: {
    backgroundColor: "#ffc107",
  },
  info: {
    backgroundColor: "#17a2b8",
  },
  neutral: {
    backgroundColor: "#6c757d",
  },
  "neutral-dark": {
    backgroundColor: "#343a40",
  },
  success: {
    backgroundColor: "#28a745",
  },
  error: {
    backgroundColor: "#dc3545",
  },
});
