import "./styles.css";
import { AppProvider } from "./context/AppContext";
import { ThirdwebProvider, ConnectEmbed, useAddress } from "@thirdweb-dev/react";
import MainView from "./views/MainView";
// import { LinkedInProfileScraper } from "linkedin-profile-scraper";

function AuthenticatedApp() {
  // Use useAddress hook to check if user is signed in
  const address = useAddress();

  // If an address is present, render MainView, otherwise show the ConnectEmbed for sign in
  return address ? <MainView /> : <ConnectEmbed />;
}

// (async () => {
//   const scraper = new LinkedInProfileScraper({
//     sessionCookieValue:
//       "AQEDAS4JvLEDVX97AAABjeeQYtUAAAGONAS3a00AvtVhluZwL7MrdxXIJVA615UASKKRMuVJxgVM4GKqBWPWDYRqxpRwtFL-MTembn71HNHw8IHbnuUmVr_d4S44NicLh9RG4VEilb9WFpKvAxm5-fDW",
//     keepAlive: false,
//   });

//   // Prepare the scraper
//   // Loading it in memory
//   await scraper.setup();

//   const result = await scraper.run("https://www.linkedin.com/in/aiden-tepper/");

//   console.log(result);
// })();

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
