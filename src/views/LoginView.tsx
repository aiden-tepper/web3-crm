import React from "react";
import { Divider } from "@nextui-org/react";
import { ConnectEmbed } from "@thirdweb-dev/react";

const LoginView: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Left Half */}
      <div
        style={{
          flex: 1, // Take up half of the space
          display: "flex",
          justifyContent: "center", // Center children horizontally
        }}
      >
        <div
          style={{
            // Adjust this width as necessary to center content between left edge and divider
            maxWidth: "50%",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Welcome to web3-crm!</h1>
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
            <i>please login with your Web3 wallet of choice</i>
          </h2>
        </div>
      </div>

      <Divider orientation="vertical" style={{ height: "60vh" }} />

      {/* Right Half */}
      <div
        style={{
          flex: 1, // Take up half of the space
          display: "flex",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
        }}
      >
        <ConnectEmbed
          auth={{
            loginOptional: false,
            onLogin() {
              console.log("user signed in");
            },
            onLogout() {
              console.log("user signed out");
            },
          }}
        />
      </div>

      <p style={{ position: "absolute", bottom: "0", marginBottom: "8px" }}>Created by Aiden Tepper</p>
    </div>
  );
};

export default LoginView;
