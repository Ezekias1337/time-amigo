// Library Imports
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Localization from "expo-localization";

const translations: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  en: {
    increaseFrequency: "Increase Frequency",
    decreaseFrequency: "Decrease Frequency",
    selectTime: "Select Time",
    frequency: "Frequency",
    selectedTime: "Selected Time",
    minutes: "minutes",
    every: "Every",
    pleaseSelect: "None",
    start: "Start",
    pause: "Pause",
    theTimeIs: "The Time Is",
    sunday: "sunday",
    monday: "monday",
    tuesday: "tuesday",
    wednesday: "wednesday",
    thursday: "thursday",
    friday: "friday",
    saturday: "saturday",
  },
  es: {
    increaseFrequency: "Aumentar Frecuencia",
    decreaseFrequency: "Reducir Frecuencia",
    selectTime: "Seleccionar Hora",
    frequency: "Frecuencia",
    selectedTime: "Hora Seleccionada",
    minutes: "minutos",
    every: "Cada",
    pleaseSelect: "Ninguno",
    start: "Comenzar",
    pause: "Pausar",
    theTimeIs: "La Hora Es",
    sunday: "domingo",
    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
  },
};

// Create a context
const LocalizationContext = createContext({
  translate: (key: string) => key,
  locale: "en",
  setLocale: (locale: string) => {},
});

// Localization provider component
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState(Localization.locale.split("-")[0]);

  const translate = (key: string) => {
    return translations[locale][key] || key;
  };

  useEffect(() => {
    const deviceLanguage = Localization.locale.split("-")[0];
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
