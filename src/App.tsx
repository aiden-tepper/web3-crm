import "./styles.css";
import { AppProvider } from "./context/AppContext";
import { useAddress } from "@thirdweb-dev/react";
import MainView from "./views/MainView";
import LoginView from "./views/LoginView";

function AuthenticatedApp() {
  const address = useAddress();
  return address ? <MainView /> : <LoginView />;
}

function App() {
  return (
    <AppProvider>
      <AuthenticatedApp />
    </AppProvider>
  );
}

export default App;
