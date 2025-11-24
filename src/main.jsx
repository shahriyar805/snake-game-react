import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnakeProvider } from "./contexts/SnakeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnakeProvider>
      <App />
    </SnakeProvider>
  </React.StrictMode>
);

// <React.StrictMode>
