// Library Imports
import { StyleSheet } from "react-native";

// CSS
import { colors } from "../variables";

const homeStyles = StyleSheet.create({
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

export default homeStyles;
