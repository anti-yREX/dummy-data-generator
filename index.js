import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App"

const rootEle = document.getElementById("root");

const root = createRoot(rootEle);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
