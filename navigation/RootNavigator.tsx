import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../app/Home";
/* import PreferencesScreen from "../app/PreferencesScreen"; */

export type RootStackParamList = {
  Home: undefined;
  Preferences: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  /* useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("isFirstLaunch");
        if (firstLaunch === null) {
          await AsyncStorage.setItem("isFirstLaunch", "false");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(true);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null; // or a loading spinner
  } */

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Preferences" component={PreferencesScreen} /> */}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
