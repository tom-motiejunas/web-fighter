import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserSettingsProvider from "./contexts/userSettings.context";

ReactDOM.render(
  <React.StrictMode>
    <UserSettingsProvider>
      <App />
    </UserSettingsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
