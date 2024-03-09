import "./styles.css";
import { AppProvider } from "./context/AppContext";
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";

function AuthenticatedApp() {
  const address = useAddress();
  return address ? <MainView /> : <LoginView />;
}

function App() {
  return (
    <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <AppProvider>
        <AuthenticatedApp />
      </AppProvider>
    </ThirdwebProvider>
  );
}

export default App;
