import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { pause } from 'expo-speech';

// Define your translations
const translations: {
    [key: string]: {
      [key: string]: string;
    };
  } = {
    en: {
      increaseFrequency: 'Increase Frequency',
      decreaseFrequency: 'Decrease Frequency',
      selectTime: 'Select Time',
      frequency: 'Frequency',
      selectedTime: 'Selected Time',
      minutes: 'minutes',
      every: 'Every',
      pleaseSelect: 'None',
      start: 'Start',
      pause: 'Pause',
      theTimeIs: 'The Time Is',
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
    },
    es: {
      increaseFrequency: 'Aumentar Frecuencia',
      decreaseFrequency: 'Reducir Frecuencia',
      selectTime: 'Seleccionar Hora',
      frequency: 'Frecuencia',
      selectedTime: 'Hora Seleccionada',
      minutes: 'minutos',
      every: 'Cada',
      pleaseSelect: 'Ninguno',
      start: 'Comenzar',
      pause: 'Pausar',
      theTimeIs: 'La Hora Es',
      sunday: 'Domingo',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
    },
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
