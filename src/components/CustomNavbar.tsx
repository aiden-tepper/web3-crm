// CustomNavbar.tsx
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDisconnect } from "@thirdweb-dev/react";

const CustomNavbar: React.FC = () => {
  const disconnect = useDisconnect();

  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold">web3-crm</p>
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
