import "./App.css";
import { AppProvider } from "./context/AppContext";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import MainView from "./views/MainView";
import { ConnectWallet } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider activeChain="ethereum" clientId={process.env.THIRDWEB_CLIENT_ID}>
      <AppProvider>
        <div>
          <h1>web3-crm</h1>
          <ConnectWallet />
          <MainView />
        </div>
      </AppProvider>
    </ThirdwebProvider>
  );
}

export default App;
