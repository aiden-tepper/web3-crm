import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NextUIProvider } from "@nextui-org/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <NextUIProvider>
        <div className="w-screen h-screen p-8 flex items-start justify-center">
          <App />
        </div>
      </NextUIProvider>
    </ConvexProvider>
  </React.StrictMode>
);
