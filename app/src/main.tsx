import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

declare global {
  interface Window {
    reactAppMain: (moduleId: number) => void;
  }
}

// Export a function to bootstrap the app for a module instance
export function reactAppMain(moduleId: number) {
  console.log(`React Initiated: root-${moduleId}`)
  const rootEl = document.getElementById(`root-${moduleId}`);
  if (!rootEl) {
    console.error(`No root element found for moduleId ${moduleId}`);
    return;
  }
  createRoot(rootEl).render(
    <StrictMode>
      <App moduleId={moduleId} />
    </StrictMode>
  );
}

// Attach to window for Razor to call
window.reactAppMain = reactAppMain;