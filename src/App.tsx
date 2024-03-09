import "./styles.css";
import { AppProvider } from "./context/AppContext";
import { useConnectionStatus } from "@thirdweb-dev/react";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CircularProgress } from "@nextui-org/react";

function AuthenticatedApp() {
  const status = useConnectionStatus();

  if (status === "unknown") {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading..." label="Loading..." size="lg" />
      </div>
    );
  }
  if (status === "connecting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Connecting..." label="Connecting..." size="lg" />
      </div>
    );
  }
  if (status === "connected") {
    return <MainView />;
  }
  if (status === "disconnected") {
    return <LoginView />;
  }
}

function App() {
  return (
    <AppProvider>
      <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
        <AuthenticatedApp />
      </ThirdwebProvider>
    </AppProvider>
  );
}

export default App;
