import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ConvexReactClient, ConvexProviderWithAuth } from "convex/react";
import { NextUIProvider } from "@nextui-org/react";
import { useAuthFromThirdweb } from "./hooks/useAuthFromThirdweb";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromThirdweb}>
        <NextUIProvider>
          <div className="w-screen h-screen p-8 flex items-start justify-center box-border overflow-auto">
            <App />
          </div>
        </NextUIProvider>
      </ConvexProviderWithAuth>
    </ThirdwebProvider>
  </React.StrictMode>
);
