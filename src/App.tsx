import "./App.css";
import { AppProvider } from "./AppContext";
import MainView from "./views/MainView";

function App() {
  return (
    <AppProvider>
      <div>
        <h1>web3-crm</h1>
        <MainView />
      </div>
    </AppProvider>
  );
}

export default App;
