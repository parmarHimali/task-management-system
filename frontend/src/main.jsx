// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppWrapper } from "./components/AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
