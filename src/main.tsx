import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Router from "@src/router/Router.tsx";

import "@src/assets/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </StrictMode>,
);
