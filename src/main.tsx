import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TimerProvider } from "./Context/MyContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </React.StrictMode>
);
