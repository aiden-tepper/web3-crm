// CustomNavbar.tsx
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ConnectWallet } from "@thirdweb-dev/react";

const CustomNavbar: React.FC = () => {
  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold">web3-crm</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectWallet />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
