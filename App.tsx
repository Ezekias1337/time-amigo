import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { LocalizationProvider } from "./components/LocalizationContext";

const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <RootNavigator />
    </LocalizationProvider>
  );
};

export default App;
