// CustomNavbar.tsx
import React from "react";
import { Button } from "@nextui-org/react";
import { useDisconnect } from "@thirdweb-dev/react";
import { useAppContext } from "../context/useAppContext";

const CustomNavbar: React.FC = () => {
  const disconnect = useDisconnect();
  const { userName } = useAppContext();

  return (
    <div className="w-full h-16 flex justify-between items-center">
      <p className="font-bold">Welcome, {userName}!</p>
      <Button onClick={disconnect} variant="flat" className="font-bold relative">
        Log Out
      </Button>
    </div>
  );
};

export default CustomNavbar;
