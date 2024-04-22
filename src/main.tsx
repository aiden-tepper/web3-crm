import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <NextUIProvider>
        <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
          <div className="w-screen h-screen p-8 flex items-start justify-center box-border overflow-auto">
            <App />
          </div>
        </ThirdwebProvider>
      </NextUIProvider>
    </ConvexProvider>
  </React.StrictMode>
);
