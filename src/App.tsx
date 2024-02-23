import "./App.css";
import { AppProvider } from "./context/AppContext";
import { ThirdwebProvider, ConnectEmbed, useAddress } from "@thirdweb-dev/react";
import MainView from "./views/MainView";

function AuthenticatedApp() {
  // Use useAddress hook to check if user is signed in
  const address = useAddress();

  // If an address is present, render MainView, otherwise show the ConnectEmbed for sign in
  return address ? <MainView /> : <ConnectEmbed />;
}

function App() {
  return (
    <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <AppProvider>
        <div>
          <h1>web3-crm</h1>
          <AuthenticatedApp />
        </div>
      </AppProvider>
    </ThirdwebProvider>
  );
}

export default App;
