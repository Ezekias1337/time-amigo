import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';

// Define your translations
const translations: {
    [key: string]: {
      [key: string]: string;
    };
  } = {
    en: {
      changeFrequency: 'Change Frequency',
      selectTime: 'Select Time',
      frequency: 'Frequency',
      selectedTime: 'Selected Time',
      minutes: 'minutes',
      every: 'Every',
      pleaseSelect: 'None',
      start: 'Start',
      theTimeIs: 'The Time Is',
      // Add more keys and translations here
    },
    es: {
      changeFrequency: 'Cambiar Frecuencia',
      selectTime: 'Seleccionar Hora',
      frequency: 'Frecuencia',
      selectedTime: 'Hora Seleccionada',
      minutes: 'minutos',
      every: 'Cada',
      pleaseSelect: 'Ninguno',
      start: 'Comenzar',
      theTimeIs: 'La Hora Es',
      // Add more keys and translations here
    },
    // Add more languages here
  };

// Create a context
const LocalizationContext = createContext({
  translate: (key: string) => key,
  locale: 'en',
  setLocale: (locale: string) => {},
});

// Localization provider component
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(Localization.locale.split('-')[0]);

  const translate = (key: string) => {
    return translations[locale][key] || key;
  };

  useEffect(() => {
    const deviceLanguage = Localization.locale.split('-')[0];
    setLocale(deviceLanguage);
  }, []);

  return (
    <LocalizationContext.Provider value={{ translate, locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use the localization context
export const useLocalization = () => useContext(LocalizationContext);
