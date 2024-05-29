import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/RootNavigator';

type PreferencesScreenNavigationProp = NavigationProp<RootStackParamList, 'Preferences'>;

const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation<PreferencesScreenNavigationProp>();

  const handlePreferencesSet = async () => {
    await AsyncStorage.setItem('isFirstLaunch', 'false');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Set Your Preferences</Text>
      <Button title="Save Preferences" onPress={handlePreferencesSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreferencesScreen;