import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "styled-components";
import original from 'react95/dist/themes/original';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
        <App />
    </Theme>
  </React.StrictMode>
);