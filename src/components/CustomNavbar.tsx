// CustomNavbar.tsx
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDisconnect } from "@thirdweb-dev/react";
import { useAppContext } from "../context/useAppContext";

const CustomNavbar: React.FC = () => {
  const disconnect = useDisconnect();
  const { userName } = useAppContext();

  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold">Welcome, {userName}!</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={disconnect} variant="flat" className="font-bold">
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
